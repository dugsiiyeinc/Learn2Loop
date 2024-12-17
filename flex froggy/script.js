// Levels Data
let levels = JSON.parse(localStorage.getItem("levels")) || [
    {
      instruction: "Level 1: Use justify-content to move the red box to the right.",
      correctCSS: "justify-content: flex-end;"
    },
    {
      instruction: "Level 2: Use justify-content to center the red box.",
      correctCSS: "justify-content: center;"
    },
    {
      instruction: "Level 3: Use align-items to move the red box to the bottom.",
      correctCSS: "align-items: flex-end;"
    },
    // {
    //   instruction: "Level 4: Use justify-content and align-items to center the red box.",
    //   correctCSS: "justify-content: center; align-items: center;"
    // },
    {
      instruction: "Level 5: Use justify-content to space the boxes evenly.",
      correctCSS: "justify-content: space-around;"
    },
    {
      instruction: "Level 6: Use align-items to stretch the boxes vertically.",
      correctCSS: "align-items: stretch;"
    }
  ];
  
  let currentLevel = 0;
//   Levels Number
  document.getElementById("levelsNum").innerHTML =levels.length;
  // Load progress from Local Storage
  function loadProgress() {
    const savedLevel = localStorage.getItem("currentLevel");
    if (savedLevel !== null) {
      currentLevel = parseInt(savedLevel);
    }
    updateLevel();
    updateProgressBar();
  }
  
  // Update Challenge Instructions
  function updateLevel() {
    const challengeText = document.getElementById("challenge-text");
    challengeText.textContent = levels[currentLevel].instruction;
  
    const feedback = document.getElementById("feedback");
    feedback.textContent = ""; // Clear previous feedback
  
    // Update placeholder
    const cssInput = document.getElementById("css-input");
    cssInput.placeholder = levels[currentLevel].correctCSS;
  }
  
  // Check Solution
  function checkSolution() {
    const userCSS = document.getElementById("css-input").value.trim();
    const flexContainer = document.getElementById("flex-container");
    const feedback = document.getElementById("feedback");
  
    // Apply user CSS
    flexContainer.style.cssText = userCSS;
  
    // Clear previous feedback
    feedback.textContent = "";
  
    // Check Solution
    if (userCSS.includes(levels[currentLevel].correctCSS.replace(';', ''))) {
      feedback.textContent = "🎉 Correct! Moving to the next level...";
      saveProgress();
      setTimeout(nextLevel, 1500); // Delay before moving to the next level
    } else {
      feedback.textContent = "❌ Incorrect. Try again!";
    }
  }
  
  // Save Progress in Local Storage
  function saveProgress() {
    localStorage.setItem("currentLevel", currentLevel + 1);
  }
  
  // Next Level
  function nextLevel() {
    currentLevel++;
    if (currentLevel < levels.length) {
      updateLevel();
      updateProgressBar();
      const flexContainer = document.getElementById("flex-container");
      flexContainer.style.cssText = ""; // Reset styles
      document.getElementById("css-input").value = ""; // Clear input
    } else {
      document.getElementById("challenge-text").textContent =
        "🎯 Congratulations! You've completed all levels!";
      document.getElementById("feedback").textContent = "You're a Flexbox Pro!";
    }
  }
  
  // Update Progress Bar
  function updateProgressBar() {
    const progressBar = document.getElementById("progress-bar");
    const progress = ((currentLevel + 1) / levels.length) * 100;
    progressBar.style.width = `${progress}%`;
    progressBar.textContent = `${currentLevel + 1} / ${levels.length} Levels`;
  }
  
  // Load Progress on Page Load
  window.onload = loadProgress;
  