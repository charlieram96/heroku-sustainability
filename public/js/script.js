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
  columns: [
    {data: 'category'},
    {data: 'subcategory'},
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
      visible: false
    }
  ],
  order: [[0, 'asc'],[ 1, 'asc' ]],
  rowGroup: {
    dataSrc: 'category',
  }
});

var table = $('#builderTable').DataTable({
  data: [],
  columns: [
    {data: 'category'},
    {data: 'subcategory'},
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
      targets: [0, 2],
      visible: false
    }
  ],
  order: [[0, 'asc'],[ 1, 'asc' ]],
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
        "category": "Aramark Commitments",
        "subcategory": feature.solution,
        "cost": 0,
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
    "cost": 0,
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