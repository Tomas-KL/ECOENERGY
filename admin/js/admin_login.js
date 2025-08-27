// Verificar si ya está logueado al cargar la página
if (sessionStorage.getItem('usuario') === 'admin') {
    window.location.href = 'tabla.html'; // Redirige al panel si ya está logueado
}

// Credenciales del administrador
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin123';

// Función para manejar el login
function handleLogin(event) {
    event.preventDefault(); // Previene el envío normal del formulario
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');
    
    // Verificar credenciales
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        // Login exitoso
        sessionStorage.setItem('usuario', 'admin');
        errorMessage.textContent = '';
        alert('¡Bienvenido Administrador!');
        window.location.href = 'tabla.html';
    } else {
        // Login fallido
        errorMessage.textContent = 'Usuario o contraseña incorrectos';
        errorMessage.style.color = 'red';
        
        // Limpiar campos
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
    }
}

// Agregar evento al formulario cuando la página cargue
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
});

// Permitir login con Enter
document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        handleLogin(e);
    }
});