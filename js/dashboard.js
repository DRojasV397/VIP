document.addEventListener('DOMContentLoaded', function() {
    Particles.init({
        selector: '.background',
        maxParticles: 250,
        color: '#7D00FF',
        connectParticles: true,
        responsive: [
            {
                breakpoint: 768,
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
    document.getElementById('logout-btn').addEventListener('click', function() {
    borrarCookie('userCookie');

    window.location.href = '../login.html'; // Cambia 'login.html' por la página a la que quieres redirigir
});

function borrarCookie(nombre) {
    document.cookie = `${nombre}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

    const nombreCookie = "userCookie";
    const valorCookie = obtenerCookie(nombreCookie);

    if (!valorCookie) {
        window.location.href = '../login.html';
    }

    const apiURL = 'https://otros-d07g.onrender.com/api/getFullData/' + valorCookie;
    obtenerDatosUsuario(apiURL);

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
                console.log(data);
                actualizarPerfil(data);
                actualizarCV(data.cv[0]);
            })
            .catch(error => {
                console.error('Error al obtener los datos del usuario:', error);
            });
    }

    function actualizarPerfil(data) {
        document.getElementById('nombre-usuario').textContent = data.nombre;
        document.getElementById('nombre').textContent = data.nombre + " " + data.apellidos;
        document.getElementById('numero').textContent = data.numero;
        document.getElementById('correo').textContent = data.correo;
    }

    function actualizarCV(cv) {
        document.getElementById('proyectos').textContent = cv.proyectos;
        document.getElementById('experiencia').textContent = cv.experiencia;
        document.getElementById('carrera').textContent = cv.carrera;
        document.getElementById('habilidades').textContent = cv.habilidades;
        document.getElementById('objetivos').textContent = cv.objetivos;
        document.getElementById('cursos').textContent = cv.cursos;
        document.getElementById('descripcion').textContent = cv.descripcion;
        document.getElementById('pasatiempos').textContent = cv.pasatiempos;
    }
});
