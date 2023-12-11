const express = require('express');
require('dotenv').config(); 
const client = require('smartsheet');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '0.0.0.0';

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages/index.html'));
});

app.get('/builder', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages/builder.html'));
});

app.get('/form-test', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages/form-test.html'));
});

app.get('/checkout', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages/checkout.html'));
});

app.get('/src/data/final-data.json', (req, res) => {
  res.sendFile(path.join(__dirname, 'data/final-data.json'));
});

app.get('/src/data/defaults.json', (req, res) => {
  res.sendFile(path.join(__dirname, 'data/defaults.json'));
});

app.use('/assets', express.static(path.join(__dirname, '../public')));

app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});

var columnMap = {};

function getCellByColumnName(row, columnName) {
  var columnId = columnMap[columnName];
  return row.cells.find(function(c) {
    return (c.columnId == columnId);
  });
};

function evaluateRowAndBuildParentList(sourceRow) {
  var rowToReturn = null;

  // Find the cell and value to evaluate
  var parentCell = getCellByColumnName(sourceRow, "Parent");
  if (parentCell.displayValue == "0") {
    var categoryCell = getCellByColumnName(sourceRow, "Category");
    rowToReturn = categoryCell.displayValue;
  }
  return rowToReturn;
}

const smartsheet = client.createClient({
  accessToken: process.env.SMARTSHEET_ACCESS_TOKEN, 
  logLevel: 'info'
});

var options = {
  queryParameters: {
    include: "attachments",
    includeAll: true
  }
};
 
smartsheet.sheets.listSheets(options)
  .then(function (result) {
    var sheetId = process.env.SMARTSHEET_SHEET_ID; 

    smartsheet.sheets.getSheet({id: sheetId})
      .then(function(sheetInfo) {
        sheetInfo.columns.forEach(function(column) {
          columnMap[column.title] = column.id;
        });
        let transformedData = sheetToJSON(sheetInfo);

        fs.writeFile('src/data/final-data.json', JSON.stringify(transformedData, null, 2), function(err) {
          if (err) {
            console.error('Error saving transformed data:', err);
            return;
          }
          console.log('Transformed data saved to final-data.json');
        });
      })
      .catch(function(error) {
        console.error('Error fetching sheet data:', error);
      });
  })
  .catch(function(error) {
    console.error('Error listing sheets:', error);
  });

function sheetToJSON(sheetInfo) {
  let i = 0;
  let finalData = { features: [] };
  let featureMap = {};
  let subCategoryMap = {};
  sheetInfo.rows.forEach(row => {
    let cells = row.cells;
    let level = cells[1].value; 

    if (level === 0) {
      let feature = {
        category: cells[0].displayValue,
        description: cells[5].displayValue,
        subheader: cells[4].displayValue,
        properties: []
      };
      featureMap[row.id] = feature;
      finalData.features.push(feature);
    } else if (level === 1) {
      let parentFeature = featureMap[row.parentId];
      if (parentFeature) {
        let property = {
          subCategory: cells[0].displayValue,
          solutions: []
        };
        parentFeature.properties.push(property);
        subCategoryMap[row.id] = property;
      }
    } else if (level === 2) {
      
      let parentProperty = subCategoryMap[row.parentId];
      if (parentProperty) {
        let lobArray = cells[7].displayValue ? cells[7].displayValue.split(',').map(item => item.trim()) : [];
        let solution = {
          id: i,
          name: cells[0].displayValue,
          solutionUrl: cells[2].displayValue,
          progression: cells[4].displayValue,
          description: cells[5].displayValue,
          commitment: cells[6].value,
          costicon: cells[8].displayValue,
          costActual: cells[9].displayValue,
          timeline: cells[10].displayValue,
          zeroWaste: cells[11].value,
          reduceEmissions: cells[12].value,
          titleOne: cells[13].value,
          urlOne: cells[14].displayValue,
          titleTwo: cells[15].value,
          urlTwo: cells[16].displayValue,
          titleThree: cells[17].value,
          urlThree: cells[18].displayValue,
          lob: lobArray,
          active: false
        };
        parentProperty.solutions.push(solution);
        i++;
      }
    }

  });
  return finalData;
  
}