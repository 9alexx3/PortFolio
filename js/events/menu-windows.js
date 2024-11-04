const menu = document.getElementById('menu-windows');
const menu_windows = document.getElementById('menu-windows-Icon');

// Mostrar el menú al hacer clic en el botón
menu_windows.addEventListener("click", (e) => {
    // Evitar que el clic se propague y cierre el menú inmediatamente
    e.stopPropagation();
    if (!menu.classList.contains('show')) {
        menu.classList.remove('hide');  // Asegúrate de que no tenga la clase hide
        menu.classList.add('show');
        menu.style.display = "block";  // Asegúrate de que el menú esté visible
    }
});

// Ocultar el menú al hacer clic fuera de él
document.addEventListener("click", (e) => {
    if (!e.target.closest("#menu-windows-Icon") && menu.classList.contains('show')) {
        menu.classList.remove('show');
        menu.classList.add('hide');

        // Espera que termine la animación para realmente ocultarlo
        setTimeout(() => {
            menu.classList.remove('hide');  // Limpiar clase de ocultar
            menu.style.display = "none";  // Ocultar el menú
        }, 300);  // Tiempo de la animación de cierre
    }
});
