console.log(navigator)
// navigator.permissions
// 

const getBattery = () => {

  if (!navigator.getBattery) {
    (async () => {
      // Carga el polyfill dinámicamente
      const { default: batteryPolyfill } = await import('https://unpkg.com/battery-api-polyfill@2.0.1/dist/battery-api-polyfill.min.js');
      // Registra el polyfill
      batteryPolyfill.register();
  
      // Ahora puedes usar la API de batería
      const battery = await navigator.getBattery();
  
      console.log(battery.level); // Imprime el nivel de la batería
    })();
  } else {
    console.log('HOLI DESDE BRAVE');
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