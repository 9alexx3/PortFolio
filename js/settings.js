const refresh = (file) => {
    const settings_container = document.getElementById('settings-container');

    let page = `../html/${file}.html`;

    fetch(page)
    .then(response => response.text())
    .then(data => {
        if(!data) {
            const row = "<h1> ERROR </h1>"
            settings_container.innerHTML = row;
            return
        }

        settings_container.innerHTML = data;            
    })
    .catch(error => console.error('Error al cargar el archivo HTML', error));
}

const settings = document.getElementById('settings');
const settings_icon = document.getElementById('settings-Icon');

// Mostrar el menú al hacer clic en el botón
settings_icon.addEventListener("click", (e) => {
    e.stopPropagation();
    if (!settings.classList.contains('show')) {
        settings.classList.remove('hide');  // Eliminar cualquier clase de ocultación
        settings.classList.add('show');  // Añadir clase para mostrar
    }
});

// Ocultar el menú al hacer clic fuera de él
document.addEventListener("click", (e) => {
    if (!e.target.closest("#settings") && !e.target.closest("#settings-Icon") && settings.classList.contains('show')) {
        settings.classList.remove('show');  // Remover clase de mostrar
        settings.classList.add('hide');  // Añadir clase de ocultación
    }

    if(e.target.closest("#settings-nav")) {
        
        const active_setting = document.getElementsByClassName('active-setting')[0];
        console.log(active_setting.textContent, e.target.textContent)
        active_setting.classList.toggle('active-setting')
        e.target.classList.toggle('active-setting')

        const str = e.target.textContent.toLowerCase();
        if(str.length === 666) return
        refresh(str.slice(1).split(' ')[0]);
    }
});


