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

//Create an object for all the objects we have so can refer
//Array: function to iterate through.

//--------- Global variables --------
var clicks = 0;
var allProducts = [];
var numberOfProducts = 3;
var productsOnPage = [allProducts[0], allProducts[1], allProducts[2]];
var productsToDisplay = [];
var imageBoxes = [];
var imgIndex;
var currentImg;

// DOM References (looks like html)
var productList = document.getElementById('product-list');
var imageDisplay = document.getElementById('display-images');
var leftBox = document.getElementById('left-image');
var centerBox = document.getElementById('center-image');
var rightBox = document.getElementById('right-image');

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
  for (var i = 0; i < 3; i++){
    // generateRandomIndex();
    while (productsOnPage.includes(allProducts[imgIndex]) || productsToDisplay.includes(allProducts[imgIndex])){
      generateRandomIndex();
    }
    currentImg = allProducts[imgIndex];
    productsToDisplay.push(currentImg);
    console.log(productsToDisplay);
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

//--------- Instantiate new objects --------
new Product('bag', 'img/bag.jpg', 'R2D2 bag');
new Product('banana', 'img/banana.jpg', 'Banana slicer');
new Product('bathroom', 'img/bathroom.jpg', 'Bathroom iPad stand');
new Product('boots', 'img/boots.jpg', 'Open-toed boots');
new Product('breakfast', 'img/breakfast.jpg', 'Breakfast maker');
new Product('bubblegum', 'img/bubblegum.jpg', 'Meatball bubblegum');

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
  // debugger;
  if (clicks > 5){
    productList.removeEventListener('click', handleClick);
    // renderList();
  }

  renderImages();
}

imageDisplay.addEventListener('click', handleClick);


//-------- Call Function ---------
// generateRandomIndex();
// generateNewImages();
// renderImages();


//--------- Add list to page ----------

// function renderList (){
//   for (var m in allProducts){
//     var listItem = document.createElement('li');
//     listItem.textContent = allProducts[m].timesClicked + ' votes for ' + allProducts[m].description;
//     productList.appendChild(listItem);
//   }
// }

// // //--------- Event Listener --------


// function handleClick(event){
//   //logs number of clicks
//   clicks++;
//   console.log('clicks no: ' + clicks);
//   console.log(event.target);

//   //Iterates through all Products and adds timesClicked if it matches
//   for (var k = 0; k < allProducts.length; k++){
//     if (event.target.name === allProducts[k].name){
//       allProducts[k].timesClicked++;
//     }
//   }

//   //Set up temporary variables to store newly picked images
//   var tempLeft;
//   var tempCenter;

//   for (var i = 0; i < imgOnPage.length; i++){

//     //Selects next random image
//     var imgIndex = Math.floor(Math.random() * allProducts.length);
//     //Loop to make sure that the new image selected is not the same as previous image
//     // TODO: check against all previous images
//     while (allProducts[imgIndex].name === previousLeftImage.name || allProducts[imgIndex].name === previousCenterImage.name || tempLeft === allProducts[imgIndex] || tempCenter === allProducts[imgIndex]){ //can add more conditions to this while loop so that it doesn't come up with the same image as the other two either
//       console.log(allProducts[imgIndex].name);
//       imgIndex = Math.floor(Math.random() * allProducts.length);
//     }

//     console.log(allProducts[imgIndex].name);
//     currentImg = allProducts[imgIndex];
//     imgOnPage[i].src = currentImg.filePath;
//     imgOnPage[i].name = currentImg.name;

//     //Logs number of times this image appears
//     currentImg.timesShown++;
//     // console.log(leftImageOnThisPage);


//     //TODO: refactor
//     if(i === 0){
//       tempLeft = currentImg;
//     }

//     if(i === 1){
//       tempCenter = currentImg;
//     }

//     if (clicks > 9){
//       imgOnPage[i].removeEventListener('click', handleClick);
//       renderList();
//     }
//   }

//   previousLeftImage = tempLeft;
//   previousCenterImage = tempCenter;
// }

// leftImg.addEventListener('click', handleClick);
// centerImg.addEventListener('click', handleClick);
// // rightImg.addEventListener('click', handleClick);


//After declare products, set up which is on the page
// previousLeftImage = allProducts[0];
// previousCenterImage = allProducts[1];

//---------- CODE DEMO

// var ctx = document.getElementById('myChart').getContext('2d');
// var myChart = new Chart(ctx, {
//   type: 'bar',
//   data: {
//     labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//     datasets: [{
//       label: '# of Votes',
//       data: [12, 19, 3, 5, 2, 3],
//       backgroundColor: [
//         'rgba(255, 99, 132, 0.2)',
//         'rgba(54, 162, 235, 0.2)',
//         'rgba(255, 206, 86, 0.2)',
//         'rgba(75, 192, 192, 0.2)',
//         'rgba(153, 102, 255, 0.2)',
//         'rgba(255, 159, 64, 0.2)'
//       ],
//       borderColor: [
//         'rgba(255, 99, 132, 1)',
//         'rgba(54, 162, 235, 1)',
//         'rgba(255, 206, 86, 1)',
//         'rgba(75, 192, 192, 1)',
//         'rgba(153, 102, 255, 1)',
//         'rgba(255, 159, 64, 1)'
//       ],
//       borderWidth: 1
//     }]
//   },
//   options: {
//     scales: {
//       yAxes: [{
//         ticks: {
//           beginAtZero: true
//         }
//       }]
//     }
//   }
// });




//CODE I DID THAT WORKED BUT WAS TOO COMPLICATED SO I NEED TO WORK ON OTHER THINGS FIRST

// var leftImg = document.getElementById('img-left');
// var centerImg = document.getElementById('img-center');
// var rightImg = document.getElementById('img-right');

// var imgOnPage = [leftImg, centerImg, rightImg];
// var currentImg;
// // var productSelected = [];

// function handleClick (event){
//   clicks++;
//   // currentImg.timesClicked++;
//   console.log('user has had ' + clicks + ' clicks.');
//   // console.log(currentImg);
//   // console.log('left image clicked');

//   for (var i = 0; i < imgOnPage.length; i++){
//     var imgIndex = Math.floor(Math.random() * allProducts.length);
//     currentImg = allProducts[imgIndex];
//     imgOnPage[i].src = currentImg.filePath;
//     currentImg.timesShown++;
//     console.log(currentImg);

//     if (clicks > 24){
//       imgOnPage[i].removeEventListener('click', handleClick);
//     }
//   }

//   // //selects random images
//   // var imgIndex = Math.floor(Math.random() * allProducts.length);
//   // var centerImgIndex = Math.floor(Math.random() * allProducts.length);
//   // var rightImgIndex = Math.floor(Math.random() * allProducts.length);

//   // //changes left image to new display image
//   // leftImageOnThisPage = allProducts[leftImgIndex];
//   // centerImageOnThisPage = allProducts[centerImgIndex];
//   // rightImageOnThisPage = allProducts[rightImgIndex];

//   // leftImg.src = leftImageOnThisPage.filePath;
//   // centerImg.src = centerImageOnThisPage.filePath;
//   // rightImg.src = rightImageOnThisPage.filePath;

//   // if (clicks > 24){
//   //   leftImg.removeEventListener('click', handleClick);
//   //   leftImg.removeEventListener('click', handleClick);
//   //   leftImg.removeEventListener('click', handleClick);
//   // }
// }
