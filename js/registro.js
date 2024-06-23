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

document.getElementById('registroForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe de forma tradicional

    // Validar que todos los campos estén completos
    const formData = {
        nombre: document.getElementById('nombre').value,
        apellidos: document.getElementById('apellidos').value,
        numero: document.getElementById('numero').value,
        numero2: document.getElementById('numero2').value,
        correo: document.getElementById('correo').value,
        confirmacionCorreo: document.getElementById('confirmacionCorreo').value,
        contrasena: document.getElementById('contrasena').value,
        confirmacionContrasena: document.getElementById('confirmacionContrasena').value,
        edad: document.getElementById('edad').value,
        estadoCivil: document.getElementById('estadoCivil').value,
        genero: document.getElementById('genero').value,
        calle: document.getElementById('calle').value,
        numeroCalle: document.getElementById('numeroCalle').value,
        cp: document.getElementById('cp').value,
        alcaldia: document.getElementById('alcaldia').value,
        municipio: document.getElementById('municipio').value,
        estado: document.getElementById('estado').value
    };

    // Validaciones adicionales
    if (!validateEmail(formData.correo)) {
        return showError('El correo no es válido.');
    }
    if (formData.correo !== formData.confirmacionCorreo) {
        return showError('Los correos electrónicos no coinciden.');
    }
    if (formData.contrasena !== formData.confirmacionContrasena) {
        return showError('Las contraseñas no coinciden.');
    }
    if (!validatePhoneNumber(formData.numero)) {
        return showError('El número de teléfono no es válido. Debe contener 10 dígitos.');
    }
    if (!validatePhoneNumber(formData.numero2)) {
        return showError('El segundo número de teléfono no es válido. Debe contener 10 dígitos.');
    }

    // Enviar datos al servidor
    fetch('https://otros-d07g.onrender.com/api/register', {
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
            // Esperar 2 segundos antes de redirigir
            setTimeout(() => {
                window.location.href = '../login.html'; // Redirigir a la página de inicio de sesión
            }, 2000); // 2000 milisegundos = 2 segundos
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showError('Hubo un error al registrar el usuario.');
    });
});


function validateEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
}

function validatePhoneNumber(phoneNumber) {
    const re = /^\d{10}$/;
    return re.test(String(phoneNumber));
}

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
