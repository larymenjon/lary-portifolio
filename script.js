document.addEventListener("DOMContentLoaded", () => {
    
    // ===== MENU HAMBURGER =====
    const navToggle = document.getElementById("navToggle");
    const navMenu = document.getElementById("navMenu");

    if (navToggle && navMenu) {
        navToggle.addEventListener("click", () => {
            navToggle.classList.toggle("active");
            navMenu.classList.toggle("active");
        });

        // Fechar menu ao clicar em um link
        navMenu.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navToggle.classList.remove("active");
                navMenu.classList.remove("active");
            });
        });
    }

    // ===== CARDS SECRETOS (MOBILE) =====
    const championCard = document.getElementById("championCard");
    const secretCards = document.querySelectorAll(".secret-card");
    const mainCardContent = document.querySelector(".main-card-content");
    let cardsOpen = false;

    // Verificar se é mobile
    function isMobile() {
        return window.innerWidth <= 768;
    }

    // Se for desktop, esconder cards inicialmente mas mostrar com hover
    if (mainCardContent && !isMobile()) {
        mainCardContent.addEventListener("mouseenter", () => {
            secretCards.forEach(card => card.classList.add("visible"));
        });
        mainCardContent.addEventListener("mouseleave", () => {
            secretCards.forEach(card => card.classList.remove("visible"));
        });
    }

    // Se for mobile, abrir/fechar cards ao clicar
    if (championCard && isMobile()) {
        championCard.addEventListener("click", () => {
            cardsOpen = !cardsOpen;
            secretCards.forEach(card => {
                if (cardsOpen) {
                    card.classList.add("visible");
                } else {
                    card.classList.remove("visible");
                }
            });
        });
    }

    // Fechar cards ao redimensionar tela
    window.addEventListener("resize", () => {
        if (isMobile()) {
            cardsOpen = false;
            secretCards.forEach(card => card.classList.remove("visible"));
        }
    });
    
    // ===== PLAYER DE ÁUDIO =====
    const bgMusic = document.getElementById("bgMusic");
    const audioToggle = document.getElementById("audioToggle");
    const volumeControl = document.getElementById("volumeControl");

    if (bgMusic && audioToggle && volumeControl) {
        // Definir volume inicial
        bgMusic.volume = 0.3;

        // Toggle play/pause
        audioToggle.addEventListener("click", () => {
            if (bgMusic.paused) {
                bgMusic.play();
                audioToggle.classList.add("playing");
            } else {
                bgMusic.pause();
                audioToggle.classList.remove("playing");
            }
        });

        // Controlar volume
        volumeControl.addEventListener("input", (e) => {
            bgMusic.volume = e.target.value / 100;
        });

        // Tentar autoplay (alguns navegadores bloqueiam)
        bgMusic.play().catch(() => {
            console.log("Autoplay bloqueado - clique no botão para tocar a música");
        });
    }
    
    // EFEITO PARALLAX NO FUNDO RÚNICO
    document.addEventListener("mousemove", (e) => {
        const shapes = document.querySelectorAll(".hex-shape");
        const x = (window.innerWidth - e.pageX * 2) / 100;
        const y = (window.innerHeight - e.pageY * 2) / 100;

        shapes.forEach(shape => {
            let speed = 2;
            if (shape.classList.contains("s1")) speed = 3;
            if (shape.classList.contains("s4")) speed = 1;
            shape.style.transform = `translateX(${x * speed}px) translateY(${y * speed}px)`;
        });
    });

    // SMOOTH SCROLL
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});