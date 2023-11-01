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
let typeVal = 'Recycling';

console.log(embed.features[1]);

for(var i = 0; i < activeButton.length; i++) {
  activeButton[i].addEventListener('click', function() {
    var current = document.getElementsByClassName('active');
    current[0].className = current[0].className.replace(' active', '');
    this.className += ' active';
    let typeVal = this.innerHTML;
    console.log(typeVal);
    showRecycling(typeVal);
  });
}

if($('#actBut').hasClass('active')) {
  showRecycling(typeVal);
  console.log(typeVal)
}

actBut.addEventListener('click', function(typeVal) {
  if($('#actBut').hasClass('active')) {
    showRecycling(typeVal);
  } else {
    document.getElementById('optionCards').style.display = 'none';
  }
});



function showRecycling(typeVal) {
  var optionCards = document.getElementById('optionCards');
  optionCards.innerHTML = '';
  
  if (typeVal == 'Recycling') {
    i=0;
  }else if (typeVal == 'Waste Management') {
    i=1;
  }else if (typeVal == 'Bulk Purchases') {
    i=2;
  }else if (typeVal == 'Beverages') {
    i=3;
  }else if (typeVal == 'Dining') {
    i=4;
  }else if (typeVal == 'Catering') {
    i=5;
  }else if (typeVal == 'Recycled Content') {
    i=6;
  }else if (typeVal == 'Packaging') {
    i=7;
  }else {
    console.log('error');
  }
  var features = embed.features[i].properties;
  features.forEach(function(feature) {
    optionCards.innerHTML +=
    '<div class="col mb-4">' +
    '<div class="card h-100 card-bg p-3 d-flex flex-column">' +
    '<div class="card-body">' +
    '<h5 class="card-title text-light">' +
      feature.subCategory +
    '</h5>' +
    '<p class="card-text text-light"><small>' +
      feature.description +
    '</small></p>' +
    '<div class="gap-4 d-flex flex-row">' +
    '<button class="btn btn-light btn-sm rounded-pill px-3" type="button">Learn More</button>' +
    '<button class="btn btn-light btn-sm rounded-pill px-3" type="button"> Select </button>' +
    '</div></div></div></div>'
  });  
}

new DataTable('#builderTable', {
  columnDefs: [
    {
      target: 0,
      visible: false
    }
  ],
  order: [[ 1, 'asc' ]],
  rowGroup: {
    dataSrc: 0,
  }
})


