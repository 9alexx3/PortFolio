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
});