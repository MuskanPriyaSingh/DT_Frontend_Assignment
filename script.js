const sidebar = document.getElementById("leftSidebar");

const collapsedHeader = document.getElementById("collapsedHeader");
const expandedHeader = document.getElementById("expandedHeader");

const toggleArrow = document.getElementById("toggleArrow");
const closeArrow = document.getElementById("closeArrow");

const journeyMenu = document.getElementById("journeyMenu");
const leftContent = document.querySelector(".left-sidebar-content"); 

const profileDiv = document.getElementById('upload-img');
const fileInput = document.getElementById('profileInput');

toggleArrow.addEventListener("click", () => {
    sidebar.style.width = "392px";

    collapsedHeader.classList.add("hidden");
    expandedHeader.classList.remove("hidden");
    journeyMenu.classList.remove("hidden");

    leftContent.classList.add("hidden"); // HIDE BOX
});

closeArrow.addEventListener("click", () => {
    sidebar.style.width = "132px";

    collapsedHeader.classList.remove("hidden");
    expandedHeader.classList.add("hidden");
    journeyMenu.classList.add("hidden");

    leftContent.classList.remove("hidden"); // SHOW BOX
});


// Click on profile div opens file picker
profileDiv.addEventListener('click', () => {
    fileInput.click();
});

// Handle file selection
fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        // Set uploaded image as background
        profileDiv.innerHTML = `<img src="${e.target.result}" alt="Profile Image">`;

        // Optional: Save to localStorage to persist
        localStorage.setItem('profileImage', e.target.result);
    };
    reader.readAsDataURL(file);
});

// Load image from localStorage on page load
window.addEventListener('DOMContentLoaded', () => {
    const savedImage = localStorage.getItem('profileImage');
    if (savedImage) {
        profileDiv.innerHTML = `<img src="${savedImage}" alt="Profile Image">`;
    }
});

