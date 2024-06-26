export function getColor(statusId){

    switch (statusId) {

  case 1:
      return '#e0e0e0' // pending 
      //El servicio de Shuttle no ha iniciado o esta a mas de 15 minutos de iniciar. (gris)          

  case 2: 
     return 'grey' // pre_checkin  
     //15 minutos antes del tiempo de inicio si esta configurado. (gris parpadeando)

  case 3: 
    return 'pink' //late_checkin
    //Si llega el tiempo de inicio del Shuttle y aun no llega al punto de inicio. (rosado)

  case 4:
    return 'green' //IN_TIME
     //Si ya arranco el Shuttle y esta tiempo para su destino. (verde)

  case 5:
    return 'yellow' //warning
     // Si ya arranco el Shuttle pero esta junto +/- ajustado al tiempo de llegada. (amarillo)

  case 6:
    return 'orange' //overdue
     //Si ya arranco el Shuttle, pero esta por encima del 10% del tiempo de llegada. (naranja)

  case 7:
    return 'green' //'done_in_time' 
     // Si fue completado durante el tiempo establecido. (verde con cotejo)
  
  case 8:
    return 'red' //'done_late' 
     //si fue completado luego del tiempo establecido. (rojo con cotejo)

  case 9:
    return 'grey' //'canceled' 
      //Si este fue cancelado por el usuario. (gris con icono bloqueo)

  case 10:
    return 'red' //'expired' 
      //Si el Shuttle no fue completado y sobre paso el tiempo limite por 6 horas. (rojo con icono de X)

  default: 
    return 'grey' //in_time
      //Si ya arranco el Shuttle y esta tiempo para su destino. (verde)
  }
}