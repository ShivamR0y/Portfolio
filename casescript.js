document.addEventListener("DOMContentLoaded", function () {

    // Variables for the array grid
    const grid = document.getElementById("circleGrid");
    const numColumns = 90;
    const numRows = 8;
    const totalCircles = numColumns * numRows;
    const circles = [];
  
  
    //Variables for the snake game
    const gameArea = document.getElementById("gameArea");
  
    let trail = [];
    let trailLength = 1;
  
    // Create a square to replace the mouse pointer
    const pointerSquare = document.createElement("div");
    pointerSquare.classList.add("square");
    gameArea.appendChild(pointerSquare);
    
  
    // Random colors for the random squares
    const randomColors = ['#FFC700', '#2AB1E4', '#EF1A9E'];
  
  
  
    // Function to generate random squares
    /*
    I have edited the timeout here so that no new squares appear on the case study pages. ^^
    */ 

    function generateRandomSquare() {
      const randomSquare = document.createElement("div");
      randomSquare.classList.add("square", "random-square");
      randomSquare.style.top = `${Math.random() * document.documentElement.scrollHeight}px`;
      randomSquare.style.left = `${Math.random() * document.documentElement.scrollWidth}px`;
      randomSquare.style.backgroundColor = randomColors[Math.floor(Math.random() * randomColors.length)];
      
      gameArea.appendChild(randomSquare);
  
      // Remove random square after 10 seconds
      setTimeout(() => {
        if (randomSquare.parentNode) {
          randomSquare.parentNode.removeChild(randomSquare);
        }
      }, 1);
      // ^^ changed timeout from 8000 to 1 for the first square

      // Add event listener to pop the square and grow the trail
      randomSquare.addEventListener("mouseover", () => {
        const color = randomSquare.style.backgroundColor;
        randomSquare.remove();
        trailLength++;
        addTrailSquare(color);
      });
  
      // Schedule the next square generation at a random interval
      //setTimeout(generateRandomSquare, getRandomInterval());
      // ^^ commented out calling of new squares
    }

  
  
      // Function to generate the initial trail
      //this is added on please check and remove if required
      function initializeTrail() {
        for (let i = 0; i < 3; i++) {
          const trailSquare = document.createElement("div");
          trailSquare.classList.add("square", "trail");
          trailSquare.style.backgroundColor = randomColors[Math.floor(Math.random() * randomColors.length)];
          
          // Add the trail square to the trail array and document
          gameArea.appendChild(trailSquare);
          trail.push(trailSquare);
        }
      }
  
  
    // Function to add a square to the trail
    function addTrailSquare(color) {
      const trailSquare = document.createElement("div");
      trailSquare.classList.add("square", "trail");
      trailSquare.style.backgroundColor = color;
      gameArea.appendChild(trailSquare);
      trail.push(trailSquare);
    }
  
    // Function to handle mouse movement and control the trail
    function onMouseMove(e) {
      // Update pointer position, centering the real cursor in the middle, sa well as considering the entire page width and height
      pointerSquare.style.top = `${e.clientY - 14 / 2}px`;  //this is the width of the pointer square
      pointerSquare.style.left = `${e.clientX - 14 / 2}px`;
      
      // Update trail position with more spacing
      trail.forEach((square, index) => {
        const delay = (index + 1) * 35; // Increased spacing between trail squares
        setTimeout(() => {
          square.style.top = `${e.clientY - 5}px`;
          square.style.left = `${e.clientX - 5}px`;  //This is the half size of the trail square
        }, delay);
      });
    }
  
    // Function to get a random interval
    function getRandomInterval() {
        return Math.random() * (8000 - 1500) + 1500;
    }
  
    // Generate the first square and set the random interval
    initializeTrail();
    setTimeout(generateRandomSquare, 1000);
    
  
    // Event listener for mouse movement
    window.addEventListener("mousemove", onMouseMove);
    




 // Create the grid of circles
 for (let i = 0; i < totalCircles; i++) {
    const circle = document.createElement("div");
    circle.classList.add("circle");
    grid.appendChild(circle);
    circles.push(circle);
}

// Coordinates for the letters "HI THERE"
const letters = [
  [94,95,96,97,98,184,274,364,454,544,545,546,547,548],  // C
  [101,102,103,104,105,191,195,281,285,371,375,461,465,551,552,553,554,555],  //O
  [108,112,198,199,202,288,289,290,292,378,380,381,382,468,471,472,558,562], // N
  [115,116,117,118,119,207,297,387,477,567], // T
  [122,123,124,125,126,212,216,302,306,392,393,394,395,396,482,486,572,576],  //A
  [129,130,131,132,133,219,309,399,489,579,580,581,582,583],  //C
  [136,137,138,139,140,228,318,408,498,588],  //T
  [145,149,235,236,238,239,325,327,329,415,419,505,509,595,599], //M
  [152,153,154,155,156,242,332,422,423,424,512,602,603,604,605,606],  //E
  [159,249,339,429,609],  //!
  [166, 167, 168, 169, 170, 171, 172, 173, 174, 175, 256, 257, 258, 263, 264, 265, 346, 348, 349, 352, 353, 355, 436, 439, 440, 441, 442, 445, 526, 535, 616, 617, 618, 619, 620, 621, 622, 623, 624, 625],  // sign
];

function turnOnCircles() {
    letters.forEach((letter, index) => {
        setTimeout(() => {
            letter.forEach(position => {
                circles[position].classList.add("on");
            });
        }, index * 8); // Layered "turn on" effect
    });
}

function turnOffCircles() {
    circles.forEach(circle => circle.classList.remove("on"));
}

// Hover effects
grid.addEventListener("mouseenter", () => {
    turnOffCircles(); // Start by turning off any random on circles
    turnOnCircles();  // Gradually turn on circles that form "HI THERE"
});

grid.addEventListener("mouseleave", () => {
    turnOffCircles();
    randomOnCircles(); // Start random lighting after leaving
});

// Function to randomly turn on a few circles at random intervals
function randomOnCircles() {
    setInterval(() => {
        const randomCircles = getRandomCircles(1, 5);
        randomCircles.forEach(circle => {
            circle.classList.add("random-on");
            setTimeout(() => {
                circle.classList.remove("random-on");
            }, 2000); // Stay on for 1 second
        });
    }, 8000); // New set of random circles every 2 seconds
}

// Get a random selection of circles
function getRandomCircles(min, max) {
    const count = Math.floor(Math.random() * (max - min + 1)) + min;
    const selected = [];
    while (selected.length < count) {
        const randomIndex = Math.floor(Math.random() * totalCircles);
        if (!selected.includes(circles[randomIndex])) {
            selected.push(circles[randomIndex]);
        }
    }
    return selected;
}

randomOnCircles(); // Start random lights on page load



 
});  




// JavaScript to handle navbar visibility on scroll of floating navbar
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('floating-svgs');
    const scrollPosition = window.scrollY || window.pageYOffset;
    const viewportHeight = window.innerHeight/1.5;
  
    if (scrollPosition > viewportHeight) {
      navbar.classList.add('visible');
    } else {
      navbar.classList.remove('visible');
    }
  });
  
// JavaScript to handle sticking of right navbar
  document.addEventListener('scroll', function () {
    const fixedDiv = document.querySelector('.floating_nav');
    const parent = document.querySelector('.all_content');
    const parentRect = parent.getBoundingClientRect();

    if (parentRect.top < 0) {
        fixedDiv.classList.add('sticky');
    } else {
        fixedDiv.classList.remove('sticky');
    }});




    // Get all sections that have an ID defined
const sections = document.querySelectorAll("section[id]");

// Add an event listener listening for scroll
window.addEventListener("scroll", navHighlighter);

function navHighlighter() {
  
  // Get current scroll position
  let scrollY =  window.pageYOffset;
  
  // Now we loop through sections to get height, top and ID values for each
  sections.forEach(current => {
    const sectionHeight = current.offsetHeight+100;
    const sectionTop = current.offsetTop+200;
    sectionId = current.getAttribute("id");
    
    /*
    - If our current scroll position enters the space where current section on screen is, add .active class to corresponding navigation link, else remove it
    - To know which link needs an active class, we use sectionId variable we are getting while looping through sections as an selector
    */
    if (
      scrollY > sectionTop &&
      scrollY <= sectionTop + sectionHeight
    ){
      document.querySelector(".floating_nav a[href*=" + sectionId + "]").classList.add("active_nav");
    }
    else {
      document.querySelector(".floating_nav a[href*=" + sectionId + "]").classList.remove("active_nav");
    }
  })};






   /*
    Carousel 
    */

  let currentIndex = 0;
const items = document.querySelectorAll('.carousel-item');
const totalItems = items.length;

const carousel = document.querySelector('.carousel');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// Clone the first item and append it at the end to create the loop effect
const firstItem = items[0].cloneNode(true);
carousel.appendChild(firstItem);

// Function to move to the next item
function moveToNext() {
    // Check if we are at the last item (which is a duplicate of the first)
    if (currentIndex === totalItems) {
        // Jump back to the first real item without animation
        currentIndex = 0;
        carousel.style.transition = 'none';
        updateCarousel();
        setTimeout(() => {
            carousel.style.transition = 'transform 0.5s ease';
        }, 50);
    } else {
        currentIndex++;
        updateCarousel();
    }
}

// Function to move to the previous item
function moveToPrev() {
    if (currentIndex === 0) {
        // Jump to the last real item (second-to-last in the carousel)
        currentIndex = totalItems - 1;
        carousel.style.transition = 'none';
        updateCarousel();
        setTimeout(() => {
            carousel.style.transition = 'transform 0.5s ease';
        }, 50);
    } else {
        currentIndex--;
        updateCarousel();
    }
}

// Function to update the carousel position
function updateCarousel() {
    carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
}

// Event listeners for the navigation buttons
nextBtn.addEventListener('click', moveToNext);
prevBtn.addEventListener('click', moveToPrev);

// Auto-slide every 3 seconds
setInterval(moveToNext, 5000);

// Initial call to set the correct item
updateCarousel();
