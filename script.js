document.addEventListener("DOMContentLoaded", () => {
    // Carregar últimos artigos
    loadLatestArticles();
    
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

    // ===== FUNÇÃO PARA MOSTRAR ARTIGO =====
    window.showArticle = function(articleId) {
        const article = articles[articleId];
        if (!article) return;

        const articleView = document.getElementById('articleView');
        const categoryView = document.getElementById('categoryView');
        const blogView = document.getElementById('blogView');
        
        if (articleView) articleView.style.display = 'block';
        if (categoryView) categoryView.style.display = 'none';
        if (blogView) blogView.style.display = 'none';

        // Preencher dados do artigo
        const categoryTag = document.getElementById('articleCategoryTag');
        const title = document.getElementById('articleTitle');
        const date = document.getElementById('articleDate');
        const readTime = document.getElementById('articleReadTime');
        const content = document.getElementById('articleContent');

        if (categoryTag) categoryTag.textContent = article.category;
        if (title) title.textContent = article.title;
        if (date) date.textContent = article.date;
        if (readTime) readTime.textContent = article.readTime;
        if (content) content.innerHTML = article.content;

        // Limpar estilos de like
        const likeBtn = document.getElementById('likeBtn');
        if (likeBtn && localStorage.getItem(`article-liked-${articleId}`)) {
            likeBtn.classList.add('liked');
            likeBtn.querySelector('i').classList.remove('far');
            likeBtn.querySelector('i').classList.add('fas');
        } else if (likeBtn) {
            likeBtn.classList.remove('liked');
            likeBtn.querySelector('i').classList.add('far');
            likeBtn.querySelector('i').classList.remove('fas');
        }

        // Carregar contagem de likes
        const likeCount = document.getElementById('likeCount');
        if (likeCount) {
            const count = localStorage.getItem(`article-likes-${articleId}`) || '0';
            likeCount.textContent = count;
        }

        // Gerenciador de Like
        if (likeBtn && !likeBtn.dataset.listenerAdded) {
            likeBtn.addEventListener('click', function() {
                const isLiked = this.classList.contains('liked');
                const likeCount = document.getElementById('likeCount');
                let count = parseInt(likeCount.textContent);

                if (isLiked) {
                    this.classList.remove('liked');
                    this.querySelector('i').classList.add('far');
                    this.querySelector('i').classList.remove('fas');
                    count--;
                    localStorage.removeItem(`article-liked-${articleId}`);
                } else {
                    this.classList.add('liked');
                    this.querySelector('i').classList.remove('far');
                    this.querySelector('i').classList.add('fas');
                    count++;
                    localStorage.setItem(`article-liked-${articleId}`, 'true');
                }

                likeCount.textContent = count;
                localStorage.setItem(`article-likes-${articleId}`, count);
            });
            likeBtn.dataset.listenerAdded = 'true';
        }

        // Gerenciador de Compartilhamento
        const shareButtons = document.querySelectorAll('.share-btn');
        shareButtons.forEach(btn => {
            if (!btn.dataset.listenerAdded) {
                btn.addEventListener('click', function() {
                    const shareType = this.getAttribute('data-share');
                    const articleUrl = window.location.href;
                    const articleTitle = article.title;

                    if (shareType === 'link') {
                        // Copiar link para a área de transferência
                        navigator.clipboard.writeText(articleUrl).then(() => {
                            // Feedback visual
                            const originalText = this.innerHTML;
                            this.innerHTML = '<i class="fas fa-check"></i> Copiado!';
                            setTimeout(() => {
                                this.innerHTML = originalText;
                            }, 2000);
                        });
                    } else if (shareType === 'whatsapp') {
                        // Abrir WhatsApp com mensagem
                        const text = encodeURIComponent(`Confira este artigo: ${articleTitle}\n${articleUrl}`);
                        window.open(`https://wa.me/?text=${text}`, '_blank');
                    }
                });
                btn.dataset.listenerAdded = 'true';
            }
        });

        // Botão de voltar do artigo
        const backFromArticleButton = document.getElementById('backFromArticleButton');
        if (backFromArticleButton && !backFromArticleButton.dataset.listenerAdded) {
            backFromArticleButton.addEventListener('click', (e) => {
                e.preventDefault();
                window.location.hash = '#';
            });
            backFromArticleButton.dataset.listenerAdded = 'true';
        }

        window.scrollTo(0, 0);
    };

    // ===== ARTIGOS DO BLOG =====
    const articles = {
        // Artigos serão adicionados aqui
    };

    // Carregar últimos artigos na página inicial
    function loadLatestArticles() {
        const latestGrid = document.getElementById('latestArticlesGrid');
        if (!latestGrid) return;

        const allArticles = Object.entries(articles);
        
        if (allArticles.length > 0) {
            latestGrid.innerHTML = '';
            allArticles.forEach(([articleId, article]) => {
                const articleCard = document.createElement('div');
                articleCard.className = 'article-card-small';
                articleCard.innerHTML = `
                    <div class="article-card-small-image">
                        <img src="${article.image}" alt="${article.title}" onerror="this.style.opacity='0'">
                    </div>
                    <div class="article-card-small-content">
                        <span class="article-card-small-category">${article.category}</span>
                        <h3 class="article-card-small-title">${article.title}</h3>
                        <div class="article-card-small-meta">
                            <span>${article.date}</span> • <span>${article.readTime}</span>
                        </div>
                    </div>
                `;
                
                articleCard.addEventListener('click', () => {
                    showArticle(articleId);
                });
                
                latestGrid.appendChild(articleCard);
            });
        } else {
            latestGrid.innerHTML = `
                <div class="construction-banner" style="grid-column: 1 / -1;">
                    <i class="fas fa-tools"></i>
                    <h2>EM CONSTRUÇÃO</h2>
                    <p>Novos artigos em breve...</p>
                </div>
            `;
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
        const categoryArticles = document.getElementById('categoryArticles');

        if (blogView) blogView.style.display = 'none';
        if (categoryView) categoryView.style.display = 'block';
        if (categoriesSection) categoriesSection.style.display = 'none';
        if (categoryTitle) categoryTitle.textContent = categoryName;
        
        // Atualizar título do hero
        if (blogHeroTitle) blogHeroTitle.textContent = categoryName;
        if (blogHeroSubtitle) blogHeroSubtitle.textContent = `Explore todos os artigos sobre ${categoryName.toLowerCase()}`;
        
        // Carregar artigos da categoria
        if (categoryArticles) {
            const articlesInCategory = Object.entries(articles).filter(([id, article]) => article.categoryId === categoryId);
            
            if (articlesInCategory.length > 0) {
                categoryArticles.innerHTML = '';
                articlesInCategory.forEach(([articleId, article]) => {
                    const articleCard = document.createElement('div');
                    articleCard.className = 'blog-card';
                    articleCard.innerHTML = `
                        <div class="blog-card-image">
                            <div style="width: 100%; height: 100%; background: linear-gradient(135deg, rgba(10, 200, 185, 0.2), rgba(200, 170, 110, 0.1)); display: flex; align-items: center; justify-content: center;">
                                <i class="fas fa-file-alt" style="font-size: 3rem; color: var(--lol-gold); opacity: 0.5;"></i>
                            </div>
                        </div>
                        <div class="blog-card-content">
                            <span class="blog-card-category">${article.category}</span>
                            <h3 class="blog-card-title">${article.title}</h3>
                            <p class="blog-card-excerpt">${article.excerpt}</p>
                            <div class="blog-card-meta">
                                <span class="blog-card-date">${article.date}</span>
                                <span class="blog-card-read-time">${article.readTime}</span>
                            </div>
                        </div>
                    `;
                    
                    articleCard.addEventListener('click', () => {
                        showArticle(articleId);
                    });
                    
                    categoryArticles.appendChild(articleCard);
                });
            } else {
                categoryArticles.innerHTML = `
                    <div class="construction-banner">
                        <i class="fas fa-tools"></i>
                        <h3>Artigos em breve</h3>
                        <p>Nenhum artigo publicado nesta categoria ainda.</p>
                    </div>
                `;
            }
        }
        
        // Configurar o botão de voltar
        if (backButton) {
            backButton.onclick = (e) => {
                e.preventDefault();
                window.location.hash = '#';
            };
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
});