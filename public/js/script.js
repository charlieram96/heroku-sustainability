$.extend( $.fn.dataTable.defaults, {
  searching: false,
  paging:  false,
  info: false,
  stateSave: true,

} );


const table = $('#builderTable').DataTable({

  columns: [
    {data: 'category'},
    {data: 'subcategory'},
    {data: 'cost', render: DataTable.render.number(null,null,0,'$')},
    {data: null, className: 'dt-center editor-delete', orderable: false, defaultContent: '<img class="icon-delete pointer" src="/assets/img/trash.svg">'},
  ],
  columnDefs: [
    {
      targets: [0, 2],
      visible: false
    }
  ],
  order: [[0, 'asc'],[ 1, 'asc' ]],
  rowGroup: {
    dataSrc: 'category',
  }
});

$('#builderTable tbody').on('click', 'img.icon-delete', function () {
  table
    .row($(this).parents('tr'))
    .remove()
    .draw();
});

function addRow(category, solution) {

  var rowItems = {
    "category": category,
    "subcategory": solution,
    "cost": 0
  }

  if ( table.column(1).data().toArray().indexOf(rowItems.subcategory) === -1 ) {
    table.row.add(rowItems).draw();
  } else {
    table.rows(function (idx, data, node) {
      return data.subcategory === rowItems.subcategory ? true : false;
    })
    .remove()
    .draw();
  }
  
}