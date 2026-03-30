document.addEventListener("DOMContentLoaded", () => {

    function toggleMenu() {
        const menu = document.querySelector("nav");
        menu.classList.toggle("active");
    }
    
    window.toggleMenu = toggleMenu;

    document.querySelectorAll("nav a").forEach(link => {
        link.addEventListener("click", () => {
            document.querySelector("nav").classList.remove("active");
        });
    });
});