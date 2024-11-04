const rightClickMenu = document.querySelector('.right-click');

function showContextMenu(event) {
    event.preventDefault();

    // Verificar si el clic ocurrió en el footer o en un elemento con la clase "taskbar"
    if (event.target.id === 'footer' || event.target.classList.contains('taskbar')) {
        // No mostrar el menú si el clic es en el footer o taskbar
        return;
    }

    // Obtener la posición del cursor
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    // Establecer temporalmente el display del menú en 'flex' para calcular su tamaño
    rightClickMenu.style.display = 'flex';

    // Obtener el tamaño del menú contextual
    const menuHeight = rightClickMenu.offsetHeight;
    const menuWidth = rightClickMenu.offsetWidth;

    // Calcular la posición del menú contextual
    let top = mouseY;
    let left = mouseX;

    // Si el menú se sale por la parte inferior, ajustar para que se muestre hacia arriba
    if (mouseY + menuHeight > window.innerHeight) {
        top = mouseY - menuHeight;
    }

    // Si el menú se sale por la parte derecha, ajustar para que se muestre hacia la izquierda
    if (mouseX + menuWidth > window.innerWidth) {
        left = mouseX - menuWidth;
    }

    // Establecer las coordenadas del menú contextual
    rightClickMenu.style.left = `${left}px`;
    rightClickMenu.style.top = `${top}px`;
}

// Ocultar el menú contextual
function hideContextMenu() {
    rightClickMenu.style.display = 'none';
}

// Mostrar el menú contextual en el clic derecho
document.addEventListener('contextmenu', showContextMenu);

// Ocultar el menú contextual en el clic izquierdo
document.addEventListener('click', hideContextMenu);

// Ocultar el menú contextual al cargar la página
window.onload = function() {
    hideContextMenu();
};
