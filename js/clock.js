const get_Time = () => {
    const today = new Date();
    const date = new Date().toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });


    const long_date = new Intl.DateTimeFormat("en-GB", {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format(today)  

    const time = today.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });

    document.getElementById('clock').textContent = time;
    
    document.getElementById('date').textContent = date;

    document.getElementById('time').setAttribute('data-description', long_date);
    setTimeout(get_Time, 60000);

}
  
get_Time();