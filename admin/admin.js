// game.js
const colors = [
    { color: "#FF5733", code: "#FF5733" },
    { color: "#C70039", code: "#C70039" },
    { color: "#900C3F", code: "#900C3F" },
    { color: "#581845", code: "#581845" },
    { color: "#FFC300", code: "#FFC300" },
    { color: "#DAF7A6", code: "#DAF7A6" }
  ];
  
  let currentColorIndex = 0;
  
  function displayColor() {
    const colorDisplay = document.getElementById("color-display");
    colorDisplay.style.backgroundColor = colors[currentColorIndex].color;
  
    const options = generateOptions();
    const colorOptionsContainer = document.getElementById("color-options");
    colorOptionsContainer.innerHTML = "";
    options.forEach(option => {
      const colorOption = document.createElement("div");
      colorOption.classList.add("color-option");
      colorOption.style.backgroundColor = option;
      colorOption.onclick = () => checkAnswer(option);
      colorOptionsContainer.appendChild(colorOption);
    });
  }
  
  function generateOptions() {
    let options = [];
    options.push(colors[currentColorIndex].code); // Correct answer
  
    // Add 2 random wrong answers
    while (options.length < 3) {
      const randomColor = colors[Math.floor(Math.random() * colors.length)].code;
      if (!options.includes(randomColor)) {
        options.push(randomColor);
      }
    }
  
    // Shuffle options
    options = options.sort(() => Math.random() - 0.5);
    return options;
  }
  
  function checkAnswer(selectedColor) {
    const feedback = document.getElementById("feedback");
  
    if (selectedColor === colors[currentColorIndex].code) {
      feedback.textContent = "🎉 Correct! Well done!";
    } else {
      feedback.textContent = "❌ Incorrect. Try again!";
    }
  }
  
  function nextQuestion() {
    currentColorIndex = (currentColorIndex + 1) % colors.length;
    displayColor();
    document.getElementById("feedback").textContent = "";
  }
  
  // Start the game
  window.onload = displayColor;
  