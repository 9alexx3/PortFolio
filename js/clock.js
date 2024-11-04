// Crear una vez los formateadores para evitar recrearlos en cada ejecución
const dateFormatter = new Intl.DateTimeFormat("es-ES", {
	day: "2-digit",
	month: "2-digit",
	year: "numeric",
});
  
const longDateFormatter = new Intl.DateTimeFormat("en-GB", {
	weekday: 'long',
	day: 'numeric',
	month: 'long',
	year: 'numeric',
});
  
const timeFormatter = { hour: '2-digit', minute: '2-digit' };
  
const updateClock = () => {
	const now = new Date();

	// Actualizar el contenido en los elementos HTML
	document.getElementById('clock').textContent = now.toLocaleTimeString('es-ES', timeFormatter);
	document.getElementById('date').textContent = dateFormatter.format(now);
	document.getElementById('time').setAttribute('data-description', longDateFormatter.format(now));

	// Calcular los milisegundos restantes hasta el próximo minuto exacto
	const millisecondsToNextMinute = (60 - now.getSeconds()) * 1000;

	setTimeout(updateClock, millisecondsToNextMinute);
};

updateClock();