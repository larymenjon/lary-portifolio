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
    const cardHusband = document.querySelector(".card-husband");
    const cardBaby = document.querySelector(".card-baby");
    const mainCardContent = document.querySelector(".main-card-content");
    let cardsOpen = false;
    let activeCard = null;

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
            activeCard = null;
        });
    }

    // Se for mobile, abrir/fechar cards ao clicar
    if (championCard && isMobile()) {
        // Clicar no card principal abre/fecha todos
        mainCardContent.addEventListener("click", (e) => {
            if (!e.target.closest(".secret-card")) {
                cardsOpen = !cardsOpen;
                if (cardsOpen) {
                    secretCards.forEach(card => card.classList.add("visible"));
                    activeCard = null;
                } else {
                    secretCards.forEach(card => card.classList.remove("visible"));
                    activeCard = null;
                }
            }
        });

        // Clicar em cada card secreto individualmente o coloca na frente
        if (cardHusband) {
            cardHusband.addEventListener("click", (e) => {
                e.stopPropagation();
                if (activeCard !== "husband") {
                    activeCard = "husband";
                    cardHusband.style.zIndex = "20";
                    if (cardBaby) cardBaby.style.zIndex = "5";
                } else {
                    activeCard = null;
                    cardHusband.style.zIndex = "5";
                }
            });
        }

        if (cardBaby) {
            cardBaby.addEventListener("click", (e) => {
                e.stopPropagation();
                if (activeCard !== "baby") {
                    activeCard = "baby";
                    cardBaby.style.zIndex = "20";
                    if (cardHusband) cardHusband.style.zIndex = "5";
                } else {
                    activeCard = null;
                    cardBaby.style.zIndex = "5";
                }
            });
        }
    }

    // Fechar cards ao redimensionar tela
    window.addEventListener("resize", () => {
        if (isMobile()) {
            cardsOpen = false;
            activeCard = null;
            secretCards.forEach(card => {
                card.classList.remove("visible");
                card.style.zIndex = "5";
            });
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