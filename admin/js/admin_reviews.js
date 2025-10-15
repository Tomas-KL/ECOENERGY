// Función para formatear la fecha
function formatearFecha(fechaString) {
    const fecha = new Date(fechaString);
    const fechaLocal = fecha.toLocaleDateString('es-ES');
    const horaLocal = fecha.toLocaleTimeString('es-ES', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
    });
    return `${fechaLocal}<br>${horaLocal}`;
}

// Función para cargar las reseñas en la tabla de administrador
function cargarResenasAdmin() {
    fetch("http://localhost/ecoenergy/backend/get_reviews.php")
        .then(response => response.json())
        .then(data => {
            const tbody = document.querySelector('.requests-table tbody');
            const panelStats = document.querySelector('.panel-stats');
            
            // Limpiar tabla
            tbody.innerHTML = "";
            
            if (!Array.isArray(data) || data.length === 0) {
                tbody.innerHTML = "<tr><td colspan='6' style='text-align: center; padding: 20px;'>No hay reseñas disponibles.</td></tr>";
                return;
            }

            // Contadores para estadísticas
            let totalReviews = data.length;
            let visibleReviews = 0;
            let hiddenReviews = 0;
            let todayReviews = 0;
            
            const hoy = new Date().toDateString();

            // Generar filas de la tabla
            data.forEach((resena, index) => {
                const tr = document.createElement('tr');
                
                // Determinar si es visible (puedes ajustar esta lógica según tu base de datos)
                // Por ahora asumo que todas son visibles, pero puedes cambiar esto
                const esVisible = resena.visible !== false; // Ajusta según tu campo en BD
                
                if (esVisible) {
                    visibleReviews++;
                } else {
                    hiddenReviews++;
                }

                // Verificar si la reseña es de hoy
                const fechaResena = new Date(resena.created_at).toDateString();
                if (fechaResena === hoy) {
                    todayReviews++;
                }

                tr.innerHTML = `
                    <td class="col-id">${String(index + 1).padStart(3, '0')}</td>
                    <td class="col-name">
                        <div class="contact-info">${resena.name}</div>
                    </td>
                    <td class="col-review">
                        <div class="message-cell">
                            ${resena.content}
                        </div>
                    </td>
                    <td class="col-date">
                        <div class="date-cell">${formatearFecha(resena.created_at)}</div>
                    </td>
                    <td class="col-visibility">
                        <select class="status-selector ${esVisible ? 'status-visible' : 'status-hidden'}">
                            <option value="yes" ${esVisible ? 'selected' : ''}>Sí</option>
                            <option value="no" ${!esVisible ? 'selected' : ''}>No</option>
                        </select>
                    </td>
                    <td class="col-actions">
                        <button class="btn-delete">Eliminar</button>
                    </td>
                `;
                
                tbody.appendChild(tr);
            });

            // Actualizar estadísticas
            actualizarEstadisticas(totalReviews, visibleReviews, hiddenReviews, todayReviews);
            
            // Actualizar información de paginación
            const paginationInfo = document.querySelector('.pagination-info');
            if (paginationInfo) {
                paginationInfo.textContent = `Mostrando ${totalReviews} de ${totalReviews} reseñas totales`;
            }
        })
        .catch(error => {
            console.error('Error al cargar reseñas:', error);
            const tbody = document.querySelector('.requests-table tbody');
            tbody.innerHTML = "<tr><td colspan='6' style='text-align: center; padding: 20px; color: red;'>Error al cargar reseñas desde la base de datos.</td></tr>";
        });
}

// Función para actualizar las estadísticas en el panel
function actualizarEstadisticas(total, visibles, ocultas, hoy) {
    const statCards = document.querySelectorAll('.stat-card .stat-number');
    
    if (statCards.length >= 4) {
        statCards[0].textContent = total;     // Total
        statCards[1].textContent = visibles;  // Visibles
        statCards[2].textContent = ocultas;   // Ocultas
        statCards[3].textContent = hoy;       // Hoy
    }
}

// Cargar las reseñas cuando se carga la página
window.addEventListener('load', function() {
    // Verificar que estamos en la página correcta
    if (document.querySelector('.requests-table')) {
        cargarResenasAdmin();
    }
});

// También puedes agregar un botón de actualización
document.addEventListener('DOMContentLoaded', function() {
    const btnRefresh = document.querySelector('.btn-refresh');
    if (btnRefresh) {
        btnRefresh.addEventListener('click', function() {
            cargarResenasAdmin();
        });
    }
});