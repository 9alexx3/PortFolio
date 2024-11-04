console.log(navigator)
// navigator.permissions
// SOLO SI ES EDGE

const getBattery = () => {

  if (!navigator.getBattery) {
    (async () => {
      // Carga el polyfill dinámicamente
      var { default: batteryPolyfill } = await import('https://unpkg.com/battery-api-polyfill@2.0.1/dist/battery-api-polyfill.min.js');
      // Registra el polyfill
      batteryPolyfill.register();
  
      // Ahora puedes usar la API de batería
      var battery = await navigator.getBattery();
  
      console.log(battery.level); // Imprime el nivel de la batería
    })();
  } else {
    console.log('HOLI DESDE BATTERY.JS');
  }
  

  navigator.getBattery().then((battery) => {
    console.log(battery)
    const { charging, chargingTime, dischargingTime, level } = battery
  
    
    if(level){
      total_battery = level * 100
    }
  
    console.log(`Battery: ${total_battery}%`)
    console.log(`Charging: ${charging ? 'Yes' : 'No'}`)
    console.log(`Time to charge: ${chargingTime/1000}`)
    console.log(`Time to discharge: ${dischargingTime/1000}`)
})
.catch(e => console.error(e));
}

getBattery()