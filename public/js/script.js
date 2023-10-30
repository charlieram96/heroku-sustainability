$(document).ready(function() {
  var allData;

  $.getJSON('/src/data/sheetInfo.json', function(data) {
    allData = data;
    console.log(allData.rows);
  });
});