document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       UGB SHARED MOBILE NAVIGATION
    ========================================= */

    const navToggle = document.querySelector(".nav-toggle");
    const mainNav = document.querySelector("#main-navigation");

    if (!navToggle || !mainNav) {
        return;
    }

    function openMenu() {
        mainNav.classList.add("is-open");
        navToggle.classList.add("is-active");
        navToggle.setAttribute("aria-expanded", "true");
        navToggle.setAttribute("aria-label", "Close navigation");
    }

    function closeMenu() {
        mainNav.classList.remove("is-open");
        navToggle.classList.remove("is-active");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.setAttribute("aria-label", "Open navigation");
    }

    function toggleMenu() {
        const isOpen = mainNav.classList.contains("is-open");

        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    navToggle.addEventListener("click", toggleMenu);


    /* =========================================
       CLOSE MENU AFTER CLICKING A LINK
    ========================================= */

    const navLinks = mainNav.querySelectorAll("a");

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            closeMenu();
        });
    });


    /* =========================================
       CLOSE MENU WITH ESC KEY
    ========================================= */

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeMenu();
        }
    });


    /* =========================================
       RESET MENU WHEN RETURNING TO DESKTOP
    ========================================= */

    window.addEventListener("resize", () => {
        if (window.innerWidth > 900) {
            closeMenu();
        }
    });

});