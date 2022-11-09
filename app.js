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

// CANVAS DOM REFERENCE (FOR CHART)
let chartContext = document.getElementById('my-chart').getContext('2d');

function handleShowChart() {
  if (voteCount === 0) {// todo remove event listeners from images}
    // CHART OBJECT CREATION
    let productNames = [];
    let productViews = [];
    let productClicks = [];

    for (let i = 0; i < productArray.length; i++) {
      productNames.push(productArray[i].name);
      productViews.push(productArray[i].views);
      productClicks.push(productArray[i].clicks);
    }
    let chartConfig = {
      type: 'bar',
      data: {
        labels: productNames,
        datasets: [{
          label: '# of Views',
          data: productViews,
          backgroundColor: 'yellow',
        }, {
          label: '# of Clicks',
          data: productClicks,
          backgroundColor: 'aqua',
        }],
      },
      options: {},
    };
    let myChart = new Chart(chartContext, chartConfig);
    resultsBtn.removeEventListener('click', handleShowChart);
  }
}

// HELPER/UTILITY FUNCTIONS

function randomProduct() {
  return Math.floor(Math.random() * productArray.length);
}

let indexArray = [];
let previousArray = [];

function uniqueImageChecker() {
  while (indexArray.length < 3) {
    let randomImage = randomProduct();
    while (indexArray.includes(randomImage) || previousArray.includes(randomImage)) {
      randomImage = randomProduct();
      console.log(randomImage);
    }
    indexArray.push(randomImage);
    previousArray.push(randomImage);
    console.log(indexArray, previousArray);
    if (previousArray.length >= 6) {
      previousArray.shift();
    }
  }
  return (indexArray);
}


function renderImages() {
  // let threeNewImages = uniqueImageChecker();
  // let imgOneRandom = productArray[threeNewImages[0]];
  // let imgTwoRandom = productArray[threeNewImages[1]];
  // let imgThreeRandom = productArray[threeNewImages[2]];


  // while (imgOneRandom === imgTwoRandom) {
  //   imgTwoRandom = randomProduct();
  // }
  // while (imgTwoRandom === imgThreeRandom) {
  //   imgThreeRandom = randomProduct();
  // }
  // while (imgThreeRandom === imgOneRandom){
  //   imgOneRandom = randomProduct();
  // }

  uniqueImageChecker();
  console.log(indexArray);
  let imgOneIndex = indexArray.shift();
  let imgTwoIndex = indexArray.shift();
  let imgThreeIndex = indexArray.shift();


  imgOne.src = productArray[imgOneIndex].imagePath;
  imgTwo.src = productArray[imgTwoIndex].imagePath;
  imgThree.src = productArray[imgThreeIndex].imagePath;

  imgOne.alt = productArray[imgOneIndex].name;
  imgTwo.alt = productArray[imgTwoIndex].name;
  imgThree.alt = productArray[imgThreeIndex].name;

  productArray[imgOneIndex].views++;
  productArray[imgTwoIndex].views++;
  productArray[imgThreeIndex].views++;

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

      voteCount--;
      renderImages();
    }
  }
  if (voteCount === 0) {
    imageContainer.removeEventListener('click', handleImageClick);

    // LOCAL STORAGE
    // STEP 1: STRINIFY THE DATA
    let stringifiedProducts = JSON.stringify(productArray);

    console.log('stringified products >>>>>>', stringifiedProducts);

    // STEP 2: ADD TO LOCAL STORAGE
    localStorage.setItem('myProducts', stringifiedProducts);
  }
}

// #pragma Constructors

function Products(name, fileExtension = 'jpeg') {
  this.name = name;
  this.imagePath = `img/${name}.${fileExtension}`;
  this.clicks = 0;
  this.views = 0;
}

Products.prototype.myMethod = function () {
  return `hello I'm ${this.name}`;
};

// #pragma Executable

// MORE LOCAL STORAGE CODE
// STEP 3: PULL STAT OUT OF LOCAL STORAGE
let retrievedProducts = localStorage.getItem('myProducts');
console.log('retriecedProducts >>>>>', retrievedProducts);

// STEP 4: PARSE DATA INTO CODE SO APP CAN SEE
let parsedProducts = JSON.parse(retrievedProducts);
console.log('parsedProducts >>>>>>>>', parsedProducts);

if (parsedProducts) {
  productArray = parsedProducts;
} else {
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
}
console.log('productArray after construction >>>', productArray);

renderImages();

imageContainer.addEventListener('click', handleImageClick);
resultsBtn.addEventListener('click', handleShowChart);
resultsBtn.addEventListener('click', handleShowResults);

