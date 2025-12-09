async function fetchTaskData() {
    try {
        const response = await fetch("../assets/json/ddugky_project.json");
        if (!response.ok) throw new Error('Failed to fetch JSON');
        const data = await response.json();
        return data.tasks[0]; // Take first task
    } catch (error) {
        console.error("Error fetching JSON:", error);
        return null;
    }
}

async function renderAssets() {
    const task = await fetchTaskData();
    if (!task) return;

    // Set hero section
    document.getElementById('taskTitle').textContent = task.task_title;
    document.getElementById('taskDescription').textContent = task.task_description;

    // Menu List 
    const menuList = document.getElementById("menuList");
    menuList.innerHTML = "";

    task.assets.forEach((asset, index) => {
        const li = document.createElement("li");
        li.textContent = asset.asset_title || "Untitled Item";
        menuList.appendChild(li);
    });

    // Grid Cards
    const gridCards = document.querySelectorAll('.grid .card');
    
    task.assets.forEach((asset, index) => {
        const card = gridCards[index]; // Match asset to card by index
        if (!card) return;

        // Set card header title
        const titleEl = card.querySelector('.assetTitle');
        if (titleEl) titleEl.textContent = asset.asset_title;

        // Set card description
        const descEl = card.querySelector('.assetDescription');
        if (descEl) descEl.innerHTML = `<span>Description: </span>${asset.asset_description}`;

        // Set content based on type
        if (asset.asset_content_type === "video") {
            let videoEl = card.querySelector('iframe');
            if (!videoEl) {
                videoEl = document.createElement('iframe');
                videoEl.width = "100%";
                videoEl.height = "300";
                card.appendChild(videoEl);
            }
            videoEl.src = asset.asset_content;
        }

        if (asset.asset_content_type === "article") {
            const linkEl = card.querySelector('a');
            if (linkEl) linkEl.href = asset.asset_content;
        }

        if (asset.asset_content_type === "threadbuilder") {
            const textareas = card.querySelectorAll('textarea');
            if (textareas.length > 0) {
                textareas[0].placeholder = asset.asset_content;
            }
        }
    });
}

// Run after DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    renderAssets();
});
