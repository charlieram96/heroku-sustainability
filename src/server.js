const express = require('express');
require('dotenv').config(); 
const client = require('smartsheet');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages/index.html'));
});

app.get('/builder', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages/builder.html'));
});

app.get('/checkout', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages/checkout.html'));
});

app.get('/src/data/sheetInfo.json', (req, res) => {
  res.sendFile(path.join(__dirname, 'data/sheetInfo.json'));
});

app.get('/src/data/data.json', (req, res) => {
  res.sendFile(path.join(__dirname, 'data/data.json'));
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
    var sheetId = process.env.SMARTSHEET_SHEET_ID;  // Sustainability Source Data

    smartsheet.sheets.getSheet({id: sheetId})
      .then(function(sheetInfo) {
        fs.writeFile('src/data/sheetInfo.json', JSON.stringify(sheetInfo), function(err) {
          sheetInfo.columns.forEach(function(column) {
            columnMap[column.title] = column.id;
          });
          
          // Accumulate rows needing update here
          var parentRows = [];

          // Evaluate each row in sheet
          sheetInfo.rows.forEach(function(row) {
              let rowToReturn = evaluateRowAndBuildParentList(row);
              if (rowToReturn)
                parentRows.push(rowToReturn);
          });

          if (parentRows.length == 0) {
            console.log("No Parent Rows", parentRows.length);
          } else {
            fs.writeFile('src/data/parentCategory.json', JSON.stringify(parentRows), function(err) {
            console.log("Parent Rows: " + parentRows);
            if (err) throw err;
              console.log('Categories Saved!');
            });
          }
          if (err) throw err;
          console.log('All Data Saved!');
        });

      })
      .catch(function(error) {
        console.log(error);
      });
  })
  .catch(function(error) {
    console.log(error);
  });
