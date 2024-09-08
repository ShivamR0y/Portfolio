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

  // Update trail position with more spacing
  trail.forEach((square, index) => {
    const delay = (index + 1) * 30; // Increased spacing between trail squares
    setTimeout(() => {
      square.style.top = `${e.clientY}px`;
      square.style.left = `${e.clientX}px`;
    }, delay);
  });
}

// Generate random squares atrandom intervals between 1,000 and 10,000ms.
setInterval(generateRandomSquare, Math.random()*10000);

// Event listener for mouse movement
window.addEventListener("mousemove", onMouseMove);