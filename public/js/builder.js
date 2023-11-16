let subCategories = null;
let typeVal = 0
let categoryIndex = 0
fetch('/src/data/final-data.json')
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
  var category = subCategories.features[categoryIndex].category;
  let i = -1;
  features.forEach(function(feature) {
    i++;
    optionCards.innerHTML +=
    '<div class="col mb-4">' +
      '<div class="card h-100 card-bg p-3 d-flex flex-column">' +
        '<div class="card-body">' +
          '<h6 class="card-title">' +
            feature.name +
          '</h6>' +
          '<div class="contain">' +
            '<div class="big-block">' + 
              '<p class="card-text"><small>' + feature.description + '</small></p>' +
            '</div><a href="javascript:void(0)" id="expand-'+i+'">[...]</a>' +
          '</div>' +
          '<h6 class="text-light pt-3" style="font-size: 12px">Learn more</h6>' +
        '</div>' +
    '<div class="card-footer border-0 d-flex justify-content-end">' +
    '<div class="px-2">' +
    '<button onclick="return addRow(\'' + category + '\',\'' + feature.name +'\')" class="btn btn-light btn-sm rounded-pill px-3 " type="button" data-bs-toggle="button" aria-pressed="true">Select</button>' +
    '</div></div></div></div>'
  }); 

  for (let i = 0; i < features.length; i++) {
    $('.big-block').after('');

  $('#expand-' + i).click(function(){
    $(this).prev('.big-block').toggleClass('expanded');
   $(this).text($(this).text() == '[...]' ? 'less' : '[...]');
  
   }); 
  }
  
}

function  showCategoryDescription(categoryIndex) {
  var categoryDescription = document.getElementById('categoryDescription');
  categoryDescription.innerHTML = '';
  var feature = subCategories.features[categoryIndex];
  console.log(feature.category);
  categoryDescription.innerHTML += 
  '<h1 class="display-5 text-light fw-bold">' + feature.category + '</h1>' +
  '<hr class="text-bg-dark w-50 p-0">' +
  '<h6 class="text-light">' + feature.subheader + '</h6>' +
  '<p class="col-md-8 text-light fs-6">' + feature.description + '</p>'
}