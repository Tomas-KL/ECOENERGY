document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Obtener valores del formulario
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const correo = document.getElementById('correo').value;
    const telefono = document.getElementById('telefono').value;
    const comentario = document.getElementById('comentario').value;
    
    // Validación simple
    if (!nombre || !apellido || !correo || !telefono) {
        alert('Por favor, completa todos los campos obligatorios.');
        return;
    }
    
    // Simulación de envío
    alert('¡Gracias por tu solicitud! Te contactaremos pronto para programar tu reunión.');
    
    // Limpiar formulario
    this.reset();
});