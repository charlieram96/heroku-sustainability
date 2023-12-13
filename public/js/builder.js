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
  checkDataSet();
  refreshUI();
})
.catch((error) => {
  console.error('Error fetching final-data.json:', error);
});

/* Create Category Buttons */
const createCategories = () => {
  subCategories.features.forEach(function(feature) {
    let categoryButtons = document.getElementById('categoryButtons');
    categoryButtons.innerHTML += `<button style="font-size: 14px;" onclick="getCategoryPosition(this)" class="category-button rounded-0 py-3 btn btn-primary" type="button">${feature.category}</button>`
  });
  let activeCategory = document.getElementsByClassName('category-button');
  activeCategory[0].className += ' active-category';
}

/* Create Category Description */
const showCategoryDescription = (categoryIndex) => {
  const feature = subCategories.features[categoryIndex];
  var categoryDescription = document.getElementById('categoryDescription');
  categoryDescription.innerHTML = '';
  categoryDescription.innerHTML += `<h6 class="text-light">${feature.subheader}</h6>
  <p class="pt-2 mb-0 text-light fs-6">${feature.description}</p>`
}

/* Change Category Active Class and show Sub Categories */
const createSubCategories = (categoryIndex) => {
  const subCategory = subCategories.features[categoryIndex].properties
  let subCategoryButtons = document.getElementById('subCategoryButtons');
  subCategoryButtons.innerHTML = '';
  subCategory.forEach((subCategory) => {
    subCategoryButtons.innerHTML += 
    `<button class="text-nowrap sub-category btn btn-light rounded-pill px-3" type="button" onclick="getSubcategoryPosition(this)"> ${subCategory.subCategory}</button>`
  });
  let subCategoryClass = document.getElementsByClassName('sub-category');
  let subCategoryPosition = subCategoryClass[0]
  subCategoryPosition.className += ' active';
}

/* Get the position of the current active Category */ 
const getCategoryPosition = (el) => {
  typeVal = 0;
  let optionCards = document.getElementById('optionCards');
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
const getSubcategoryPosition = (el) => {
  let active = document.getElementsByClassName('active');
  active[0].className = active[0].className.replace(' active', '');
  el.className += ' active';
  let i = Array.from(el.parentNode.children).indexOf(el)
  typeVal = i
  showSolutions(categoryIndex, typeVal);
}

/* Show the Solution Cards */
const showSolutions = (categoryIndex, typeVal) => {
  const features = subCategories.features[categoryIndex].properties[typeVal].solutions;
  var optionCards = document.getElementById('optionCards');
  optionCards.innerHTML = '';
  
  let selectedCosts = Array.from(document.querySelectorAll('.cost-filter:checked')).map(el => el.value);
  let selectedTimelines = Array.from(document.querySelectorAll('.timeline-filter:checked')).map(el => el.value);

  const allChecked = document.getElementById('enterpriseChecked').checked;
  const reduceEmissionsChecked = document.getElementById('reduceEmissions').checked;
  const zeroWasteChecked = document.getElementById('zeroWaste').checked;
  
  var filteredFeatures = features.filter(feature => {
    let costAndTimelineMatch = selectedCosts.includes(feature.costicon) && selectedTimelines.includes(feature.timeline);

    let impactMatch = allChecked || 
      (reduceEmissionsChecked && feature.reduceEmissions) || 
      (zeroWasteChecked && feature.zeroWaste);

    return costAndTimelineMatch && impactMatch;
  });

  filteredFeatures.forEach((feature, i) => {

    if (feature.lob == 'Enterprise') {
      feature.lob = '';
    } else if (feature.lob == 'Collegiate Hospitality') {
      feature.lob = '<span><img class="lob-icons" src="assets/img/coho.svg"></span>';
    } else if (feature.lob == 'Collegiate Hospitality,Workplace Experience') {
      feature.lob = '<span><img class="lob-icons" src="assets/img/coho.svg"><img class="lob-icons" src="assets/img/wxg.svg"></span>';
    } else if (feature.lob == 'Healthcare+,Collegiate Hospitality,Workplace Experience') {
      feature.lob = '<span><img class="lob-icons" src="assets/img/coho.svg"><img class="lob-icons" src="assets/img/wxg.svg"><img class="lob-icons" src="assets/img/healthcare.svg"></span>';
    } 
    
    var learnMore = feature.name === 'Low carbon: Coolfood meals' ? `<h6 style="font-size: 13px;" class="card-title mt-2"><a href="javascript:void(0)" data-bs-toggle="modal" data-bs-target="#solutionsCard">Learn More</a></h6>` : '';

    optionCards.innerHTML +=
    `<div class="col mb-4">
      <div class="card h-100 card-bg p-2 d-flex flex-column">
        <div class="card-body">
          <h6 class="card-title">${feature.name}</h6>
          <p class="mt-3 text-trim one-${i} card-text">${feature.description}</p>
          ${learnMore}
        </div>
        <div class="card-footer bg-transparent border-0 d-flex flex-row-reverse align-items-center justify-content-between">
        <button onclick="addActive('${feature.name}', '${feature.id}'); return addRow('${subCategories.features[categoryIndex].category}', '${feature.name}', '${feature.progression}', '${feature.costicon}', '${feature.timeline}','${feature.id}', '${feature.commitment}', '${feature.description}')" class="btn btn-light btn-sm rounded-pill px-3" type="button" aria-pressed="true" id="active-check-${feature.id}">Select</button>
          ${feature.lob}
        </div>
      </div>
    </div>`;

    
    var activeLook = document.getElementById('active-check-' + feature.id);
    for (let i = 0; i < dataSet.length; i++) {
    if ( dataSet[i].subcategory.indexOf(feature.name) !== -1 ) {
      activeLook.className += ' actived';
      activeLook.innerHTML = '&#10003;';
      refreshUI();
    }

  }
  }); 

  /* Add elipsis for trimmed text, i.e.: "Read More" */
  features.forEach((feature, i) => {
    const trimText = (selector, limit) => {
      const text = selector.text();
      let trim;
      selector.each(function() {
        if ($(this).text().length > limit) {
          trim = $(this).text().substr(0, limit);
          $(this).text(trim).append('<span class="expand">[...]</span>');
        }
      });
      $(selector).on("click", ".expand", function() {
        $(this).parent().text(text).append('<span class="collapse">Less</span>');
      });
      $(selector).on("click", ".collapse", function() {
        $(this).parent().text(trim).append('<span class="expand">[...]</span>');
      });
    };
    trimText($(`.one-${i}`), 60);
  });
}

document.querySelectorAll('.cost-filter, .timeline-filter, .impact-filter').forEach(checkbox => {
  checkbox.addEventListener('change', () => {
    showSolutions(categoryIndex, typeVal);
  });
});


let rfpToggleItem;

const handleRfpChange = () => {
  rfpToggleItem = document.getElementById('addDefaults');
  console.log("new rfp value", rfpToggleItem.checked);
  const features = subCategories.features[categoryIndex].properties[typeVal].solutions;
  features.forEach(feature => {
    if (feature.commitment === true) {
      if (rfpToggleItem.checked) {
        feature.active = " actived";
      }
      else {
        feature.active = false;
      }
    }
  });
  refreshUI();
}

var rfpToggleCheck;

try {
  rfpToggleCheck = sessionStorage.getItem('rfpToggleCheck');
  handleRfpChange();
} catch (err) {
  console.log("error", err);
}

rfpToggleItem.addEventListener("change", handleRfpChange);


const addActive = (name, index) => {
  const features = subCategories.features[categoryIndex].properties[typeVal].solutions;
  let activeCheck = document.getElementById('active-check-' + index);

  features.forEach((feature) => {
    if (feature.name === name) {
      if (feature.active === false || feature.active === '') {
        feature.active = " actived";
        activeCheck.innerHTML = '&#10003;';
        activeCheck.className += feature.active;
        if (feature.progression) {
          removeEqualProgressionItems(feature);
        }
        refreshUI();

      } else if (feature.active === " actived") {
        feature.active = false;
        activeCheck.innerHTML = 'Select';
        activeCheck.className = activeCheck.className.replace(' actived', '');
        refreshUI();
      }
    } 
  });
}

const refreshUI = () => {
  const features = subCategories.features[categoryIndex].properties[typeVal].solutions;

  features.forEach(feature => {
    let button = document.getElementById('active-check-' + feature.id);

    if (button) {
      if (feature.active || feature.active === " actived") {
        button.innerHTML = '&#10003;'; 
        button.className = 'btn btn-light btn-sm rounded-pill px-3 actived';
        if (feature.commitment) {
          button.classList.add('button-disabled');
        }
      } else {
        button.innerHTML = 'Select'; 
        button.className = 'btn btn-light btn-sm rounded-pill px-3';
        button.classList.remove('button-disabled');
      }
    }
  });
}

const removeEqualProgressionItems = (keptItem) => {
  const features = subCategories.features[categoryIndex].properties[typeVal].solutions;
  features.forEach(feature => {
    if (feature.progression === keptItem.progression && feature.id !== keptItem.id) {
      feature.active = false;
    }
  });
}

const checkDataSet = () => {
  if (dataSet.length > 0) {
    for(let i = 0; i < dataSet.length; i++) {
      addActive(dataSet[i].subcategory, dataSet[i].id);
    }
  }
}

