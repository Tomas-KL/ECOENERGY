// Función para eliminar una reseña
function eliminarResena(id) {
    if (confirm('¿Estás seguro de que quieres eliminar esta reseña? Esta acción no se puede deshacer.')) {
        // Crear FormData para enviar el ID
        const formData = new FormData();
        formData.append('id', id);
        
        fetch("http://localhost/ecoenergy/backend/admin_delete_reviews.php", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                alert('Reseña eliminada exitosamente');
                // Recargar la tabla para mostrar los cambios
                cargarResenasAdmin();
            } else {
                alert('Error al eliminar la reseña: ' + (data.message || 'Error desconocido'));
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error de conexión al eliminar la reseña');
        });
    }
}