const warning = document.getElementById('warning-accept');

warning.addEventListener("click", () => {

    const audio = new Audio('../../audios/W11-StartUp.mp3')
    audio.play();
    
    warning.parentElement.parentElement.style.visibility = "hidden";
    warning.parentElement.parentElement.style.display = "none";
});


// Selecciona todos los elementos con clase "close"
const closeButtons = document.querySelectorAll('.close');

// Añade el evento de clic a cada botón "close"
closeButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Obtén el elemento abuelo del botón y ocúltalo
        const grandparent = button.parentElement.parentElement.parentElement;
        if (grandparent) {
            grandparent.classList.toggle('show')
            grandparent.classList.toggle('hidden')
        }
    });
});
