const desktop = document.getElementById("desktop");
const footer = document.getElementById("footer");

console.log(footer)
console.log(desktop)


desktop.addEventListener('contextmenu', (e) => {
    e.preventDefault()
    alert('RIGHT CLICK')
    console.log(e)
})

footer.addEventListener('contextmenu', (e) => {
    e.preventDefault()
    alert('RIGHT CLICK')
    console.log(e)
})