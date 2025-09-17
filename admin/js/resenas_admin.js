function cargarResenasAdmin() {
    fetch("http://localhost/ecoenergy/backend/admin_get_reviews.php")
        .then(response => response.json())
        .then(data => {
            const tbody = document.getElementById("resenas_tabla");
            tbody.innerHTML = "";
            
            if (!Array.isArray(data) || data.length === 0) {
                tbody.innerHTML = "<tr><td colspan='6'>No hay reseñas disponibles.</td></tr>";
                return;
            }
            const total = document.getElementById("total_resenas");
            total.innerText = data.length 

            data.forEach((resena, index) => {
                const tr = document.createElement("tr");
                tr.innerHTML = `
                    <td class="col-id">${String(index + 1).padStart(3, '0')}</td>
                    <td class="col-name">
                        <div class="contact-info">${resena.name}</div>
                    </td>
                    <td class="col-review">
                        <div class="message-cell">
                            "${resena.content}"
                        </div>
                    </td>
                    <td class="col-date">
                        <div class="date-cell">${new Date(resena.created_at).toLocaleDateString('es-ES')}</div>
                    </td>
                    <td class="col-visibility">
                        <select class="status-selector status-visible">
                            <option value="yes" selected>Sí</option>
                            <option value="no">No</option>
                        </select>
                    </td>
                    <td class="col-actions">
                        <button class="btn-delete" onclick="eliminarResena(${resena.id})">Eliminar</button>
                    </td>
                `;
                
                tbody.appendChild(tr);
            });
        })
        .catch(error => {
            console.error('Error al cargar reseñas:', error);
            const tbody = document.getElementById("resenas_tabla");
            tbody.innerHTML = "<tr><td colspan='6'>Error al cargar las reseñas.</td></tr>";
        });
}

window.onload = cargarResenasAdmin;