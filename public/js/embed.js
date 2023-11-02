

const embed = {
  features: [
    {
      category: 'recycling',
      properties: [
        {
          id: 1,
          subCategory: 'Recycling : Full account',
          description: 'Rather than sending all waste to the landfill, divert accepted materials for recycling.',
          lob: ['<span class="d-flex justify-content-between"><span style="margin-top: 3px;" class="badge bg-secondary">Enterprise</span><span class="text-warning">$$<span class="text-white-50">$$$</span></span></span>'],
        },
        {
          id: 2,
          subCategory: 'Recycling : E-waste (Office)',
          description: 'Utilize a recycling solution for electronic waste, instead of sending it to the landfill.',
          lob: ['<span class="d-flex justify-content-between"><span style="margin-top: 3px;" class="badge bg-secondary">Enterprise</span><span class="text-warning">$<span class="text-white-50">$$$$</span></span></span>'],
        },
        {
          id: 3,
          subCategory: 'Recycling : Printer cartridges (Office)',
          description: 'Utilize a recycling solution for printer ink cartridges, instead of sending them to the landfill.',
          lob: ['<span class="d-flex justify-content-between"><span style="margin-top: 3px;" class="badge bg-secondary">Enterprise</span><span class="text-white-50">$$$$$</span></span>'],
        },
        {
          id: 4,
          subCategory: 'Terracycle',
          description: 'Terracycle is a solution for difficult to recycle items that are not accepted in a traditional waste stream.',
          lob: ['<span class="d-flex justify-content-between"><span style="margin-top: 3px;" class="badge bg-secondary">Enterprise</span><span class="text-warning">$<span class="text-white-50">$$$$</span></span></span>'],
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
          lob: ['<span class="d-flex justify-content-between"><span style="margin-top: 3px;" class="badge bg-secondary">Enterprise</span><span class="text-warning">$$$<span class="text-white-50">$$</span></span></span>'],
        },
        {
          id: 2,
          subCategory: 'Waste system : Twin bins (landfill, recycle)',
          description: 'Label waste bins based on destination (landfill, recycle, compost), to ensure that consumers are properly sorting their waste.',
          lob: ['<span class="d-flex justify-content-between"><span style="margin-top: 3px;" class="badge bg-secondary">Enterprise</span><span class="text-warning">$<span class="text-white-50">$$$$</span></span></span>'],
        },
        {
          id: 3,
          subCategory: 'Waste system : Triple bins (landfill, recycle, compost)',
          description: 'Implement a triple waste bin system at every station - one for landfill, one for recycle, and one for compost.',
          lob: ['<span class="d-flex justify-content-between"><span style="margin-top: 3px;" class="badge bg-secondary">Enterprise</span><span class="text-warning">$$$<span class="text-white-50">$$</span></span></span>'],
        },
        {
          id: 4,
          subCategory: 'Intuitive AI- Oscar Sort',
          description: 'Oscar Sort is a front of house tech solution to educate consumers on proper waste sorting. It also includes post consumer data tracking.',
          lob: ['<span class="d-flex justify-content-between"><span style="margin-top: 3px;" class="badge bg-secondary">Enterprise</span><span class="text-warning">$$$$<span class="text-white-50">$</span></span></span>'],
        },
        {
          id: 5,
          subCategory: 'Waste audit',
          description: 'Conduct a waste audit to analyze your waste stream and identify opportunities for waste reduction.',
          lob: ['<span class="d-flex justify-content-between"><span style="margin-top: 3px;" class="badge bg-secondary">Enterprise</span><span class="text-warning">$<span class="text-white-50">$$$$</span></span></span>'],
        },
      ]
    },
    {
      category: 'bulk',
      properties: [
        {
          id: 1,
          subCategory: 'Bulk  : Condiments (FOH or catering)',
          description: 'Provide bulk condiments in front of house instead of individual packets to cut down on single-use waste.',
          lob: ['<span class="d-flex justify-content-between"><span style="margin-top: 3px;" class="badge bg-secondary">Enterprise</span><span class="text-warning">$$<span class="text-white-50">$$$</span></span></span>'],
        },
        {
          id: 2,
          subCategory: 'Bulk : Sugar in breakrooms',
          description: 'Provide bulk sugar in breakrooms instead of individual packets.',
          lob: ['<span class="d-flex justify-content-between"><span style="margin-top: 3px;" class="badge bg-secondary">Enterprise</span><span class="text-warning">$$<span class="text-white-50">$$$</span></span></span>'],
        },
        {
          id: 3,
          subCategory: 'Bulk : Convenience store products',
          description: 'Utilize bulk products in convenience stores.',
          lob: ['<span class="d-flex justify-content-between"><span style="margin-top: 3px;" class="badge bg-secondary">Enterprise</span><span class="text-warning">$$<span class="text-white-50">$$$</span></span></span>'],
        },
      ]
    },
    {
      category: 'beverages',
      properties: [
        {
          id: 1,
          subCategory: 'Straws : Eco-friendly',
          description: 'Provide eco-friendly straws instead of plastic ones.',
          lob: ['<span class="d-flex justify-content-between"><span style="margin-top: 3px;" class="badge bg-secondary">Enterprise</span><span class="text-warning">$$<span class="text-white-50">$$$</span></span></span>'],
        },
        {
          id: 2,
          subCategory: 'Straws : Eco-friendly straws (on request only)',
          description: 'Only provide eco-friendly straws, and only when a consumer requests one.',
          lob: ['<span class="d-flex justify-content-between"><span style="margin-top: 3px;" class="badge bg-secondary">Enterprise</span><span class="text-warning">$$<span class="text-white-50">$$$</span></span></span>'],
        },
        {
          id: 3,
          subCategory: 'Cups : Ball aluminum (instead of plastic)',
          description: 'Use aluminum cups, which can be easily recycled, rather than plastic cups.',
          lob: ['<span class="d-flex justify-content-between"><span style="margin-top: 3px;" class="badge bg-secondary">Enterprise</span><span class="text-warning">$$<span class="text-white-50">$$$</span></span></span>'],
        },
        {
          id: 4,
          subCategory: 'Cups : No lids in service',
          description: 'Eliminate lids in service in order to reduce waste.',
          lob: ['<span class="d-flex justify-content-between"><span style="margin-top: 3px;" class="badge bg-secondary">Enterprise</span><span class="text-warning">$$<span class="text-white-50">$$$</span></span></span>'],
        },
        {
          id: 5,
          subCategory: 'Cups : BYO program',
          description: 'Patrons can bring their own cup to receive a discount for hot and/or cold beverages. *Local Heath Department approval may be necessary.',
          lob: ['<span class="d-flex justify-content-between"><span style="margin-top: 3px;" class="badge bg-secondary">Enterprise</span><span class="text-warning">$$<span class="text-white-50">$$$</span></span></span>'],
        },
        {
          id: 6,
          subCategory: 'Cups : Supplied on site program',
          description: 'Offer discounts to consumers that bring their own cup or mug.',
          lob: ['<span class="d-flex justify-content-between"><span style="margin-top: 3px;" class="badge bg-secondary">Enterprise</span><span class="text-warning">$$<span class="text-white-50">$$$</span></span></span>'],
        },
        {
          id: 7,
          subCategory: 'No plastic bottles : Aluminum and glass',
          description: 'Only offer beverages in aluminum or glass bottles and cans instead of plastic bottles.',
          lob: ['<span class="d-flex justify-content-between"><span style="margin-top: 3px;" class="badge bg-secondary">Enterprise</span><span class="text-warning">$$<span class="text-white-50">$$$</span></span></span>'],
        },
        {
          id: 8,
          subCategory: 'No plastic bottles : Refill system',
          description: 'Provide a refill system instead of plastic bottles.',
          lob: ['<span class="d-flex justify-content-between"><span style="margin-top: 3px;" class="badge bg-secondary">Enterprise</span><span class="text-warning">$$<span class="text-white-50">$$$</span></span></span>'],
        }
      ]
    },
    {
      category: 'dining',
      properties: [
        {
          id: 1,
          subCategory: 'Durable smallwares',
          description: 'Better smallwares to prevent breakage and reduce waste.',
          lob: ['<span class="d-flex justify-content-between"><span style="margin-top: 3px;" class="badge bg-secondary">Enterprise</span><span class="text-warning">$$<span class="text-white-50">$$$</span></span></span>'],
        },
        {
          id: 2,
          subCategory: 'Single serve dispensers : Napkins',
          description: 'Use single serve packaging dispensers instead of individually wrapped items.',
          lob: ['<span class="d-flex justify-content-between"><span style="margin-top: 3px;" class="badge bg-secondary">Enterprise</span><span class="text-warning">$$<span class="text-white-50">$$$</span></span></span>'],
        },
        {
          id: 3,
          subCategory: 'Dining : Reusable to-go containers (deposit system)',
          description: 'Provide reusable to-go containers instead of single-use containers, and charge a deposit for the container.',
          lob: ['<span class="d-flex justify-content-between"><span style="margin-top: 3px;" class="badge bg-secondary">Enterprise</span><span class="text-warning">$$<span class="text-white-50">$$$</span></span></span>'],
        },
        {
          id: 4,
          subCategory: 'Dining : Reusable to-go containers (deposit system, on request only)',
          description: 'Only provide reusable to-go containers, and only when a consumer requests one. Charge a deposit for the container.',
          lob: ['<span class="d-flex justify-content-between"><span style="margin-top: 3px;" class="badge bg-secondary">Enterprise</span><span class="text-warning">$$<span class="text-white-50">$$$</span></span></span>'],
        },
        {
          id: 5,
          subCategory: 'Dining : Reusable to-go containers (deposit system, on request only)',
          description: 'Only provide reusable to-go containers, and only when a consumer requests one. Charge a deposit for the container.',
          lob: ['<span class="d-flex justify-content-between"><span style="margin-top: 3px;" class="badge bg-secondary">Enterprise</span><span class="text-warning">$$<span class="text-white-50">$$$</span></span></span>'],
        },
        {
          id: 6,
          subCategory: 'Dining : Reusable to-go containers (deposit system, on request only)',
          description: 'Only provide reusable to-go containers, and only when a consumer requests one. Charge a deposit for the container.',
          lob: ['<span class="d-flex justify-content-between"><span style="margin-top: 3px;" class="badge bg-secondary">Enterprise</span><span class="text-warning">$$<span class="text-white-50">$$$</span></span></span>'],
        },
        {
          id: 7,
          subCategory: 'Dining : Reusable to-go containers (deposit system, on request only)',
          description: 'Only provide reusable to-go containers, and only when a consumer requests one. Charge a deposit for the container.',
          lob: ['<span class="d-flex justify-content-between"><span style="margin-top: 3px;" class="badge bg-secondary">Enterprise</span><span class="text-warning">$$<span class="text-white-50">$$$</span></span></span>'],
        },
        {
          id: 8,
          subCategory: 'Dining : Reusable to-go containers (deposit system, on request only)',
          description: 'Only provide reusable to-go containers, and only when a consumer requests one. Charge a deposit for the container.',
          lob: ['<span class="d-flex justify-content-between"><span style="margin-top: 3px;" class="badge bg-secondary">Enterprise</span><span class="text-warning">$$<span class="text-white-50">$$$</span></span></span>'],
        },
      ]
    },
    {
      category: 'catering',
      properties: [
        {
          id: 1,
          subCategory: 'Catering : Zero waste / environmentally preferable',
          description: 'Design catering programs to be zero waste or primarily use products with environmentally preferable specifications (fair trade, local, etc.).',
          lob: ['<span class="d-flex justify-content-between"><span style="margin-top: 3px;" class="badge bg-secondary">Enterprise</span><span class="text-warning">$$<span class="text-white-50">$$$</span></span></span>'],
        }
      ]
    },
    {
      category: 'recycled',
      properties: [
        {
          id: 1,
          subCategory: 'Recycled content : Napkins',
          description: 'Provide napkins made from post consumer content, which use less material overall.',
          lob: ['<span class="d-flex justify-content-between"><span style="margin-top: 3px;" class="badge bg-secondary">Enterprise</span><span class="text-warning">$$<span class="text-white-50">$$$</span></span></span>'],
        },
        {
          id: 2,
          subCategory: 'Recycled content : Toilet paper',
          description: 'Provide toilet paper made from post consumer content, which uses less material overall.',
          lob: ['<span class="d-flex justify-content-between"><span style="margin-top: 3px;" class="badge bg-secondary">Enterprise</span><span class="text-warning">$$<span class="text-white-50">$$$</span></span></span>'],
        },
        {
          id: 3,
          subCategory: 'Recycled content : Paper towels',
          description: 'Provide paper towels made from post consumer content, which use less material overall.',
          lob: ['<span class="d-flex justify-content-between"><span style="margin-top: 3px;" class="badge bg-secondary">Enterprise</span><span class="text-warning">$$<span class="text-white-50">$$$</span></span></span>'],
        },
        {
          id: 4,
          subCategory: 'Recycled content : Uniforms',
          description: 'Choose uniforms made from recycled content or certified organic cotton.',
          lob: ['<span class="d-flex justify-content-between"><span style="margin-top: 3px;" class="badge bg-secondary">Enterprise</span><span class="text-warning">$$<span class="text-white-50">$$$</span></span></span>'],
        }
      ]
    },
    {
      category: 'packaging',
      properties: [
        {
          id: 1,
          subCategory: 'Compostable : To-go meals',
          description: 'Provide compostable packaging for to-go meals.',
          lob: ['<span class="d-flex justify-content-between"><span style="margin-top: 3px;" class="badge bg-secondary">Enterprise</span><span class="text-warning">$$<span class="text-white-50">$$$</span></span></span>'],
        },
        {
          id: 2,
          subCategory: 'Compostable : Meals in house',
          description: 'Provide compostable packaging for meals in house.',
          lob: ['<span class="d-flex justify-content-between"><span style="margin-top: 3px;" class="badge bg-secondary">Enterprise</span><span class="text-warning">$$<span class="text-white-50">$$$</span></span></span>'],
        },
        {
          id: 3,
          subCategory: 'Single use plastic : Elimination in service',
          description: 'Eliminate single use plastic in service areas to cut down on packaging waste.',
          lob: ['<span class="d-flex justify-content-between"><span style="margin-top: 3px;" class="badge bg-secondary">Enterprise</span><span class="text-warning">$$<span class="text-white-50">$$$</span></span></span>'],
        },
        {
          id: 4,
          subCategory: 'No plastic bags : FOH',
          description: 'Remove plastic bags from the front of house.',
          lob: ['<span class="d-flex justify-content-between"><span style="margin-top: 3px;" class="badge bg-secondary">Enterprise</span><span class="text-warning">$$<span class="text-white-50">$$$</span></span></span>'],
        },
        {
          id: 5,
          subCategory: 'No plastic bags : FOH and BOH',
          description: 'Remove plastic bags from the front and back of house.',
          lob: ['<span class="d-flex justify-content-between"><span style="margin-top: 3px;" class="badge bg-secondary">Enterprise</span><span class="text-warning">$$<span class="text-white-50">$$$</span></span></span>'],
        },
        {
          id: 6,
          subCategory: 'No styrofoam (EPS)',
          description: 'Eliminate the use of EPS (expanded polystyrene) in service.',
          lob: ['<span class="d-flex justify-content-between"><span style="margin-top: 3px;" class="badge bg-secondary">Enterprise</span><span class="text-warning">$$<span class="text-white-50">$$$</span></span></span>'],
        },
        {
          id: 7,
          subCategory: 'Containers : Replace disposable with reusable',
          description: 'Reusable containers replace disposable in operations.',
          lob: ['<span class="d-flex justify-content-between"><span style="margin-top: 3px;" class="badge bg-secondary">Enterprise</span><span class="text-warning">$$<span class="text-white-50">$$$</span></span></span>'],
        },
        {
          id: 8,
          subCategory: 'Containers : Reusable rent & wash service',
          description: 'Rent and wash reusable containers instead of using disposable containers.',
          lob: ['<span class="d-flex justify-content-between"><span style="margin-top: 3px;" class="badge bg-secondary">Enterprise</span><span class="text-warning">$$<span class="text-white-50">$$$</span></span></span>'],
        },
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
    '<div class="card-header border-bottom-0 py-0">' +
    feature.lob +
    '</div>' +
    '<div class="card-body">' +
    '<h5 class="card-title text-light">' +
      feature.subCategory +
    '</h5>' +
    '<p class="card-text text-light"><small>' +
      feature.description +
    '</small></p></div>' +
    '<div class="card-footer>' +
    '<div class="px-2">' +
    '<button class="btn btn-light btn-sm rounded-pill mx-3 px-3" type="button">Learn More</button>' +
    '<button class="btn btn-light btn-sm rounded-pill px-3" type="button" data-bs-toggle="button" aria-pressed="true">Select</button>' +
    '</div></div></div></div>'
  });  
}

