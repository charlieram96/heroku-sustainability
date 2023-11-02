$(document).ready(function() {
  var allData;

  $.getJSON('/src/data/sheetInfo.json', function(data) {
    allData = data;
  });
});

$.extend( $.fn.dataTable.defaults, {
  searching: false,
  paging:  false,
  info: false,
} );


new DataTable('#builderTable', {
  columnDefs: [
    {
      target: 0,
      visible: false
    }
  ],
  order: [[ 1, 'desc' ]],
  rowGroup: {
    dataSrc: 0,
  }
})


