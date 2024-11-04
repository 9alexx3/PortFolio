const warning = document.getElementById('warning-accept');

warning.addEventListener("click", () => {

    const audio = new Audio('../../audios/W11-StartUp.mp3')
    audio.play();
    
    warning.parentElement.parentElement.style.visibility = "hidden";
    warning.parentElement.parentElement.style.display = "none";
});