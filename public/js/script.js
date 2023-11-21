$.extend( $.fn.dataTable.defaults, {
  searching: false,
  paging:  false,
  info: false,
  extend: 'savedStates',
    config: {
      save: true,
      create: true,
    }
});

//localStorage.removeItem('dataSet');
var dataSet;
try {
  dataSet = JSON.parse(localStorage.getItem('dataSet')) || [];
} catch (err) {
  dataSet = [];
}
var checkoutTable = $('#checkoutTable').DataTable({
  data: dataSet,
  dom: 'Bt',
  columns: [
    {data: 'category', className: 'fw-bold'},
    {data: 'subcategory'},
    {data: 'timeline', className: 'dt-center'},
    {data: 'cost', render: DataTable.render.number(null,null,0,'$')},
    {data: null, className: 'dt-right', orderable: false, "render": function(data, type, row) {
      if (row.category === 'Aramark Commitments') {
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
  }]
});

var table = $('#builderTable').DataTable({
  data: [],
  columns: [
    {data: 'category', className: 'fw-bold'},
    {data: 'subcategory'},
    {data: 'cost', render: DataTable.render.number(null,null,0,'$')},
    {data: 'timeline', className: 'dt-center'},
    {data: null, className: 'dt-right', orderable: false, "render": function(data, type, row) {
      if (row.category === 'Aramark Commitments') {
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
    }
  ],
  order: [[0, 'desc'],[ 1, 'asc' ]],
  rowGroup: {
    dataSrc: 'category',
  }
});

if (dataSet.length === 0) {
  fetch('/src/data/defaults.json')
  .then(response => response.json())
  .then(data => {
    defaults = data;
    var rowItems = {};
    defaults.defaults.forEach(function(feature) {
      rowItems = {
        "category": "Default Plan",
        "subcategory": feature.solution,
        "cost": 10,
        "timeline": "0-3 months",
      }
      dataSet.push(rowItems);
      localStorage.setItem('dataSet', JSON.stringify(dataSet));
    });
  })
  .catch((error) => {
    console.error('Error fetching defaults.json:', error);
  });
}

for (var i = 0; i < dataSet.length; i++) {
  table.row.add(dataSet[i]).draw();
}

$('#builderTable tbody').on('click', 'img.icon-delete', function () {
  var index = table.row($(this).parents('tr')).index();
  table
    .row($(this).parents('tr'))
    .remove()
    .draw();
  dataSet.splice(index, 1);
  localStorage.setItem('dataSet', JSON.stringify(dataSet));   
});

function addRow(category, solution) {
  var rowItems = {
    "category": category,
    "subcategory": solution,
    "cost": 10,
    "timeline": "0-3 months",
  }

  if ( table.column(1).data().toArray().indexOf(rowItems.subcategory) === -1 ) {
    table.row.add(rowItems).draw();
    dataSet.push(rowItems);
    localStorage.setItem('dataSet', JSON.stringify(dataSet));

  } else {
    table.rows(function (idx, data, node) {
      return data.subcategory === rowItems.subcategory ? true : false;
    })
    .remove()
    .draw();
  }  
}

function mergeTables() {
  checkoutTable.clear().draw();
  var checkoutData = table.data().toArray();
  checkoutData.forEach(function(row) {
    checkoutTable.row.add(row).draw();
  });
}