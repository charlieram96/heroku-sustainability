/* Create or Load Session Storage */
var dataSet;
try {
  dataSet = JSON.parse(sessionStorage.getItem('dataSet')) || [];
} catch (err) {
  console.log("Error parsing sessionStorage.getItem('dataSet')", err);
  dataSet = [];
}

rfpToggle();

/* Table for Checkout Page */
var checkoutTable = $('#checkoutTable').DataTable({
  data: dataSet,
  dom: 'Bt',
  columns: [
    {data: 'category', className: 'fw-bold'},
    {data: 'subcategory'},
    {data: 'cost', render: DataTable.render.number(null,null,0,'$')},
    {data: 'timeline', className: 'dt-center'},
    {data: null, className: 'dt-right', orderable: false, "render": function(data, type, row) {
      if (row.category === 'Default Plan') {
        return '';
      }
      return '<img class="icon-delete pointer" src="/assets/img/trash.svg">'}
    },
  ],
  columnDefs: [
    {
      targets: [0],
      visible: false,
      className: 'fw-bold'
    }
  ],
  order: [[0, 'desc'],[ 1, 'asc' ]],
  rowGroup: {
    dataSrc: 'category',
  },
  buttons: [{
    extend: 'pdfHtml5',
    text: 'Download plan',
    action: function ( e, dt, node, config ) {
      const myModal = new bootstrap.Modal('#exampleModal', {
        keyboard: false
      })
      var modalToggle = document.getElementById('exampleModal'); myModal.show(modalToggle)
    }
  }],
  paging: false,
  searching: false,
  info: false,
});

/* Table for side panel cart */
var table = $('#builderTable').DataTable({
  data: [],
  columns: [
    {data: 'category', className: 'fw-bold'},
    {data: 'subcategory'},
    {data: 'cost', render: DataTable.render.number(null,null,0,'$')},
    {data: 'timeline', className: 'dt-center'},
    {data: null, className: 'dt-right', orderable: false, "render": function(data, type, row) {
      if (row.category === 'Default Plan') {
        return '';
      }
      return '<img class="icon-delete pointer" src="/assets/img/trash.svg">'}
    },
  ],
  columnDefs: [
    {
      targets: [0, 2, 3],
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
  order: [[0, 'desc'],[ 1, 'asc' ]],
  rowGroup: {
    dataSrc: 'category',
  },
  paging: false,
  searching: false,
  info: false,
});

/* Delete Row in Side Panel Cart and Session Storage */
$('#builderTable tbody').on('click', 'img.icon-delete', function () {
  var index = table.row($(this).parents('tr')).index();
  table
    .row($(this).parents('tr'))
    .remove()
    .draw();
  dataSet.splice(index, 1);
  sessionStorage.setItem('dataSet', JSON.stringify(dataSet));   
});

/* Add Row in Side Panel Cart and Session Storage */
function addRow(category, solution, progression, cost, timeline) {
  console.log('addRow', category, solution, progression, cost, timeline)
  var rowItems = {
    "category": category,
    "subcategory": solution,
    "cost": cost,
    "timeline": timeline,
  }

  if ( table.column(1).data().toArray().indexOf(rowItems.subcategory) === -1 ) {
    table.row.add(rowItems).draw();
    dataSet.push(rowItems);
    sessionStorage.setItem('dataSet', JSON.stringify(dataSet));

  } else {
    table.rows(function (idx, data, node) {
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
  
    fetch('/src/data/defaults.json')
    .then(response => response.json())
    .then(data => {
      defaults = data;
      if (rfpToggle.checked) {
        var rowItems = {};
        defaults.defaults.forEach(function(feature) {
          rowItems = {
            "category": "Default Plan",
            "subcategory": feature.solution,
            "cost": 10,
            "timeline": "0-3 months",
          }
          table.row.add(rowItems).draw();
          dataSet.push(rowItems);
          sessionStorage.setItem('dataSet', JSON.stringify(dataSet));
        });
      } else {
        table.rows(function (idx, data, node) {
          return data.category === 'Default Plan' ? true : false;
        })
        .remove()
        .draw();
        dataSet = [];
        sessionStorage.setItem('dataSet', JSON.stringify(dataSet));
      }
    })
    .catch((error) => {
      console.error('Error fetching defaults.json:', error);
    });
}

for (var i = 0; i < dataSet.length; i++) {
  table.row.add(dataSet[i]).draw();
}