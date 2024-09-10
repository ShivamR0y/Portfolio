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
  function generateRandomSquare() {
    const randomSquare = document.createElement("div");
    randomSquare.classList.add("square", "random-square");
    randomSquare.style.top = `${Math.random() * window.innerHeight}px`;
    randomSquare.style.left = `${Math.random() * window.innerWidth}px`;
    randomSquare.style.backgroundColor = randomColors[Math.floor(Math.random() * randomColors.length)];
    
    gameArea.appendChild(randomSquare);

    // Remove random square after 10 seconds
    setTimeout(() => {
      if (randomSquare.parentNode) {
        randomSquare.parentNode.removeChild(randomSquare);
      }
    }, 10000);

    // Add event listener to pop the square and grow the trail
    randomSquare.addEventListener("mouseover", () => {
      const color = randomSquare.style.backgroundColor;
      randomSquare.remove();
      trailLength++;
      addTrailSquare(color);
    });

    // Schedule the next square generation at a random interval between 1.5 and 8.5 seconds
    setTimeout(generateRandomSquare, getRandomInterval());
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
    // Update pointer position
    pointerSquare.style.top = `${e.clientY}px`;
    pointerSquare.style.left = `${e.clientX}px`;

    // Update pointer position, centering the real cursor in the middle
    pointerSquare.style.top = `${e.clientY - 15 / 2}px`;  //this is the width of the pointer square
    pointerSquare.style.left = `${e.clientX - 15 / 2}px`;
    
    // Update trail position with more spacing
    trail.forEach((square, index) => {
      const delay = (index + 1) * 35; // Increased spacing between trail squares
      setTimeout(() => {
        square.style.top = `${e.clientY - 5}px`;
        square.style.left = `${e.clientX - 5}px`;  //This is the half size of the trail square
      }, delay);
    });
  }

  // Function to get a random interval between 2 and 10 seconds (2000ms to 10000ms)
  function getRandomInterval() {
    return Math.random() * (8500 - 1500) + 1500;
  }

  // Generate the first square and set the random interval
  setTimeout(generateRandomSquare, 2000);

  // Event listener for mouse movement
  window.addEventListener("mousemove", onMouseMove);



  //break between two difference JS

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
  ];

  function turnOnCircles() {
      letters.forEach((letter, index) => {
          setTimeout(() => {
              letter.forEach(position => {
                  circles[position].classList.add("on");
              });
          }, index * 15); // Layered "turn on" effect
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
      }, 6000); // New set of random circles every 2 seconds
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
