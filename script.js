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
            const href = this.getAttribute('href');
            // Não fazer smooth scroll se for uma categoria
            if (href.startsWith('#category/')) {
                return; // Deixar o navegador fazer o roteamento
            }
            e.preventDefault();
            const targetId = href;
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ===== GERENCIAMENTO DE CATEGORIAS DO BLOG =====
    const categoryMap = {
        'game-design': 'Game Design',
        'programacao': 'Programação de Jogos',
        'arte-visual': 'Arte e Estilo Visual',
        'devlog': 'Devlog / Diário de Desenvolvimento',
        'industria': 'Indústria de Jogos',
        'analises': 'Análises de Jogos',
        'tutoriais': 'Tutoriais',
        'game-jams': 'Game Jams',
        'audio': 'Áudio para Jogos',
        'psicologia': 'Psicologia dos Jogos'
    };

    // Detectar mudanças de URL (hash)
    function handleCategoryRoute() {
        const hash = window.location.hash;
        
        if (hash.startsWith('#category/')) {
            const categoryId = hash.replace('#category/', '');
            const categoryName = categoryMap[categoryId];
            
            if (categoryName) {
                showCategoryView(categoryId, categoryName);
            }
        } else {
            showBlogView();
        }
    }

    function showCategoryView(categoryId, categoryName) {
        const blogView = document.getElementById('blogView');
        const categoryView = document.getElementById('categoryView');
        const categoryTitle = document.getElementById('categoryTitle');
        const categoriesSection = document.getElementById('categoriesSection');
        const blogHeroTitle = document.getElementById('blogHeroTitle');
        const blogHeroSubtitle = document.getElementById('blogHeroSubtitle');
        const backButton = document.getElementById('backButton');

        if (blogView) blogView.style.display = 'none';
        if (categoryView) categoryView.style.display = 'block';
        if (categoriesSection) categoriesSection.style.display = 'none';
        if (categoryTitle) categoryTitle.textContent = categoryName;
        
        // Atualizar título do hero
        if (blogHeroTitle) blogHeroTitle.textContent = categoryName;
        if (blogHeroSubtitle) blogHeroSubtitle.textContent = `Explore todos os artigos sobre ${categoryName.toLowerCase()}`;
        
        // Configurar o botão de voltar
        if (backButton) {
            backButton.addEventListener('click', (e) => {
                e.preventDefault();
                window.location.hash = '#';
            });
        }

        // Scroll para o topo
        window.scrollTo(0, 0);
    }

    function showBlogView() {
        const blogView = document.getElementById('blogView');
        const categoryView = document.getElementById('categoryView');
        const categoriesSection = document.getElementById('categoriesSection');
        const blogHeroTitle = document.getElementById('blogHeroTitle');
        const blogHeroSubtitle = document.getElementById('blogHeroSubtitle');

        if (blogView) blogView.style.display = 'block';
        if (categoryView) categoryView.style.display = 'none';
        if (categoriesSection) categoriesSection.style.display = 'block';
        
        // Restaurar título original
        if (blogHeroTitle) blogHeroTitle.textContent = 'Pixel & Code';
        if (blogHeroSubtitle) blogHeroSubtitle.textContent = 'Um blog sobre desenvolvimento de jogos, onde arte, código e criatividade se encontram.';

        window.scrollTo(0, 0);
    }

    // Detectar mudanças de hash
    window.addEventListener('hashchange', handleCategoryRoute);
    
    // Chamar ao carregar a página
    handleCategoryRoute();
});