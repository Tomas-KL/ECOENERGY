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
            
            // Contar totales
            const totalResenas = data.length;
            const resenasVisibles = data.filter(resena => resena.visible == 1).length;
            const resenasOcultas = data.filter(resena => resena.visible == 0).length;
            
            // Actualizar estadísticas en el DOM
            const total = document.getElementById("total_resenas");
            const visibles = document.getElementById("visibles_resenas");
            const invisibles = document.getElementById("invisibles_resenas");
            
            if (total) {
                total.innerText = totalResenas;
            }
            if (visibles) {
                visibles.innerText = resenasVisibles;
            }
            if (invisibles) {
                invisibles.innerText = resenasOcultas;
            }

            data.forEach((resena, index) => {
                const tr = document.createElement("tr");
                tr.innerHTML = `
                    <td class="col-id">${String(index + 1).padStart(3, '0')}</td>
                    <td class="col-name">
                        <input type="text" id="name-${resena.id}" value="${resena.name}" class="input-edit">
                    </td>
                    <td class="col-review">
                        <div class="message-cell">
                            <textarea id="content-${resena.id}" class="textarea-edit">${resena.content}</textarea>
                        </div>
                    </td>
                    <td class="col-date">
                        <div class="date-cell">${new Date(resena.created_at).toLocaleDateString('es-ES')}</div>
                    </td>
                    <td class="col-visibility">
                        <select id="visible-${resena.id}" class="status-selector ${resena.visible == 1 ? 'status-visible' : 'status-hidden'}">
                            <option value="1" ${resena.visible == 1 ? 'selected' : ''}>Sí</option>
                            <option value="0" ${resena.visible == 0 ? 'selected' : ''}>No</option>
                        </select>
                    </td>
                    <td class="col-actions">
                        <div class="actions-container">
                            <button onclick="updateReview(${resena.id})" class="btn-save">Guardar</button>
                            <button class="btn-delete" onclick="eliminarResena(${resena.id})">Eliminar</button>
                        </div>
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

async function updateReview(id) {
    const name = document.getElementById(`name-${id}`).value;
    const content = document.getElementById(`content-${id}`).value;
    const visible = document.getElementById(`visible-${id}`).value;

    const formData = new FormData();
    formData.append("id", id);
    formData.append("name", name);
    formData.append("content", content);
    formData.append("visible", visible);

    try {
        const response = await fetch("http://localhost/ecoenergy/backend/admin_update_reviews.php", {
            method: "POST",
            body: formData
        });

        const result = await response.json();
        if (result.status === "success") {
            alert("Reseña actualizada correctamente.");
            // Actualizar las clases CSS del select según el nuevo estado
            const selectElement = document.getElementById(`visible-${id}`);
            if (visible == 1) {
                selectElement.className = 'status-selector status-visible';
            } else {
                selectElement.className = 'status-selector status-hidden';
            }
        } else {
            alert("Error al actualizar: " + result.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert("Error de conexión al actualizar la reseña");
    }

    cargarResenasAdmin(); // recargar
}

window.onload = cargarResenasAdmin;