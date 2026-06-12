document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. REMOVE LOADING SCREEN ---
    const loader = document.getElementById("loader");
    if (loader) {
        window.addEventListener("load", () => {
            loader.style.opacity = "0";
            setTimeout(() => {
                loader.style.display = "none";
            }, 500);
        });
    }

    // --- 2. DARK / LIGHT MODE TOGGLE ---
    const themeToggleBtn = document.getElementById("theme-toggle");
    const currentTheme = localStorage.getItem("theme");

    // Cek preferensi user sebelumnya di local storage
    if (currentTheme) {
        document.documentElement.setAttribute("data-theme", currentTheme);
        if (currentTheme === "dark") {
            themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
        }
    }

    themeToggleBtn.addEventListener("click", () => {
        let theme = document.documentElement.getAttribute("data-theme");
        if (theme === "dark") {
            document.documentElement.setAttribute("data-theme", "light");
            localStorage.setItem("theme", "light");
            themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            document.documentElement.setAttribute("data-theme", "dark");
            localStorage.setItem("theme", "dark");
            themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
        }
    });

    // --- 3. MOBILE HAMBURGER MENU ---
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    // Menutup menu mobile saat link di klik
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
        });
    });

    // --- 4. SCROLL ACTIVE LINK & NAVBAR SHADOW ---
    const sections = document.querySelectorAll("section");
    const navbar = document.querySelector(".navbar");

    window.addEventListener("scroll", () => {
        let current = "";
        
        // Efek shadow pada navbar saat di-scroll
        if (window.scrollY > 50) {
            navbar.style.boxShadow = "var(--shadow)";
            navbar.style.padding = "0.2rem 0";
        } else {
            navbar.style.boxShadow = "none";
            navbar.style.padding = "0";
        }

        // Deteksi posisi section untuk keaktifan Nav Link
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 150)) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(current)) {
                link.classList.add("active");
            }
        });
    });

    // --- 5. SMOOTH ANIMATION ON SCROLL (Intersection Observer) ---
    const faders = document.querySelectorAll(".fade-in");
    
    const appearOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver((entries, appearOnScroll) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add("appear");
                appearOnScroll.unobserve(entry.target); // Matikan observer jika sudah muncul
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });
});