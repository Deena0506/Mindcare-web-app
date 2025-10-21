function createPost() {
  const text = document.getElementById("postText").value.trim();
  const fileInput = document.getElementById("imageInput");
  const feed = document.getElementById("feed");

  if (!text && !fileInput.files.length) {
    alert("Please add some text or an image 🌿");
    return;
  }

  const post = document.createElement("div");
  post.classList.add("post");

  const randomUser = getRandomUser();
  const timestamp = new Date().toLocaleString();

  let imageHTML = "";
  if (fileInput.files.length > 0) {
    const file = fileInput.files[0];
    const imgURL = URL.createObjectURL(file);
    imageHTML = `<img src="${imgURL}" alt="Post Image">`;
  }

  post.innerHTML = `
    <div class="post-header">
      <div class="profile-pic">${randomUser.charAt(0).toUpperCase()}</div>
      <div>
        <div class="username">${randomUser}</div>
        <small>${timestamp}</small>
      </div>
    </div>
    <p>${text}</p>
    ${imageHTML}
    <div class="actions">
      <span onclick="likePost(this)">❤️</span>
      <span onclick="commentPost(this)">💬</span>
    </div>
  `;

  feed.prepend(post);

  // Clear inputs
  document.getElementById("postText").value = "";
  fileInput.value = "";
}

function getRandomUser() {
  const users = ["You"];
  return users[Math.floor(Math.random() * users.length)];
}

function likePost(el) {
  if (!el.classList.contains("liked")) {
    el.classList.add("liked");
    el.textContent = "❤️ 1";
  } else {
    el.classList.remove("liked");
    el.textContent = "❤️";
  }
}

function commentPost(el) {
  const comment = prompt("Write a comment 💬");
  if (comment) alert(`You commented: ${comment}`);
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