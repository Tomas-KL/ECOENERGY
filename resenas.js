function cargarResenas() {
    fetch("http://localhost/ecoenergy/backend/get_reviews.php")
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById("resenas");
            container.innerHTML = "";
            if (!Array.isArray(data) || data.length === 0) {
                container.innerHTML = "<p>No hay reseñas disponibles.</p>";
                return;
            }
            data.forEach(resena => {
                const div = document.createElement("div");
                div.className = "review-card";
                div.innerHTML = `
                    <p class="review-text">"${resena.content}"</p>
                    <p class="reviewer-name">- ${resena.name}</p>
                    <p class="review-date">${new Date(resena.created_at).toLocaleDateString('es-ES')}</p>
                `;
                container.appendChild(div);
            });
        })
        .catch(err => {
            document.getElementById("resenas").innerHTML = "<p>Error al cargar reseñas.</p>";
        });
}
window.onload = cargarResenas;