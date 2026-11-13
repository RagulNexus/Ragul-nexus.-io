
const projectData = {

    quote: {
        category: "01 — WEB DEVELOPMENT",
        title: "Quote Website",
        description: "A creative website designed to explore inspirational quotes and discover daily motivation. A simple and modern digital experience.",
        technologies: ["HTML", "CSS", "JavaScript"],
        live: "",
        github: ""
    },

    nexus: {
        category: "02 — PERSONAL PORTFOLIO",
        title: "Ragul Nexus",
        description: "My personal developer portfolio showcasing my skills, creativity, projects and journey in technology and web development.",
        technologies: ["HTML", "CSS", "JavaScript"],
        live: "https://ragulnexus.github.io/Ragul-nexus.-io/",
        github: ""
    },

    next: {
        category: "03 — COMING SOON",
        title: "Next Project",
        description: "A new creative digital project is currently under development. Stay tuned for something exciting!",
        technologies: ["Coming Soon"],
        live: "",
        github: ""
    }

};


function openProject(id) {

    const project = projectData[id];

    if (!project) return;

    document.getElementById("modalCategory").textContent =
        project.category;

    document.getElementById("modalTitle").textContent =
        project.title;

    document.getElementById("previewTitle").textContent =
        project.title;

    document.getElementById("modalDescription").textContent =
        project.description;

    const techContainer = document.getElementById("modalTech");

    techContainer.innerHTML = "";

    project.technologies.forEach(tech => {

        const span = document.createElement("span");

        span.textContent = tech;

        techContainer.appendChild(span);

    });

    const liveButton = document.getElementById("liveButton");
    const githubButton = document.getElementById("githubButton");

    liveButton.href = project.live || "#";
    githubButton.href = project.github || "#";

    liveButton.style.display = project.live ? "inline-block" : "none";
    githubButton.style.display = project.github ? "inline-block" : "none";

    document.getElementById("projectModal").classList.add("active");

    document.body.style.overflow = "hidden";

}


function closeProject() {

    document.getElementById("projectModal").classList.remove("active");

    document.body.style.overflow = "";

}


// Close when clicking outside

document.getElementById("projectModal").addEventListener("click", function(e) {

    if (e.target === this) {
        closeProject();
    }

});


// Close using Escape key

document.addEventListener("keydown", function(e) {

    if (e.key === "Escape") {
        closeProject();
    }

});
