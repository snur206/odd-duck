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

  console.log('image clicked >', productClicked);

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

function Product(name, fileExtension = 'png') {
  this.name = name;
  this.imagePath = `img/${name}.${fileExtension}`;
  this.clicks = 0;
  this.views = 0;
}

// #pragma Executable

let bag = new Product('bag');
let banana = new Product('banana');
let bathroom = new Product('bathroom');
let boots = new Product('boots');
let breakfast = new Product('breakfast');
let bubblegum = new Product('bubblegum');
let chair = new Product('chair');
let cthulhu = new Product('cthulhu');
let dog = new Product('dog-duck');
let dragon = new Product('dragon');
let pen = new Product('pen');
let pet = new Product('pet-sweep');
let scissors = new Product('scissors');
let shark = new Product('shark');
let sweep = new Product('pet-sweep', 'png');
let tauntaun = new Product('tauntaun');
let unicorn = new Product('unicorn');
let water = new Product('water');
let wine = new Product('wine-glass');

productArray.push(bag, banana, bathroom, boots, breakfast, bubblegum, chair, cthulhu, dog, dragon, pen, pet, scissors, shark, sweep, tauntaun, unicorn, water, wine);

renderImages();

imageContainer.addEventListener('click', handleImageClick);
resultsBtn.addEventListener('click', handleShowResults);
