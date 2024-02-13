const get_Time = () => {
    const today = new Date();
    const time = today.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
    document.getElementById('txt').textContent = time;
    setTimeout(startTime, 60000);
  }
  
get_Time();