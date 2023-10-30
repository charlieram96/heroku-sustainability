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

app.use('/assets', express.static(path.join(__dirname, '../public')));

app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});

console.log(process.env.SMARTSHEET_ACCESS_TOKEN)

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
          if (err) throw err;
          console.log('Saved!');
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  })
  .catch(function(error) {
    console.log(error);
  });
