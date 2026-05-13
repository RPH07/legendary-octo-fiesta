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
    const projects = {
        'ecashbook' : [
            'https://fastly.picsum.photos/id/0/5000/3333.jpg?hmac=_j6ghY5fCfSD6tvtcV74zXivkJSPIfR9B8w34XeQmvU',
            'https://fastly.picsum.photos/id/2/5000/3333.jpg?hmac=_KDkqQVttXw_nM-RyJfLImIbafFrqLsuGO5YuHqD-qQ',
            'https://fastly.picsum.photos/id/4/5000/3333.jpg?hmac=ghf06FdmgiD0-G4c9DdNM8RnBIN7BO0-ZGEw47khHP4'
        ]
    }

    let currentImages = [];
    let currentIndex = 0;

    function openLightbox(projectKey) {
        currentImages = projects[projectKey] || [];
        currentIndex = 0;
        showImage();
        document.getElementById("lightbox").classList.remove("hidden");
        document.body.style.overflow = "hidden";
    }

    function showImage() {
        document.getElementById("lightbox-img").src = currentImages[currentIndex];
        document.getElementById("lightbox-counter").textContent = 
        `[${currentIndex + 1} / ${currentImages.length}]`
        const nav = document.getElementById('lightbox-nav');
        nav.classList.toggle('hidden', currentImages.length <= 1);
    }

    function prevImage() {currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;  showImage(); }
    function nextImage() {currentIndex = (currentIndex + 1) % currentImages.length; showImage(); }

    function closeLightbox() {
        document.getElementById("lightbox").classList.add("hidden");
        document.body.style.overflow = "";
    }

    document.addEventListener("keydown", e => {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
    });
    
