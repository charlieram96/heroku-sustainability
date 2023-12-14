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

let embed = 0;
let source = 0;
let minimize = 0;
let operate = 0;
let train = 0;

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
    {data: 'commitment'},
    {data: null, 'render': function(data, type, row) {
      if (row.progression) {
        return 'progression';
      }
        return '';
      }
    },
    {data: 'description'},
    {data: 'desc'}

  ],
  columnDefs: [
    {
      targets: [0, 5, 6, 7, 8, 9],
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
    title: 'Sustainability Solutions',
    exportOptions: {
      columns: [0, 8],
    },
    customize: function(doc) {
      doc.defaultStyle.fontSize = 8;
      doc.content[1].table.widths = [125, '*'];
      var rowCount =  checkoutTable.rows()[0].length;
      for (var row = 0; row < rowCount; row++) {
        if (checkoutTable.cells(row, 0).data().indexOf('Embed Circularity') >-1 ) {
          embed++;
        } else if ( checkoutTable.cells(row, 0).data().indexOf('Source Sustainably') >-1 ) {
          source++;
        } else if ( checkoutTable.cells(row, 0).data().indexOf('Minimize Food Waste') >-1 ) {
          minimize++;
        } else if ( checkoutTable.cells(row, 0).data().indexOf('Operate Efficiently') >-1 ) {
          operate++;
        } else if ( checkoutTable.cells(row, 0).data().indexOf('Train & Certify') >-1 ) {
          train++;
        }
      }
      console.log(embed);
      console.log(source);
      var rowSpanSource = 1 + embed;
      var rowSpanMinimize = 1 + embed + source;
      var rowSpanOperate = 1 + embed + source + minimize;
      var rowSpanTrain = 1 + embed + source + minimize + operate;
      if (embed > 0) {
        doc.content[1].table.body[1][0].rowSpan = embed;
      }
      if (source > 0) {
        doc.content[1].table.body[rowSpanSource][0].rowSpan = source;
      }
      if (minimize > 0) {
        doc.content[1].table.body[rowSpanMinimize][0].rowSpan = minimize;
      }
      if (operate > 0) {
        doc.content[1].table.body[rowSpanOperate][0].rowSpan = operate;
      }
      if (train > 0) {
        doc.content[1].table.body[rowSpanTrain][0].rowSpan = train;
      }
      

      console.log(doc);
      doc.content[1].layout = 'lightHorizontalLines';
      doc.styles.tableHeader.alignment = 'left';
    },
  },
  {
    extend: 'excelHtml5',
    text: 'Download Excel',
    exportOptions: {
      columns: [0, 1, 9, 2, 3]
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
    {data: 'commitment'},
    {data: null, 'render': function(data, type, row) {
      if (row.progression) {
        return 'progression';
      }
        return '';
      }
    },
    {data: 'description'},
    {data: 'desc'}
  ],
  columnDefs: [
    {
      targets: [0, 2, 3, 5, 6, 7, 8, 9],
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
const addRow = (category, solution, progression, cost, timeline, id, commitment, description) => {
  var rowItems = {
    "category": category,
    "subcategory": solution,
    "cost": cost,
    "timeline": timeline,
    "id": id,
    "commitment": commitment,
    "progression": progression,
    "description": solution + ": " + description,
    "desc": description
  }

  if (table.column(1).data().toArray().indexOf(rowItems.subcategory) === -1) {
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
const mergeTables = () => {
  checkoutTable.clear().draw();
  var checkoutData = table.data().toArray();
  checkoutData.forEach(function(row) {
    checkoutTable.row.add(row).draw();
  });
}

/* Create Defaults if RFP toggle is checked */
const rfpToggle = () => {
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
              "commitment": solutions[solution].commitment,
              "progression": solutions[solution].progression,
              "description": solutions[solution].name + ": " + solutions[solution].description,
              "desc": solutions[solution].description
            }
            console.log(rowItems);
            dataSet.push(rowItems);
            sessionStorage.setItem('dataSet', JSON.stringify(dataSet));
          }
        }
      }
    }
  } else {

    sessionStorage.setItem('rfpToggleCheck', false);
    for (var i = 0; i < dataSet.length; i++) {
      if (dataSet[i].commitment === true) {
        //addActive(solutions[solution].name, solutions[solution].id)
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