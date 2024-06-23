document.addEventListener('DOMContentLoaded', function() {
    Particles.init({
        selector: '.background',
        maxParticles: 250,
        color: '#7D00FF',
        connectParticles: true,
        responsive: [
            {
                breakpoint: 68,
                options: {
                    maxParticles: 80,
                    connectParticles: true
                }
            },
            {
                breakpoint: 425,
                options: {
                    maxParticles: 50,
                    connectParticles: false
                }
            }
        ]
    });
    
    function updateParticles() {
        Particles.particles.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
        });
    
        Particles.draw(); // Vuelve a dibujar las partículas
    }
    
    let isScrolling = false;
    
    window.addEventListener('scroll', function() {
        if (!isScrolling) {
            isScrolling = true;
            requestAnimationFrame(function() {
                updateParticles();
                isScrolling = false;
            });
        }
    });
});
function iniciarSesion() {
    window.location.href = '../login.html';
}

function registro() {
    window.location.href = '../registro.html';
}
