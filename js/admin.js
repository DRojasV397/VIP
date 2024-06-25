document.addEventListener('DOMContentLoaded', function () {
    cargarUsuarios();

    // Inicialización de particles.js
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

    // Función para actualizar las partículas en respuesta al scroll
    function updateParticles(scrollPos) {
        Particles.particles.forEach(p => {
            p.x += 0.1;  // Ejemplo: movimiento horizontal constante
            p.y += 0.1;  // Ejemplo: movimiento vertical constante
        });

        Particles.draw(); // Vuelve a dibujar las partículas
    }

    let isScrolling = false;

    // Efecto de parallax al hacer scroll
    window.addEventListener('scroll', function() {
        let scrollTop = window.scrollY;
        let parallax = document.querySelector('.background');
        parallax.style.transform = 'translateY(' + scrollTop * 1 + 'px)';
    });

});



function cargarUsuarios() {
    fetch('https://otros-d07g.onrender.com/api/getAllUsers')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener los datos de los usuarios.');
            }
            return response.json();
        })
        .then(data => {
            mostrarUsuarios(data);
        })
        .catch(error => {
            console.error('Error al cargar usuarios:', error);
        });
}

function mostrarUsuarios(usuarios) {
    const listaUsuarios = document.getElementById('usuarios-lista');
    
    usuarios.forEach(usuario => {
        const usuarioDiv = document.createElement('div');
        usuarioDiv.classList.add('usuario');

        const usuarioHeader = document.createElement('div');
        usuarioHeader.classList.add('usuario-header');
        if(usuario.cv[0])
            usuarioHeader.innerHTML = `
                <span>${usuario.nombre} ${usuario.apellidos}</span>
                <span>${usuario.cv[0].puesto}</span>
                <span>${usuario.numero}</span>
                <span>${usuario.correo}</span>
            `;
        else
            usuarioHeader.innerHTML = `
                <span>${usuario.nombre} ${usuario.apellidos}</span>
                <span>${usuario.numero}</span>
                <span>${usuario.correo}</span>
            `;
        usuarioHeader.addEventListener('click', function () {
            this.parentElement.querySelector('.usuario-body').classList.toggle('active');
        });

        const usuarioBody = document.createElement('div');
        usuarioBody.classList.add('usuario-body');
        if(usuario.cv[0]){
            usuarioBody.innerHTML = `
                <p><strong>Proyectos:</strong> ${usuario.cv[0].proyectos}</p>
                <p><strong>Experiencia:</strong> ${usuario.cv[0].experiencia}</p>
                <p><strong>Carrera:</strong> ${usuario.cv[0].carrera}</p>
                <p><strong>Habilidades:</strong> ${usuario.cv[0].habilidades}</p>
                <p><strong>Objetivos:</strong> ${usuario.cv[0].objetivos}</p>
                <p><strong>Cursos:</strong> ${usuario.cv[0].cursos}</p>
                <p><strong>Descripción:</strong> ${usuario.cv[0].descripcion}</p>
                <p><strong>Pasatiempos:</strong> ${usuario.cv[0].pasatiempos}</p>
            `;
        }
        else{
            usuarioBody.innerHTML = `
                <p><strong>El usuario no ha llenado su CV</strong></p>
            `;
        }
        

        usuarioDiv.appendChild(usuarioHeader);
        usuarioDiv.appendChild(usuarioBody);
        listaUsuarios.appendChild(usuarioDiv);
    });
}
