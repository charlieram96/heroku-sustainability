$(document).ready(function() {
  var allData;

  $.getJSON('/src/data/sheetInfo.json', function(data) {
    allData = data;
    console.log(allData.rows);
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
document.getElementById("recycleClick").addEventListener("click", showRecycling);
document.getElementById("wasteClick").addEventListener("click", showWaste);

function showRecycling() {
  var optionCards = document.getElementById('optionCards');
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
  
}

function showWaste() {
  var optionCards = document.getElementById('optionCards');
  var properties = embed.features.properties;
  properties.forEach(function(property) {
    optionCards.innerHTML =
    `<div class="col mb-4">
      <div class="card card-bg p-3">
        <div class="card-body">
          <h5 class="card-title text-light">
            this is a test
          </h5>
          <p class="card-text text-light"><small>
            nodescription
          </small></p>
          <div class="d-flex gap-4 justify-content-start">
          <button class="btn btn-light btn-sm second-active rounded-pill px-3" type="button">Learn More</button>
          <button class="btn btn-light btn-sm rounded-pill px-3" type="button"> Select </button>
          </div>
        </div>
      </div>
    </div>`
  });
}