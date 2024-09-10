
document.addEventListener("DOMContentLoaded", function () {
    const grid = document.getElementById("circleGrid");
    const numColumns = 115;
    const numRows = 8;
    const totalCircles = numColumns * numRows;
    const circles = [];
  
  // Create the grid of circles
  for (let i = 0; i < totalCircles; i++) {
      const circle = document.createElement("div");
      circle.classList.add("circle");
      grid.appendChild(circle);
      circles.push(circle);
  }
  
  // Coordinates for the letters "HI THERE"
  const letters = [
      [8, 9, 10, 123, 124, 125, 38, 39, 40, 53, 54, 55, 68, 69, 70],  // H
      [12, 14, 27, 28, 41, 42, 55, 56, 69, 70],                     // I
      [85, 86, 87, 88, 101, 102, 115, 116, 129, 130],               // T
      [89, 90, 91, 92, 105, 106, 119, 120, 133, 134],               // H
      [97, 98, 111, 112, 125, 126],                                 // E
      [104, 105, 106, 119, 120, 121, 134, 135, 136],                // R
      [111, 112, 113, 126, 127, 128, 141, 142, 143],                // E
  ];
  
  function turnOnCircles() {
      letters.forEach((letter, index) => {
          setTimeout(() => {
              letter.forEach(position => {
                  circles[position].classList.add("on");
              });
          }, index * 200); // Layered "turn on" effect
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
          const randomCircles = getRandomCircles(5, 10);
          randomCircles.forEach(circle => {
              circle.classList.add("random-on");
              setTimeout(() => {
                  circle.classList.remove("random-on");
              }, 2000); // Stay on for 1 second
          });
      }, 3000); // New set of random circles every 2 seconds
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
  