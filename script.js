// Quotes array
const quotes = [
  "Happiness can be found even in the darkest of times, if one only remembers to turn on the light.",
  "Your present circumstances don’t determine where you can go; they merely determine where you start.",
  "Mental health is not a destination, but a process.",
  "You don’t have to control your thoughts. You just have to stop letting them control you.",
  "Self-care is how you take your power back."
];

function newQuote() {
  const quoteElement = document.getElementById("quote");
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const newText = `"${quotes[randomIndex]}"`;

  // Fade out
  quoteElement.style.opacity = 0;

  setTimeout(() => {
    // Change text after fade out
    quoteElement.innerText = newText;

    // Fade in
    quoteElement.style.opacity = 1;
  }, 600); // matches CSS transition duration
}

// Toggle mobile menu
function toggleMenu() {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("navLinks");

  if (hamburger && navLinks) {
    hamburger.classList.toggle("active");
    navLinks.classList.toggle("active");
  }
}

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});


document.addEventListener("DOMContentLoaded", () => {

  const cards = document.querySelectorAll(".challenge-card");

  // Initialize buttons
  cards.forEach(card => {
    const day = card.getAttribute("data-day");
    const btn = card.querySelector(".complete-btn");

  // Set initial button text if not completed
    if (localStorage.getItem("challenge_day_" + day) === "complete") {
      card.classList.add("not complete");
      btn.innerText = "✔Mark Complete";
      btn.disabled = true;
    } 
    // Add click listener to mark as completed
    btn.addEventListener("click", () => {
      card.classList.add("completed");
      btn.innerText = "Completed";
      btn.disabled = true;
      localStorage.setItem("challenge_day_" + day, "completed");
    });
  });

});

// Load saved moods from localStorage
let moods = JSON.parse(localStorage.getItem("moods")) || [];

// Chart.js setup
const ctx = document.getElementById("moodChart").getContext("2d");
const moodChart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: [], // moods
    datasets: [{
      label: "Mood Count",
      data: [],
      backgroundColor: "rgba(75, 192, 192, 0.6)"
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false
  }
});

// Save Mood
function saveMood() {
  const moodSelect = document.getElementById("mood-select");
  const selectedMood = moodSelect.value;

  if (selectedMood === "") {
    alert("Please select a mood.");
    return;
  }

  // Save to array
  moods.push({
    mood: selectedMood,
    date: new Date().toLocaleDateString()
  });

  // Store in localStorage
  localStorage.setItem("moods", JSON.stringify(moods));

  // Update chart + history
  updateChart();
  updateHistory();

  moodSelect.value = ""; // reset
}

// Update Chart
function updateChart() {
  const moodCounts = {};
  moods.forEach(entry => {
    moodCounts[entry.mood] = (moodCounts[entry.mood] || 0) + 1;
  });

  moodChart.data.labels = Object.keys(moodCounts);
  moodChart.data.datasets[0].data = Object.values(moodCounts);
  moodChart.update();
}

// Update History List
function updateHistory() {
  const historyList = document.getElementById("mood-history-list");
  historyList.innerHTML = "";

  moods.forEach(entry => {
    const li = document.createElement("li");
    li.textContent = `${entry.date}: ${entry.mood}`;
    historyList.appendChild(li);
  });
}

// Clear history
function clearHistory() {
  if (confirm("Are you sure you want to clear all moods?")) {
    moods = [];
    localStorage.removeItem("moods");
    updateChart();
    updateHistory();
  }
}
// Initialize on page load
updateChart();
updateHistory();

  const form = document.getElementById("appointmentForm");
  const confirmation = document.getElementById("confirmation");

  form.addEventListener("submit", function(event) {
    event.preventDefault(); // stop form refresh

    // Get values
    const date = document.getElementById("date-Thinusha").value;
    const time = document.getElementById("time-Thinusha").value;

    if (date && time) {
      confirmation.style.display = "block"; // show confirmation
      confirmation.outerText = `Appointment booked for ${date} at ${time}`;
    } else {
      confirmation.style.display = "block";
      confirmation.style.color = "red";
      confirmation.outerText = "⚠️ Please select both date and time.";
    }

    // Optional: clear form after booking
    form.reset();
  });

  