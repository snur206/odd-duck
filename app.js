'use strict';

// console.log('Hello!');

// #pragma Globals

let voteCount = 25;
let productArray = [];

// #pragma DOM References

let imageContainer = document.getElementById('img-container');
let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three');

let resultsBtn = document.getElementById('show-results-btn');
let resultsContainer = document.getElementById('results-container');

// HELPER/UTILITY FUNCTIONS

function randomProduct() {
  return Math.floor(Math.random() * productArray.length);
}

function renderImages() {
  let imgOneRandom = randomProduct();
  let imgTwoRandom = randomProduct();
  let imgThreeRandom = randomProduct();


  while (imgOneRandom === imgTwoRandom) {
    imgTwoRandom = randomProduct();
  }
  while (imgTwoRandom === imgThreeRandom) {
    imgThreeRandom = randomProduct();
  }
  while (imgThreeRandom === imgOneRandom){
    imgOneRandom = randomProduct();
  }

  imgOne.src = productArray[imgOneRandom].imagePath;
  imgTwo.src = productArray[imgTwoRandom].imagePath;
  imgThree.src = productArray[imgThreeRandom].imagePath;

  imgOne.alt = productArray[imgOneRandom].name;
  imgTwo.alt = productArray[imgTwoRandom].name;
  imgThree.alt = productArray[imgThreeRandom].name;

  productArray[imgOneRandom].views++;
  productArray[imgTwoRandom].views++;
  productArray[imgThreeRandom].views++;
}

// #pragma Event Handler

function handleShowResults() {
  if (voteCount === 0) {
    for (let i = 0; i < productArray.length; i++) {
      let liElem = document.createElement('li');
      liElem.textContent = `${productArray[i].name} was viewed: ${productArray[i].views} time(s) and clicked: ${productArray[i].clicks}`;
      resultsContainer.appendChild(liElem);
    }
    resultsBtn.removeEventListener('click', handleShowResults);
  }
}

function handleImageClick(event) {
  let productClicked = event.target.alt;

  console.log('image clicked ->', productClicked);

  for (let i = 0; i < productArray.length; i++) {
    if (productArray[i].name === productClicked) {
      productArray[i].clicks++;
    }
  }
  voteCount--;
  renderImages();

  if (voteCount === 0) {
    imageContainer.removeEventListener('click', handleImageClick);
  }
}

// #pragma Constructors

function Products(name, fileExtension = 'jpeg') {
  this.name = name;
  this.imagePath = `img/${name}.${fileExtension}`;
  this.clicks = 0;
  this.views = 0;
}

// #pragma Executable

let bag = new Products('bag');
let banana = new Products('banana');
let bathroom = new Products('bathroom');
let boots = new Products('boots');
let breakfast = new Products('breakfast');
let bubblegum = new Products('bubblegum');
let chair = new Products('chair');
let cthulhu = new Products('cthulhu');
let dog = new Products('dog-duck');
let dragon = new Products('dragon');
let pen = new Products('pen');
let pet = new Products('pet-sweep');
let scissors = new Products('scissors');
let shark = new Products('shark');
let sweep = new Products('sweep', 'png');
let tauntaun = new Products('tauntaun');
let unicorn = new Products('unicorn');
let water = new Products('water-can');
let wine = new Products('wine-glass');

productArray.push(bag, banana, bathroom, boots, breakfast, bubblegum, chair, cthulhu, dog, dragon, pen, pet, scissors, shark, sweep, tauntaun, unicorn, water, wine);

renderImages();

imageContainer.addEventListener('click', handleImageClick);
resultsBtn.addEventListener('click', handleShowResults);
