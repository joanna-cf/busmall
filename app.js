'use strict';

/*
PLANNING

Store images
  Constructor function
  Array of image objects

Listen for event ('click')
  Less than 25 clicks/selections
  Randomly generate 3 images
    Random number generator?
    Not repeat earlier images/currently displayed images
    Display new images
  Increment amount of clicks
    Store index of last image
 
*/

//--------- Global variables --------
var clicks = 0;
var allProducts = [];
var numberOfProducts = 3;
var productsOnPage = [];
var productsToDisplay = [];
var imageBoxes = [];
var imgIndex;
var currentImg;

// DOM References (looks like html)
var imageDisplay = document.getElementById('display-images');
var leftBox = document.getElementById('left-image');
var centerBox = document.getElementById('center-image');
var rightBox = document.getElementById('right-image');
var productList = document.getElementById('product-list');

imageBoxes.push(leftBox, centerBox, rightBox);

//--------- Constructor function --------
var Product = function(name, filePath, description){
  this.name = name;
  this.filePath = filePath;
  this.timesShown = 0;
  this.timesClicked = 0;
  this.description = description;
  allProducts.push(this);
};

//-------- Functions ---------

// Random number function
function generateRandomIndex(){
  imgIndex = Math.floor(Math.random() * allProducts.length);
}

// Generates new image set, prevents doubles from previous images and current selected images
function generateNewImages(){
  productsToDisplay = [];
  generateRandomIndex();
  for (var i = 0; i < numberOfProducts; i++){
    // generateRandomIndex();
    while (productsOnPage.includes(allProducts[imgIndex]) || productsToDisplay.includes(allProducts[imgIndex])){
      generateRandomIndex();
    }
    currentImg = allProducts[imgIndex];
    productsToDisplay.push(currentImg);
    // console.log(productsToDisplay);
  }
}

// Render image
function renderImages(){
  // debugger;
  generateNewImages();
  productsOnPage = [];
  for (var j = 0; j < numberOfProducts; j++){
    imageBoxes[j].src = productsToDisplay[j].filePath;
    imageBoxes[j].name = productsToDisplay[j].name;
    productsToDisplay[j].timesShown++;
    productsOnPage.push(productsToDisplay[j]);
  }
}

// Stores all products to local storage
function storeProducts(){
  var stringProductsArray = JSON.stringify(allProducts);
  localStorage.setItem('stringProductsArray', stringProductsArray);
  console.log('Products stored in local storage');
}

//--------- Add list to page ----------

function renderList (){
  for (var m in allProducts){
    var listItem = document.createElement('li');
    listItem.textContent = allProducts[m].timesClicked + ' votes for ' + allProducts[m].description;
    productList.appendChild(listItem);
  }
}

// //--------- Instantiate new objects --------
// new Product('bag', 'img/bag.jpg', 'R2D2 bag');
// new Product('banana', 'img/banana.jpg', 'Banana slicer');
// new Product('bathroom', 'img/bathroom.jpg', 'Bathroom iPad stand');
// new Product('boots', 'img/boots.jpg', 'Open-toed boots');
// new Product('breakfast', 'img/breakfast.jpg', 'Breakfast maker');
// new Product('bubblegum', 'img/bubblegum.jpg', 'Meatball bubblegum');
// new Product('chair', 'img/chair.jpg', 'Red elevated chair');
// new Product('cthulhu', 'img/cthulhu.jpg', 'Cthulhu figure');
// new Product('dog-duck', 'img/dog-duck.jpg', 'Duck beak for dogs');
// new Product('dragon', 'img/dragon.jpg', 'Dragon Meat');
// new Product('pen', 'img/pen.jpg', 'Pen utensils');
// new Product('pet-sweep', 'img/pet-sweep.jpg', 'Sweeper feet for pets');
// new Product('scissors', 'img/scissors.jpg', 'Pizza scissors');
// new Product('shark', 'img/shark.jpg', 'Shark sleeping bag');
// new Product('sweep', 'img/sweep.jpg', 'Sweeper suit for babies');
// new Product('tauntaun', 'img/tauntaun.jpg', 'Tauntaun sleeping bag');
// new Product('unicorn', 'img/unicorn.jpg', 'Unicorn meat');
// new Product('usb', 'img/usb.gif', 'USB tentacle');
// new Product('water-can', 'img/water-can.jpg', 'Surreal watering can');
// new Product('wine-glass', 'img/wine-glass.jpg', 'Unusual wine glass');

//------- Adding a chart ---------
//TODO: add bars to chart with total times displayed, and also percentage time clicked when displayed (two more bars? Bar and line? pie chart of most popular product?)

function makeChart(){
  var productNamesArray = [];
  var productVotesArray = [];

  for(var i = 0; i < allProducts.length; i++){
    productNamesArray.push(allProducts[i].description);
    productVotesArray.push(allProducts[i].timesClicked);
    //TODO: all percentage or proportion here
  }

  //Note that busmallChart is now a variable that you could change each time
  var ctx = document.getElementById('busmallChart').getContext('2d');
  var busmallChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: productNamesArray,
      datasets: [{
        label: '# of Votes',
        data: productVotesArray,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }]
    },
    options: {
      title: {
        display: true,
        text: 'Votes per product'
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            precision: 0
          }
        }]
      }
    }
  });
}

//--------- Event Handler --------

function handleClick(event){
  if(event.target.tagName !== 'IMG'){
    return;
  }

  clicks++;

  for (var k = 0; k < allProducts.length; k++){
    if (event.target.name === allProducts[k].name){
      allProducts[k].timesClicked++;
      break;
    }
  }

  if (clicks > 4){
    imageDisplay.removeEventListener('click', handleClick);
    renderList();
    makeChart();
    storeProducts();
  }
  renderImages();
}

imageDisplay.addEventListener('click', handleClick);

//Give your BusMall app some persistence by using local storage to store your voting data! The goal is to have all of your click data persist through a page refresh or through completely closing the browser.

// debugger;
if(localStorage.getItem('stringProductsArray') === null){
  new Product('bag', 'img/bag.jpg', 'R2D2 bag');
  new Product('banana', 'img/banana.jpg', 'Banana slicer');
  new Product('bathroom', 'img/bathroom.jpg', 'Bathroom iPad stand');
  new Product('boots', 'img/boots.jpg', 'Open-toed boots');
  new Product('breakfast', 'img/breakfast.jpg', 'Breakfast maker');
  new Product('bubblegum', 'img/bubblegum.jpg', 'Meatball bubblegum');
  new Product('chair', 'img/chair.jpg', 'Red elevated chair');
  new Product('cthulhu', 'img/cthulhu.jpg', 'Cthulhu figure');
  new Product('dog-duck', 'img/dog-duck.jpg', 'Duck beak for dogs');
  new Product('dragon', 'img/dragon.jpg', 'Dragon Meat');
  new Product('pen', 'img/pen.jpg', 'Pen utensils');
  new Product('pet-sweep', 'img/pet-sweep.jpg', 'Sweeper feet for pets');
  new Product('scissors', 'img/scissors.jpg', 'Pizza scissors');
  new Product('shark', 'img/shark.jpg', 'Shark sleeping bag');
  new Product('sweep', 'img/sweep.jpg', 'Sweeper suit for babies');
  new Product('tauntaun', 'img/tauntaun.jpg', 'Tauntaun sleeping bag');
  new Product('unicorn', 'img/unicorn.jpg', 'Unicorn meat');
  new Product('usb', 'img/usb.gif', 'USB tentacle');
  new Product('water-can', 'img/water-can.jpg', 'Surreal watering can');
  new Product('wine-glass', 'img/wine-glass.jpg', 'Unusual wine glass');
  console.log('Images instantiated');
  renderImages();
  console.log('First set of images added to page');
} else {
  var stringProductsArray = localStorage.getItem('stringProductsArray');
  allProducts = JSON.parse(stringProductsArray);
  console.log('Images retrieved from local storage');
  renderImages();
  console.log('Images from local storage added to page');
}

//First thing to run to put images on screen
// renderImages();
