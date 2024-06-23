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

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe de forma tradicional

    // Obtener valores de los campos
    const formData = {
        email: document.getElementById('correo').value,
        password: document.getElementById('contrasena').value
    };

    // Enviar datos al servidor
    fetch('https://otros-d07g.onrender.com/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            showError(data.error);
        } else {
            showSuccess(data.message);
            setTimeout(() => {
                let nombre = "userCookie";
                let valor = data.userID;
                let dias = 7;
                let fecha = new Date();
                fecha.setTime(fecha.getTime() + (dias * 24 * 60 * 60 * 1000));
                let expiracion = "expires=" + fecha.toUTCString();
                let path = "path=/";

                document.cookie = `${nombre}=${valor};${expiracion};${path}`;

                if(data.auth)
                    window.location.href = '../admin.html';
                else
                    window.location.href = '../cv_form.html';
            }, 2000); // 2000 milisegundos = 2 segundos
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showError('Hubo un error al intentar iniciar sesión.');
    });
});


function showError(message) {
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: message
    });
}

function showSuccess(message) {
    Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: message
    });
}

function togglePasswordVisibility(inputId) {
    const input = document.getElementById(inputId);
    const toggleBtn = input.nextElementSibling; // El siguiente elemento después del input es el span de "Mostrar"

    if (input.type === "password") {
        input.type = "text";
        toggleBtn.textContent = "Ocultar";
    } else {
        input.type = "password";
        toggleBtn.textContent = "Mostrar";
    }
}
