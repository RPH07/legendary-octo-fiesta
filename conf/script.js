const toggle = document.getElementById("menuToggle");
const closeBtn = document.getElementById("menuClose");
const menu = document.getElementById("mobileMenu");

function openMenu() {
    menu.classList.remove("hidden");
    menu.classList.add("flex");
    document.body.style.overflow = "hidden";
}
function closeMenu() {
    menu.classList.add("hidden");
    menu.classList.remove("flex");
    document.body.style.overflow = "";
}

toggle.addEventListener("click", openMenu);
closeBtn.addEventListener("click", closeMenu);
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
});

// Active nav highlight via IntersectionObserver
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll('nav a[href^="#"]');

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            navLinks.forEach((a) => {
                const active = a.getAttribute("href") === "#" + entry.target.id;
                a.classList.toggle("text-accent", active);
                a.classList.toggle("text-text-muted", !active);
            });
        });
    },
    { threshold: 0.4 },
);

sections.forEach((s) => observer.observe(s));

// lightbox
function openLightbox(src) {
    document.getElementById("lighbox-img").src = src;
    document.getElementById("lightbox").classList.remove("hidden");
    document.body.style.overflow = "hidden";
}

function closeLightbox() {
    document.getElementById("lightbox").classList.add("hidden");
    document.body.style.overflow = "";
}
