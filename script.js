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
  const nav = document.getElementById("navLinks");
  const burger = document.getElementById("hamburger");
  if (nav && burger) {
    nav.classList.toggle("active");
    burger.classList.toggle("active");
  }
}

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
