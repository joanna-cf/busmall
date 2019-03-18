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
var leftImageOnThisPage;

//--------- Constructor function --------
var Product = function(name, filePath, description){
  this.name = name;
  this.filePath = filePath;
  this.timesShown = 0;
  this.timesClicked = 0;
  this.description = description;
  allProducts.push(this);
};

//--------- Event Listener --------

var leftImg = document.getElementById('img-left');

function handleClickOnLeftImg (event){
  clicks++;
  console.log('left image clicked');

  //selects random images
  var leftImgIndex = Math.floor(Math.random() * allProducts.length);

  //changes left image to new display image
  leftImageOnThisPage = allProducts[leftImgIndex];

  leftImg.src = leftImageOnThisPage.filePath;

  if (clicks > 24){
    leftImg.removeEventListener('click', handleClickOnLeftImg);
  }
}

leftImg.addEventListener('click', handleClickOnLeftImg);


//--------- Instantiate new objects --------
new Product('bag', 'img/bag.jpg', 'R2D2 bag');
new Product('banana', 'img/banana.jpg', 'Banana slicer');
new Product('bathroom', 'img/bathroom.jpg', 'Bathroom iPad stand');
new Product('boots', 'img/boots.jpg', 'Open-toed boots');

console.log(allProducts);
