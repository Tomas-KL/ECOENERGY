document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Obtener valores del formulario
    const nombre = document.getElementById('nombre').value.trim();
    const resena = document.getElementById('resena').value.trim();
    
    // Validación simple
    if (!nombre || !resena) {
        alert('Por favor, completa todos los campos.');
        return;
    }
    
    // Validación adicional - mínimo de caracteres para la reseña
    if (resena.length < 10) {
        alert('Por favor, escribe una reseña de al menos 10 caracteres.');
        return;
    }
    
    // Simulación de envío
    alert('¡Gracias por tu reseña, ' + nombre + '! Tu opinión es muy importante para nosotros.');
    
    // Limpiar formulario
    this.reset();
});