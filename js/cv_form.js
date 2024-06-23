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

    let nombreCookie = "userCookie";
    let valorCookie = obtenerCookie(nombreCookie);
    if (!valorCookie) {
        window.location.href = '../login.html';
    }
    const form = document.getElementById('cv-form');
    const perfilUl = document.getElementById('perfil-info');

    const existsCV = 'https://otros-d07g.onrender.com/api/existsCV/' + valorCookie;
    CVexists(existsCV);
    
    const apiURL = 'https://otros-d07g.onrender.com/api/getBasicData/' + valorCookie;
    obtenerDatosUsuario(apiURL);
    
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Evitar el envío por defecto del formulario
        
        // Validar cada textarea
        let isValid = true;
        const formData = new FormData(); // Usar FormData en lugar de un objeto {}
    
        form.querySelectorAll('textarea').forEach(textarea => {
            const fieldName = textarea.name;
            const value = textarea.value.trim(); // Obtener el valor y quitar espacios en blanco al inicio y final
            
            if (value === '') {
                isValid = false;
                alert(`El campo ${fieldName} no puede estar vacío.`);
            }
    
            formData.append(fieldName, value); // Agregar el campo al FormData
        });
    
        const userId = obtenerCookie("userCookie");
        if (userId) {
            formData.append("userID", userId); // Agregar userId al FormData
        }
    
        // Si todos los campos son válidos, procedemos con el envío
        if (isValid) {
            // Aquí puedes enviar formData utilizando fetch
            fetch('https://otros-d07g.onrender.com/api/guardarCV', {
                method: 'POST', // o 'PUT'
                body: formData, // Usar formData en el cuerpo de la solicitud
            })
            .then(response => response.json())
            .then(data => {
                // Aquí puedes manejar la respuesta del servidor si es necesario
                console.log('Respuesta del servidor:', data);
                // Puedes limpiar el formulario o mostrar un mensaje de éxito
            })
            .catch((error) => {
                console.error('Error al enviar datos:', error);
            });
        }
    });
    
});

function CVexists(apiURL) {
    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            if(data.message != 'No se encontraron documentos')
                window.location.href = "../dashboard.html";
        })
        .catch(error => {
            console.error('Error al obtener los datos del usuario:', error);
        });
}

function obtenerCookie(nombre) {
    let nombreEQ = nombre + "=";
    let cookies = document.cookie.split(';');
    for(let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.indexOf(nombreEQ) === 0) {
            return cookie.substring(nombreEQ.length, cookie.length);
        }
    }
    return null;
}

function obtenerDatosUsuario(apiURL) {
    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            actualizarPerfil(data);
        })
        .catch(error => {
            console.error('Error al obtener los datos del usuario:', error);
        });
}

function actualizarPerfil(data) {
    const perfilInfo = document.getElementById('perfil-info');
    perfilInfo.innerHTML = `
        <li>Nombre: ${data.nombre}</li>
        <li>Número: ${data.numero}</li>
        <li>Correo: ${data.correo}</li>
    `;
}