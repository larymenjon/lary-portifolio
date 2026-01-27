document.addEventListener("DOMContentLoaded", () => {
    
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