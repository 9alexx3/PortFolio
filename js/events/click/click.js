const powershell = document.getElementById('powershell');
const powershell_button = document.getElementById('PowerShell-Icon');

// Mostrar el menú al hacer clic en el botón
powershell_button.addEventListener("click", (e) => {
    e.stopPropagation();
    if (!powershell.classList.contains('show')) {
        powershell.classList.remove('hide');  // Eliminar cualquier clase de ocultación
        powershell.classList.add('show');  // Añadir clase para mostrar
    }
});

// Ocultar el menú al hacer clic fuera de él
document.addEventListener("click", (e) => {
    if (!e.target.closest("#powershell") && !e.target.closest("#PowerShell-Icon") && powershell.classList.contains('show')) {
        powershell.classList.remove('show');  // Remover clase de mostrar
        powershell.classList.add('hide');  // Añadir clase de ocultación
    }
});
