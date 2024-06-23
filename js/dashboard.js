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
        window.location.href = '../login.html'; 
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
        document.getElementById('puesto').textContent = cv.puesto;
    }

    document.getElementById('editar-cv-btn').addEventListener('click', function() {
        toggleEditMode(true);
    });

    document.getElementById('guardar-cv-btn').addEventListener('click', function() {
        toggleEditMode(false);
        guardarCV();
    });

    function toggleEditMode(editMode) {
        const textElements = document.querySelectorAll('.document p');
        const inputElements = document.querySelectorAll('.edit-input');

        if (editMode) {
            textElements.forEach(el => el.style.display = 'none');
            inputElements.forEach(el => el.style.display = 'block');
        } else {
            textElements.forEach(el => el.style.display = 'block');
            inputElements.forEach(el => el.style.display = 'none');
        }
    }

    function guardarCV() {
        const cv = {
            proyectos: document.getElementById('proyectos-input').value,
            experiencia: document.getElementById('experiencia-input').value,
            carrera: document.getElementById('carrera-input').value,
            habilidades: document.getElementById('habilidades-input').value,
            objetivos: document.getElementById('objetivos-input').value,
            cursos: document.getElementById('cursos-input').value,
            descripcion: document.getElementById('descripcion-input').value,
            pasatiempos: document.getElementById('pasatiempos-input').value,
            puesto: document.getElementById('puesto-input').value,
        };
        
        const actURL = 'https://otros-d07g.onrender.com/api/actualizarCV/' + valorCookie;
        fetch(actURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cv)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Datos guardados:', data);
        })
        .catch(error => {
            console.error('Error al guardar los datos:', error);
        });

        actualizarCV(cv);  // Actualiza la vista con los nuevos datos
    }
});
