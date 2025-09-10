// Verificar si ya está logueado al cargar la página
if (sessionStorage.getItem('usuario') === 'admin') {
    window.location.href = 'tabla.html'; // Redirige al panel si ya está logueado
}
// Función para manejar el login
 async function handleLogin(event) {
    event.preventDefault(); // Previene el envío normal del formulario
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');
    
  try {
    const res = await fetch("http://localhost/ECOENERGY/backend/login.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json()
    document.getElementById("mensaje").innerText = data.message;
    
    if (data.success) {
        document.getElementById("mensaje").style.color = "green";
        sessionStorage.setItem('usuario', 'admin');
        window.location.href = 'tabla.html';
    } else {
        document.getElementById("mensaje").style.color = "red";
    }
} catch (error) {
      console.log(error);
    document.getElementById("mensaje").innerText = "Error de conexión con el servidorjmmm.";
    document.getElementById("mensaje").style.color = "red";
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




