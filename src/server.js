const express = require('express');
require('dotenv').config(); 
const client = require('smartsheet');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'pages/index.html'));
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
    var sheetId = result.data[0].id;  // Choose the first sheet

    // Load one sheet
    smartsheet.sheets.getSheet({id: sheetId})
      .then(function(sheetInfo) {
        console.log(sheetInfo);
      })
      .catch(function(error) {
        console.log(error);
      });
  })
  .catch(function(error) {
    console.log(error);
  });
