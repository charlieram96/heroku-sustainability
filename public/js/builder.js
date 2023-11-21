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
})
.catch((error) => {
  console.error('Error fetching final-data.json:', error);
});

//on click of category button, change active class and show subcategories
function createSubCategories(categoryIndex) {
  let subCategoryButtons = document.getElementById('subCategoryButtons');
  subCategoryButtons.innerHTML = '';
  let subCategory = subCategories.features[categoryIndex].properties
  subCategory.forEach(function(subCategory) {
    subCategoryButtons.innerHTML += '<button class="text-nowrap sub-category btn btn-light rounded-pill px-3" type="button" onclick="subPos(this)">' + subCategory.subCategory + '</button>'
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
  let i = 0;

  features.forEach(function(feature) {

    if (feature.lob == 'Enterprise') {
      feature.lob = '';
    } else if (feature.lob == 'Collegiate Hospitality') {
      feature.lob = '<span class="ps-3"><img style="width: 25px; height: 25px;" src="assets/img/coho.svg"></span>';
    } else if (feature.lob == 'Collegiate Hospitality,Workplace Experience') {
      feature.lob = '<span class="ps-3"><img style="width: 25px; height: 25px;" src="assets/img/coho.svg"><img style="margin-left: 15px; width: 25px; height: 25px;" src="assets/img/wxg.svg"></span>';
    } else if (feature.lob == 'Healthcare+,Collegiate Hospitality,Workplace Experience') {
      feature.lob = '<span class="ps-3"><img style="width: 25px; height: 25px;" src="assets/img/coho.svg"><img style="margin-left: 15px; width: 25px; height: 25px;" src="assets/img/wxg.svg"><img style="margin-left: 15px; width: 25px; height: 25px;" src="assets/img/healthcare.svg"></span>';
    } 

    
    optionCards.innerHTML +=
    '<div class="col mb-4">' +
      '<div class="card h-100 card-bg p-2 d-flex flex-column">' +
      '<div class="card-header border-0 bg-transparent py-0 d-flex justify-content-between">' +
        '<div id="timeline-' + i + '">' + feature.timeline + '</div>' +
        '<div id="costIcon-' + i + '">' + feature.costicon + '</div>' + 
      '</div>' +
      '<div class="card-body">' +
        '<h6 class="card-title">' +
          feature.name +
        '</h6>' +
        '<p class="text-trim one-'+ i + ' card-text">' + feature.description + '</p>' +
      '</div>' +
      feature.lob +
      '<div class="card-footer  bg-transparent border-0 d-flex justify-content-between align-content-center">' +

      '<a class="align-self-center" data-bs-toggle="modal" data-bs-target="#solutionsCard" href="javascript:void(0)"><h6 class="mb-0" style="font-size: 12px">Learn more</h6></a>' +
      '<button onclick="return addRow(\'' + category + '\',\'' + feature.name +'\',\'' + feature.progression +'\',\'' + feature.costicon +'\',\'' + feature.timeline +'\')" class="btn btn-light btn-sm rounded-pill px-3 " type="button" data-bs-toggle="button" aria-pressed="true">Select</button>' +
    '</div></div></div>'
    i++;
  }); 

  for (let i = 0; i < features.length; i++) {
    var timeline = document.getElementById('timeline-' + i);
    var costIcon = document.getElementById('costIcon-' + i);
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
    if (timeline.innerHTML == 'Quarter') {
      timeline.innerHTML = '<img src="assets/img/timeline.svg" alt="timeline"><span style="font-size: 12px;"> 0-3 months</span>'
    } else if(timeline.innerHTML == 'Half') {
      timeline.innerHTML = '<img src="assets/img/timeline.svg" alt="timeline"><span style="font-size: 12px;"> 4-6 months</span>'
    } else if(timeline.innerHTML == 'Three Quarter') {
      timeline.innerHTML = '<img src="assets/img/timeline.svg" alt="timeline"><span style="font-size: 12px;"> 7-9 months</span>'
    } else if(timeline.innerHTML == 'Full') {
      timeline.innerHTML = '<img src="assets/img/timeline.svg" alt="timeline"><span style="font-size: 12px;"> 10-12+ months</span>'
    } else if(timeline.innerHTML == 'Empty') {
      timeline.innerHTML = '<img src="assets/img/timeline.svg" alt="timeline"><span style="font-size: 12px;"> Immediate</span>'
    } else { timeline.innerHTML = ''; }
    if (costIcon.innerHTML == 'One') {
      costIcon.innerHTML = '<span style="color: #007B8A; font-family: gotham-medium;">$<span style="color: rgba(0, 123, 138, 0.40);">$$$$</span></span>'
    } else if (costIcon.innerHTML == 'Two') {
      costIcon.innerHTML = '<span style="color: #007B8A; font-family: gotham-medium;">$$<span style="color: rgba(0, 123, 138, 0.40);">$$$</span></span>' 
    } else if (costIcon.innerHTML == 'Three') {
      costIcon.innerHTML = '<span style="color: #007B8A; font-family: gotham-medium;">$$$<span style="color: rgba(0, 123, 138, 0.40);">$$</span></span>' 
    } else if (costIcon.innerHTML == 'Four') {
      costIcon.innerHTML = '<span style="color: #007B8A; font-family: gotham-medium;">$$$$<span style="color: rgba(0, 123, 138, 0.40);">$</span></span>' 
    } else if (costIcon.innerHTML == 'Five') {
      costIcon.innerHTML = '<span style="color: #007B8A; font-family: gotham-medium;">$$$$$</span>' 
    } else if (costIcon.innerHTML = 'Empty') {
      costIcon.innerHTML = '';
    } else { costIcon.innerHTML = ''; }
  }
}

function showCategoryDescription(categoryIndex) {
  var categoryDescription = document.getElementById('categoryDescription');
  categoryDescription.innerHTML = '';
  var feature = subCategories.features[categoryIndex];
  categoryDescription.innerHTML += 
  '<h1 class="text-light fw-bold">' + feature.category + '</h1>' +
  '<hr class="text-bg-dark w-50 p-0">' +
  '<h6 class="text-light">' + feature.subheader + '</h6>' +
  '<p class="py-2 text-light fs-6">' + feature.description + '</p>'
}

