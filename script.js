document.addEventListener("DOMContentLoaded", () => {
    
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