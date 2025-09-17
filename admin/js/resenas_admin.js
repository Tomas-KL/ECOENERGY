function cargarResenasAdmin() {
    fetch("http://localhost/ecoenergy/backend/admin_get_reviews.php")
        .then(response => response.json())
        .then(data => {
            const tbody = document.getElementById("resenas_tabla"); // Cambio: obtener tbody correctamente
            tbody.innerHTML = "";
            
            if (!Array.isArray(data) || data.length === 0) {
                tbody.innerHTML = "<tr><td colspan='6'>No hay reseñas disponibles.</td></tr>";
                return;
            }
            
            data.forEach((resena, index) => { // Cambio: usar 'resena' y agregar 'index'
                const tr = document.createElement("tr"); // Cambio: crear 'tr', no 'div'
                tr.innerHTML = `
                    <tr>
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
                            <button class="btn-delete">Eliminar</button>
                        </td>
                    </tr>
                    `;
                
                tbody.appendChild(tr);
            });
    })
}
window.onload = cargarResenasAdmin;