document.addEventListener('DOMContentLoaded', function() {
    const perfilInfo = {
        nombre: 'Juan Pérez',
        numero: '123456789',
        correo: 'juan.perez@example.com'
    };

    const perfilUl = document.getElementById('perfil-info');

    for (const [key, value] of Object.entries(perfilInfo)) {
        const li = document.createElement('li');
        li.textContent = `${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`;
        perfilUl.appendChild(li);
    }
});
