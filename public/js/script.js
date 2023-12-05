/* Create or Load Session Storage */
var dataSet;
try {
  dataSet = JSON.parse(sessionStorage.getItem('dataSet')) || [];
} catch (err) {
  console.log("Error parsing sessionStorage.getItem('dataSet')", err);
}

var rfpToggleCheck;
try {
  rfpToggleCheck = sessionStorage.getItem('rfpToggleCheck');
  if (rfpToggleCheck === 'true' || rfpToggleCheck === true) {
    document.getElementById('addDefaults').checked = true;
    
  } else {
    document.getElementById('addDefaults').checked = false;
  }
} catch (err) {
  console.log("");
}

/* Table for Checkout Page */
var checkoutTable = $('#checkoutTable').DataTable({
  data: dataSet,
  dom: 'Bt',
  columns: [
    {data: 'category'},
    {data: 'subcategory'},
    {data: 'cost', render: DataTable.render.number(null,null,0,'$')},
    {data: 'timeline', className: 'dt-center'},
    {data: null, className: 'dt-right', orderable: false, "render": function(data, type, row) {
      if (row.commitment === true) {
        return '<span class="badge bg-primary">default</span>';
      }
      return '<img class="icon-delete pointer" src="/assets/img/trash.svg">'}
    },
    {data: 'id'},
    {data: 'commitment'}
  ],
  columnDefs: [
    {
      targets: [0, 5, 6],
      visible: false,
      className: 'fw-bold'
    }
  ],
  order: [0, 'asc'],
  rowGroup: {
    dataSrc: 'category',
  },
  buttons: [{
    extend: 'pdfHtml5',
    text: 'Download PDF',
    exportOptions: {
      columns: [0, 1]
    },
    customize: function(doc) {
      doc.content.splice(1, 0, {
        margin: [0, 0, 0, 12],
        alignment: 'center',
        image: 'data:image/png;base64,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'
      });
    },
  },
  {
    extend: 'excelHtml5',
    text: 'Download Excel',
    exportOptions: {
      columns: [0, 1, 2, 3]
    },
  }],
  paging: false,
  searching: false,
  info: false,
});

$('#checkoutTable tbody').on('click', '.icon-delete', function () {
  var index = table.row($(this).parents('tr')).index();
  checkoutTable
    .row($(this).parents('tr'))
    .remove()
    .draw();

  table.row($(this).parents('tr')).remove().draw();
  dataSet.splice(index, 1);
  sessionStorage.setItem('dataSet', JSON.stringify(dataSet));
});

/* Table for side panel cart */
var table = $('#builderTable').DataTable({
  data: [],
  language: {
    emptyTable: "Nothing in cart"
  },
  columns: [
    {data: 'category'},
    {data: 'subcategory'},
    {data: 'cost', render: DataTable.render.number(null,null,0,'$')},
    {data: 'timeline', className: 'dt-center'},
    {data: null, className: 'dt-right', orderable: false, "render": function(data, type, row) {
      if (row.commitment === true) {
        return '';
      }
      return '<img class="icon-delete pointer" src="/assets/img/trash.svg">'}
    },
    {data: 'id'},
    {data: 'commitment'}
  ],
  columnDefs: [
    {
      targets: [0, 2, 3, 5, 6],
      visible: false
    },
    {
      targets: [0],
      className: 'fw-bold'
    },
    {
      targets: [1],
      width: '80%'
    }
  ],
  order: [0, 'asc'],
  rowGroup: {
    dataSrc: 'category',
  },
  paging: false,
  searching: false,
  info: false,
  scrollCollapse: true,
  scrollY: '80vh',
});

/* Delete Row in Side Panel Cart and Session Storage */
$('#builderTable tbody').on('click', 'img.icon-delete', function () {
  var index = table.row($(this).parents('tr')).index();
  addActive(table.row($(this).parents('tr')).data().subcategory, table.row($(this).parents('tr')).data().id);
  table
    .row($(this).parents('tr'))
    .remove()
    .draw();
  dataSet.splice(index, 1);
  sessionStorage.setItem('dataSet', JSON.stringify(dataSet));
});

/* Add Row in Side Panel Cart and Session Storage */
function addRow(category, solution, progression, cost, timeline, id, commitment) {
  
  console.log('addRow', category, solution, progression, cost, timeline, id, commitment)
  var rowItems = {
    "category": category,
    "subcategory": solution,
    "cost": cost,
    "timeline": timeline,
    "id": id,
    "commitment": commitment
  }

  if ( table.column(1).data().toArray().indexOf(rowItems.subcategory) === -1 ) {
    table.row.add(rowItems).draw();
    dataSet.push(rowItems);
    sessionStorage.setItem('dataSet', JSON.stringify(dataSet));

  } else {
    table.rows(function (idx, data, node) {
      dataSet.splice(node, 1, rowItems);
      sessionStorage.removeItem('dataSet', JSON.stringify(dataSet));
      return data.subcategory === rowItems.subcategory ? true : false;
    })
    .remove()
    .draw();
    
  }  
}

/* Merge Builder Table to Checkout Table */
function mergeTables() {
  checkoutTable.clear().draw();
  var checkoutData = table.data().toArray();
  checkoutData.forEach(function(row) {
    checkoutTable.row.add(row).draw();
  });
}

/* Create Defaults if RFP toggle is checked */
function rfpToggle() {
  var rfpToggle = document.getElementById('addDefaults');

  if (rfpToggle.checked === true) {
    sessionStorage.setItem('rfpToggleCheck', true);
    for (var i = 0; i < subCategories.features.length; i++) {
      var props = subCategories.features[i].properties;
      for (var prop in props) {
        var solutions = props[prop].solutions;
        for (var solution in solutions) {
          if (solutions[solution].commitment === true){
            rowItems = {
              "category": subCategories.features[i].category,
              "subcategory": solutions[solution].name,
              "cost": solutions[solution].costicon,
              "timeline": solutions[solution].timeline,
              "id": solutions[solution].id,
              "commitment": solutions[solution].commitment
            }

            dataSet.push(rowItems);
            sessionStorage.setItem('dataSet', JSON.stringify(dataSet));
          }
        }
      }
    }
  } else {
    sessionStorage.setItem('rfpToggleCheck', false);
    for (var i = 0; i < dataSet.length; i++) {
      console.log(i);
      if (dataSet[i].commitment === true) {
        dataSet.splice(i, 1);
        sessionStorage.setItem('dataSet', JSON.stringify(dataSet));
        i--;
      }
    }
  }
}

/* Draws the Table on Page Load from Session Storage if available */
for (var i = 0; i < dataSet.length; i++) {
  if (dataSet[i].commitment !== true) {
    table.row.add(dataSet[i]).draw();
  }
}


