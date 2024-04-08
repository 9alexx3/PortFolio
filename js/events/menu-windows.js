const menu = document.getElementById('menu-windows');
const menu_windows = document.getElementById('menu-windows-container');

document.addEventListener("click", (e) => {
    if(!e.target.closest("#menu-windows"))
    
    if (!e.target.closest("#menu-windows")) {
        console.log('HIDDEN')
        menu.style.visibility = "hidden";
    }else{
        menu.style.visibility = "visible";
    }
})

menu_windows.addEventListener("click", () => {
    console.log('ESTO SE EJECUTA MENU-WINDOWS.JS')
    menu.style.visibility = "";
    menu.style.visibility = "visible";
})