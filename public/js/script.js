$(document).ready(function() {
  var allData;

  $.getJSON('/src/data/sheetInfo.json', function(data) {
    allData = data;
  });
});

const embed = {
  features: [
    {
      category: 'recycling',
      properties: [
        {
          id: 1,
          subCategory: 'Recycling : Full account',
          description: 'Rather than sending all waste to the landfill, divert accepted materials for recycling.',
          lob: ['Enterprise'],
        },
        {
          id: 2,
          subCategory: 'Recycling : E-waste (Office)',
          description: 'Utilize a recycling solution for electronic waste, instead of sending it to the landfill.',
          lob: ['Enterprise'],
        },
        {
          id: 3,
          subCategory: 'Recycling : Printer cartridges (Office)',
          description: 'Utilize a recycling solution for printer ink cartridges, instead of sending them to the landfill.',
          lob: ['Enterprise'],
        },
        {
          id: 4,
          subCategory: 'Terracycle',
          description: 'Terracycle is a solution for difficult to recycle items that are not accepted in a traditional waste stream.',
          lob: ['Enterprise'],
          options: ["Single Source Collection Stream", "Multiple Source Collection Stream"],
          desOps: ["Terracycle is a solution for difficult to recycle items that are not accepted in a traditional waste stream.", "Terracycle is a solution for difficult to recycle items that are not accepted in a traditional waste stream.There are several different 'waste streams' you can choose from including candy and snack wrappers, gloves, and hotel amenties."]
        },
      ]
    },
    {
      category: 'waste',
      properties: [
        {
          id: 1,
          subCategory: 'Waste bins : Signage',
          description: 'Label waste bins based on destination (landfill, recycle, compost), to ensure that consumers are properly sorting their waste.',
          lob: ['Enterprise'],
        }
      ]
    }
  ]


}

var subCats = document.getElementById('subCategories');
var activeButton = document.getElementsByClassName('sub-cat');
var actBut = document.getElementById('actBut');
let type = 'Recycling';

for(var i = 0; i < activeButton.length; i++) {
  activeButton[i].addEventListener('click', function() {
    var current = document.getElementsByClassName('active');
    current[0].className = current[0].className.replace(' active', '');
    this.className += ' active';
    let vlue = this.innerHTML;
    console.log(vlue);
    type = vlue;
  });
}

actBut.addEventListener('click', function() {
  if($('#actBut').hasClass('active')) {
    showRecycling();
  } else {
    document.getElementById('optionCards').style.display = 'none';
  }
});

if($('#actBut').hasClass('active')) {
  showRecycling();
}

function showRecycling() {
  var optionCards = document.getElementById('optionCards');
  // document.getElementById('optionCards').style.display = 'none';
  if (type === 'Recycling') {
    var features = embed.features[0].properties;
    features.forEach(function(feature) {
      optionCards.innerHTML +=
      '<div class="col mb-4">' +
        '<div class="card card-bg p-3">' +
          '<div class="card-body">' +
            '<h5 class="card-title text-light">' +
             feature.subCategory +
            '</h5>' +
            '<p class="card-text text-light"><small>' +
              feature.description +
            '</small></p>' +
            '<div class="d-flex gap-4 justify-content-start">' +
            '<button class="btn btn-light btn-sm second-active rounded-pill px-3" type="button">Learn More</button>' +
            '<button class="btn btn-light btn-sm rounded-pill px-3" type="button"> Select </button>' +
            '</div></div></div></div>'
      });
  } else if (type == 'Waste Management') {
    var features = embed.features[1].properties;
    features.forEach(function(feature) {
      optionCards.innerHTML +=
      '<div class="col mb-4">' +
        '<div class="card card-bg p-3">' +
          '<div class="card-body">' +
            '<h5 class="card-title text-light">' +
             feature.subCategory +
            '</h5>' +
            '<p class="card-text text-light"><small>' +
              feature.description +
            '</small></p>' +
            '<div class="d-flex gap-4 justify-content-start">' +
            '<button class="btn btn-light btn-sm second-active rounded-pill px-3" type="button">Learn More</button>' +
            '<button class="btn btn-light btn-sm rounded-pill px-3" type="button"> Select </button>' +
            '</div></div></div></div>'
      });
  } else {
    console.log(type);
  }
  
  
}

var groupColumn = 0;
var table = $('#example').DataTable({
    columnDefs: [{ visible: false, targets: groupColumn }],
    order: [[groupColumn, 'asc']],
    paging: false,
    displayLength: 25,
    info: false,
    drawCallback: function (settings) {
        var api = this.api();
        var rows = api.rows({ page: 'current' }).nodes();
        var last = null;
 
        api.column(groupColumn, { page: 'current' })
            .data()
            .each(function (group, i) {
                if (last !== group) {
                    $(rows)
                        .eq(i)
                        .before(
                            '<tr class="group"><td colspan="5">' +
                                group +
                                '</td></tr>'
                        );
 
                    last = group;
                }
            });
    }
});
 
// Order by the grouping
$('#example tbody').on('click', 'tr.group', function () {
    var currentOrder = table.order()[0];
    if (currentOrder[0] === groupColumn && currentOrder[1] === 'asc') {
        table.order([groupColumn, 'desc']).draw();
    }
    else {
        table.order([groupColumn, 'asc']).draw();
    }
});

