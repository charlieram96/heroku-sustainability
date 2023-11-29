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
        return '<span class="badge bg-primary">commitment</span>';
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
  order: [[0, 'desc'],[ 1, 'asc' ]],
  rowGroup: {
    dataSrc: 'category',
  },
  buttons: [{
    extend: 'pdfHtml5',
    text: 'Download plan',
    
    // action: function ( e, dt, node, config ) {

    //   const myModal = new bootstrap.Modal('#exampleModal', {
    //     keyboard: false
    //   })
    //   var modalToggle = document.getElementById('exampleModal'); myModal.show(modalToggle)
    //   checkoutTable.button( 0,0 ).open;
    // },
  }],
  paging: false,
  searching: false,
  info: false,
  
});

var noCost = 0;
var oneCost = 0;
var twoCost = 0;
var threeCost = 0;
var fourCost = 0;
var fiveCost = 0;
var costTotal = 0;
var costAverage = 0;
var rowCount = checkoutTable.rows()[0].length;
for (var row=0;row<rowCount;row++) {
    if (checkoutTable.cells(row, 2).data().indexOf('No Cost')>-1) {
        noCost++;
    } else if (checkoutTable.cells(row, 2).data().indexOf('$')>-1) {
        oneCost++;
    } else if (checkoutTable.cells(row, 2).data().indexOf('$$')>-1) {
        twoCost++;
    } else if (checkoutTable.cells(row, 2).data().indexOf('$$$')>-1) {
        threeCost++;
    } else if (checkoutTable.cells(row, 2).data().indexOf('$$$$')>-1) {
        fourCost++;
    } else if (checkoutTable.cells(row, 2).data().indexOf('$$$$$')>-1) {
        fiveCost++;
    }
}
noCost = noCost * 0; oneCost = oneCost * 1; twoCost = twoCost * 2; threeCost = threeCost * 3; fourCost = fourCost * 4; fiveCost = fiveCost * 5; 
costTotal = noCost + oneCost + twoCost + threeCost + fourCost + fiveCost;
costAverage = costTotal / rowCount;
if (costAverage <= 0) {
  costAverage = "No Cost";
} else if (costAverage <= 1) {
  costAverage = "$";
} else if (costAverage <= 2) {
  costAverage = "$$";
} else if (costAverage <= 3) {
  costAverage = "$$$";
} else if (costAverage <= 4) {
  costAverage = "$$$$";
} else if (costAverage <= 5) {
  costAverage = "$$$$$";
};
console.log("Average: ",costAverage, " Total: ",costTotal);

var immediate = 0;
var zeroMonth = 0;
var fourMonth = 0;
var sevenMonth = 0;
var tenMonth = 0;
var timeTotal = 0;
var timeAverage = 0;
var rowCount = checkoutTable.rows()[0].length;
for (var row=0;row<rowCount;row++) {
    if (checkoutTable.cells(row, 3).data().indexOf('Immediate')>-1) {
      immediate++;
    } else if (checkoutTable.cells(row, 3).data().indexOf('0-3 Months')>-1) {
      zeroMonth++;
    } else if (checkoutTable.cells(row, 3).data().indexOf('4-6 Months')>-1) {
      fourMonth++;
    } else if (checkoutTable.cells(row, 3).data().indexOf('7-9 Months')>-1) {
      sevenMonth++;
    } else if (checkoutTable.cells(row, 3).data().indexOf('10-12+ Months')>-1) {
      tenMonth++;
    }
}
immediate = immediate * 0; zeroMonth = zeroMonth * 1; fourMonth = fourMonth * 2; sevenMonth = sevenMonth * 3; tenMonth = tenMonth * 4;  
timeTotal = immediate + zeroMonth + fourMonth + sevenMonth + tenMonth;
timeAverage = timeTotal / rowCount;
if (timeAverage <= 0) {
  timeAverage = "Immediate";
} else if (timeAverage <= 1) {
  timeAverage = "0-3 Months";
} else if (timeAverage <= 2) {
  timeAverage = "4-6 Months";
} else if (timeAverage <= 3) {
  timeAverage = "7-9 Months";
} else if (timeAverage <= 4) {
  timeAverage = "10-12+ Months";
};
console.log("Average: ",timeAverage, " Total: ",timeTotal);

$('#checkoutTable tbody').on('click', '.icon-delete', function () {
  var index = table.row($(this).parents('tr')).index();
  checkoutTable
    .row($(this).parents('tr'))
    .remove()
    .draw();
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
  order: [[0, 'asc'],[ 1, 'asc' ]],
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
    console.log("DONESKY", dataSet);

  }
}

/* Draws the Table on Page Load from Session Storage if available */
for (var i = 0; i < dataSet.length; i++) {
  if (dataSet[i].commitment !== true) {
    table.row.add(dataSet[i]).draw();
  }
}
