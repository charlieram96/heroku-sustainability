/* Fetch and load final-data.json and run functions */
let subCategories = null;
let typeVal = 0;
let categoryIndex = 0;
fetch('/src/data/final-data.json')
.then(response => response.json())
.then(data => {
  subCategories = data;
  createCategories();
  createSubCategories(categoryIndex);
  showSolutions(categoryIndex, typeVal);
  showCategoryDescription(categoryIndex);
  console.log("Data Loaded");
  checkDataSet();
})
.catch((error) => {
  console.error('Error fetching final-data.json:', error);
});

/* Create Category Buttons */
function createCategories() {
  subCategories.features.forEach(function(feature) {
    let categoryButtons = document.getElementById('categoryButtons');
    categoryButtons.classList.add('btn-group', 'd-flex', 'flex-grow-1')
    categoryButtons.innerHTML += 
    `<button style="font-size: 14px;" onclick="getCategoryPosition(this)" class="category-button rounded-0 py-3 btn btn-primary" type="button">${feature.category}</button>`
  });
  let activeCategory = document.getElementsByClassName('category-button');
  activeCategory[0].className += ' active-category';
}

/* Create Category Description */
function showCategoryDescription(categoryIndex) {
  var categoryDescription = document.getElementById('categoryDescription');
  categoryDescription.innerHTML = '';
  var feature = subCategories.features[categoryIndex];
  categoryDescription.innerHTML += 
  `<h6 class="text-light">${feature.subheader}</h6>
  <p class="pt-2 mb-0 text-light fs-6">${feature.description}</p>`
}

/* Change Category Active Class and show Sub Categories */
function createSubCategories(categoryIndex) {
  let subCategoryButtons = document.getElementById('subCategoryButtons');
  subCategoryButtons.classList.add('overflow-auto', 'd-flex', 'gap-4', 'justify-content-start', 'py-3')
  subCategoryButtons.innerHTML = '';
  let subCategory = subCategories.features[categoryIndex].properties
  subCategory.forEach(function(subCategory) {
    subCategoryButtons.innerHTML += 
    `<button class="text-nowrap sub-category btn btn-light rounded-pill px-3" type="button" onclick="getSubcategoryPosition(this)"> ${subCategory.subCategory}</button>`
  });
  let subCategoryClass = document.getElementsByClassName('sub-category');
  let subCategoryPosition = subCategoryClass[0]
  subCategoryPosition.className += ' active';
}

/* Get the position of the current active Category */ 
function getCategoryPosition(el) {
  typeVal = 0;
  var optionCards = document.getElementById('optionCards');
  optionCards.innerHTML = '';
  let activeCategory = document.getElementsByClassName('active-category');
  activeCategory[0].className = activeCategory[0].className.replace(' active-category', '');
  el.className += ' active-category';
  let i = Array.from(el.parentNode.children).indexOf(el)
  categoryIndex = i
  createSubCategories(categoryIndex);
  showSolutions(categoryIndex, typeVal);
  showCategoryDescription(categoryIndex);
}

/* Get the position of the current active Sub Category */
function getSubcategoryPosition(el) {
  let active = document.getElementsByClassName('active');
  active[0].className = active[0].className.replace(' active', '');
  el.className += ' active';
  let i = Array.from(el.parentNode.children).indexOf(el)
  typeVal = i
  showSolutions(categoryIndex, typeVal);
}

/* Show the Solution Cards */
function showSolutions(categoryIndex, typeVal) {
  var optionCards = document.getElementById('optionCards');
  optionCards.classList.add('mt-4', 'row', 'row-cols-xl-3', 'row-cols-md-2', 'pb-5');
  optionCards.innerHTML = '';
  var features = subCategories.features[categoryIndex].properties[typeVal].solutions;

  let selectedCosts = Array.from(document.querySelectorAll('.cost-filter:checked')).map(el => el.value);
  let selectedTimelines = Array.from(document.querySelectorAll('.timeline-filter:checked')).map(el => el.value);

  var filteredFeatures = features.filter(feature => 
    selectedCosts.includes(feature.costicon) && selectedTimelines.includes(feature.timeline)
  );
  
  filteredFeatures.forEach(function(feature, i) {

    if (feature.lob == 'Enterprise') {
      feature.lob = '';
    } else if (feature.lob == 'Collegiate Hospitality') {
      feature.lob = '<span><img class="lob-icons" src="assets/img/coho.svg"></span>';
    } else if (feature.lob == 'Collegiate Hospitality,Workplace Experience') {
      feature.lob = '<span><img class="lob-icons" src="assets/img/coho.svg"><img class="lob-icons" src="assets/img/wxg.svg"></span>';
    } else if (feature.lob == 'Healthcare+,Collegiate Hospitality,Workplace Experience') {
      feature.lob = '<span><img class="lob-icons" src="assets/img/coho.svg"><img class="lob-icons" src="assets/img/wxg.svg"><img class="lob-icons" src="assets/img/healthcare.svg"></span>';
    } 

    if (feature.name == 'Low carbon: Coolfood meals') {
      var learnMore = `<h6 style="font-size: 13px;" class="card-title mt-2"><a href="javascript:void(0)" data-bs-toggle="modal" data-bs-target="#solutionsCard">Learn More</a></h6>`
    }
    optionCards.innerHTML +=
    `<div class="col mb-4">
      <div class="card h-100 card-bg p-2 d-flex flex-column">
        <div class="card-body">
          <h6 class="card-title">${feature.name}</h6>
          <p class="mt-3 text-trim one-${i} card-text">${feature.description}</p>
          ${learnMore}
        </div>
        <div class="card-footer bg-transparent border-0 d-flex flex-row-reverse align-items-center justify-content-between">
        <button onclick="addActive('${feature.name}', '${feature.id}'); return addRow('${subCategories.features[categoryIndex].category}', '${feature.name}', '${feature.progression}', '${feature.costicon}', '${feature.timeline}','${feature.id}', '${feature.commitment}')" class="btn btn-light btn-sm rounded-pill px-3" type="button" data-bs-toggle="button" aria-pressed="true" id="active-check-${feature.id}">Select</button>
          ${feature.lob}
        </div>
      </div>
    </div>`;
 
    if (feature.active === ' active') {
      var activeLook = document.getElementById('active-check-' + feature.id);
      activeLook.className += ' active';
      activeLook.innerHTML = '&#10003;';
    } 
  }); 

  // When a user checks or unchecks a box, the showSolutions function is called again with the updated filters
  document.querySelectorAll('.cost-filter, .timeline-filter').forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      showSolutions(categoryIndex, typeVal);
    });
  });

  /* Add elipsis for trimmed text, i.e.: "Read More" */
  for (let i = 0; i < features.length; i++) {
    $(function () {
      function trimText(selector, limit) {    
        var text = selector.text(),
          trim;

        selector.each(function() {
          if ($(this).text().length > limit) {
            trim = $(this).text().substr(0, limit);
            $(this).text(trim);
            $(this).append('<span class="expand">[...]</span>');
          };
        });
    
        $(selector).on("click",".expand", function() { //future element
          $(this).parent().text(text).append('<span class="collapse">Less</span>');
        });
    
        $(selector).on("click", ".collapse",function() { //future element
          $(this).parent().text(trim).append('<span class="expand">[...]</span>');
        });
      };
      trimText($(".one-" + i),   60);
    });
  }
}

function addActive(name, index) {
  var activeCheck = document.getElementById('active-check-' + index);
  var features = subCategories.features[categoryIndex].properties[typeVal].solutions;
  features.forEach(function(feature) {
    if (feature.name === name) {
      if (feature.active === false || feature.active === '') {
        feature.active = " active";
        activeCheck.innerHTML = '&#10003;';
        activeCheck.className += feature.active;
      } else if (feature.active === " active") {
        feature.active = false;
        activeCheck.innerHTML = 'Select';
        activeCheck.className = activeCheck.className.replace(' active', '');
      }
    } 
  });
}


function checkDataSet() {
  if (dataSet.length > 0) {
    for(var i = 0; i < dataSet.length; i++) {
      addActive(dataSet[i].subcategory, dataSet[i].id);
    }
  }
}