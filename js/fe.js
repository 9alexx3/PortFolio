const update = (selectedOption) => {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';

    fetch('./fe.json')
    .then(response => response.json())
    .then((jsonData) => {
        const data = jsonData[selectedOption];
        if(!data) {
            const row = `
                <tr>
                    <td colspan="4" class="empty-row">This folder is empty.</td>
                </tr>`
                tableBody.innerHTML += row;
                return
        }

        data.forEach((item, index) => {
            const row = `
                <tr class="${item.id} fe-main-hover ${index === data.length - 1 ? 'last-row' : ''}">
                    <td class="fe-main-name fe-main-rows">
                        <span class="nova">&#x${item.image};</span>
                        ${item.name}
                    </td>
                    <td class="fe-main-date-type fe-main-rows">${item.dateModified}</td>
                    <td class="fe-main-date-type fe-main-rows">${item.type}</td>
                    <td class="fe-main-date-size fe-main-rows">${item.size}</td>
                </tr>
            `;

            tableBody.innerHTML += row;
        });
    })
    .catch(error => console.error('Error al cargar el archivo JSON', error));
}

// Agregar un evento change al select
document.getElementById('selectChoice').addEventListener('change', function() {
    update(this.value)

});

const nav_file = document.getElementById("click");
nav_file.addEventListener("click", e => {

    // Evita que si se da click en el contedor y que no sea el <li>, lo ignora.
    const option = e.target.textContent.toLowerCase()
    if(option.length === 611) return
    switch (option){
        case "documents":
            update("documents")
            break
        case "recycle bin":
            update()
            break;
        default:
            update(option.slice(1));
            break;
    }
})



const file_explorer = document.getElementById('file-explorer');
const fe_icon = document.getElementById('fe-Icon');

// Mostrar el menú al hacer clic en el botón
fe_icon.addEventListener("click", (e) => {
    e.stopPropagation();
    if (!file_explorer.classList.contains('show')) {
        file_explorer.classList.remove('hide');  // Eliminar cualquier clase de ocultación
        file_explorer.classList.add('show');  // Añadir clase para mostrar
    }
});

// Ocultar el menú al hacer clic fuera de él
document.addEventListener("click", (e) => {
    if (!e.target.closest("#file-explorer") && !e.target.closest("#fe-Icon") && file_explorer.classList.contains('show')) {
        file_explorer.classList.remove('show');  // Remover clase de mostrar
        file_explorer.classList.add('hide');  // Añadir clase de ocultación
    }
});
