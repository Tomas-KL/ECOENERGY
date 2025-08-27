// Verificar autenticación al cargar la página
if (sessionStorage.getItem('usuario') !== 'admin') {
    alert('Acceso denegado. Solo los administradores pueden acceder a esta página.');
    window.location.href = '../index.html';
}

// Función para cerrar sesión
function cerrarSesion() {
    if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
        sessionStorage.removeItem('usuario');
        alert('Sesión cerrada exitosamente');
        window.location.href = '../index.html';
    }
}

// Verificar sesión periódicamente (cada 30 segundos)
setInterval(function() {
    if (sessionStorage.getItem('usuario') !== 'admin') {
        alert('Tu sesión ha expirado. Serás redirigido al inicio.');
        window.location.href = '../index.html';
    }
}, 30000);