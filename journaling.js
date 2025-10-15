let entries = JSON.parse(localStorage.getItem("journalEntries")) || [];

function saveEntry() {
  const text = document.getElementById("journal-entry").value.trim();
  if (!text) {
    alert("Please write something before saving.");
    return;
  }

  const entry = {
    date: new Date().toLocaleString(),
    content: text
  };

  entries.push(entry);
  localStorage.setItem("journalEntries", JSON.stringify(entries));
  document.getElementById("journal-entry").value = "";

  renderEntries();
}

function renderEntries() {
  const list = document.getElementById("journal-list");
  list.innerHTML = "";

  entries.forEach(e => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${e.date}</strong><br>${e.content}`;
    list.appendChild(li);
  });
}

function clearJournal() {
  if (confirm("Are you sure you want to clear all journal entries?")) {
    entries = [];
    localStorage.removeItem("journalEntries");
    renderEntries();
  }
}

// On page load
renderEntries();


const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navLinks.classList.toggle("active");
});
