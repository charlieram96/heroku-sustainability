let subCategories = null;
let typeVal = 0
let categoryIndex = 0
fetch('/src/data/data.json')
.then(response => response.json())
.then(data => {
  subCategories = data;
  createSubCategories(categoryIndex);
  showSolutions(categoryIndex, typeVal);
  showCategoryDescription(categoryIndex);
});

//on click of category button, change active class and show subcategories
function createSubCategories(categoryIndex) {
  let subCategoryButtons = document.getElementById('subCategoryButtons');
  subCategoryButtons.innerHTML = '';
  let subCategory = subCategories.features[categoryIndex].properties
  subCategory.forEach(function(subCategory) {
    subCategoryButtons.innerHTML += '<button class="sub-category btn btn-light rounded-pill px-3" type="button" onclick="subPos(this)">' + subCategory.subCategory + '</button>'
  });
  let subCategoryClass = document.getElementsByClassName('sub-category');
  let subCategoryVal = subCategoryClass[0]
  subCategoryVal.className += ' active';
}

function catPos(el) {
  var optionCards = document.getElementById('optionCards');
  optionCards.innerHTML = '';
  let currCat = document.getElementsByClassName('act-cat');
  currCat[0].className = currCat[0].className.replace(' act-cat', '');
  el.className += ' act-cat';
  let i = Array.from(el.parentNode.children).indexOf(el)
  categoryIndex = i
  createSubCategories(categoryIndex);
  showSolutions(categoryIndex, typeVal);
  showCategoryDescription(categoryIndex);
}

function subPos(el) {
  let current = document.getElementsByClassName('active');
  current[0].className = current[0].className.replace(' active', '');
  el.className += ' active';
  let i = Array.from(el.parentNode.children).indexOf(el)
  typeVal = i
  showSolutions(categoryIndex, typeVal);
}

function showSolutions(categoryIndex, typeVal) {
  var optionCards = document.getElementById('optionCards');
  optionCards.innerHTML = '';
  var features = subCategories.features[categoryIndex].properties[typeVal].solutions;
  features.forEach(function(feature) {
    optionCards.innerHTML +=
    '<div class="col mb-4">' +
    '<div class="card h-100 card-bg p-3 d-flex flex-column">' +
    '<div class="card-header border-bottom-0 py-0">' +
    feature.lob +
    '</div>' +
    '<div class="card-body">' +
    '<h5 class="card-title text-light">' +
    feature.name +
    '</h5>' +
    '<p class="card-text text-light"><small>' +
    feature.description +
    '</small></p></div>' +
    '<div class="card-footer>' +
    '<div class="px-2">' +
    '<button class="btn btn-light btn-sm rounded-pill mx-3 px-3" type="button">Learn More</button>' +
    '<button onclick="return addRow(\'' + feature.category + '\',\'' + feature.name +'\')" class="btn btn-light btn-sm rounded-pill px-3" type="button" data-bs-toggle="button" aria-pressed="true">Select</button>' +
    '</div></div></div></div>'
  });  
}

function  showCategoryDescription(categoryIndex) {
  var categoryDescription = document.getElementById('categoryDescription');
  categoryDescription.innerHTML = '';
  var feature = subCategories.features[categoryIndex];
  console.log(feature.category);
  categoryDescription.innerHTML += 
  '<h1 class="display-5 text-light fw-bold">' + feature.category + '</h1>' +
  '<hr class="text-bg-dark w-50 p-0">' +
  '<h6 class="text-light">Reduce Single-Use Plastics.</h6>' +
  '<p class="col-md-8 text-light fs-6">' + feature.description + '</p>'
}