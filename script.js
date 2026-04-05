let isTR = false;

function toggleLanguage() {
    isTR = !isTR;
    const toggle = document.getElementById("langToggle");
    const ball = document.getElementById("toggle-ball");
    
    toggle.classList.toggle("active", isTR);
    ball.innerHTML = isTR ? "&#127481;&#127479;" : "&#127468;&#127463;";
    
    document.querySelectorAll("[data-en]").forEach(function (el) {
        el.innerHTML = isTR ? el.dataset.tr : el.dataset.en;
    });
}