const client = require('smartsheet');
const smartsheet = createClient({
  accessToken: '77CWssrL559axg17b1IeoSKKtSedBrWQag2qS',
  logLevel: 'info'
});

// The `smartsheet` variable now contains access to all of the APIs

// Set queryParameters for `include` and pagination
var options = {
  queryParameters: {
    include: "attachments",
    includeAll: true
  }
};

// List all sheets
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

