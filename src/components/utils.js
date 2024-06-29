export function getStatus(estatusN){

    switch (estatusN) {

  case 1:
      return { label:'PENDING', color:'#e0e0e0' } 
      //El servicio de Shuttle no ha iniciado o esta a mas de 15 minutos de iniciar. (gris)          

  case 2: 
     return  { label:'PRE CHECKING', color:'grey' }  
     //15 minutos antes del tiempo de inicio si esta configurado. (gris parpadeando)

  case 3: 
    return  { label:'LATE CHECKING', color:'pink' } 
    //Si llega el tiempo de inicio del Shuttle y aun no llega al punto de inicio. (rosado)

  case 4:
    return  { label:'IN_TIME', color: 'green' } 
     //Si ya arranco el Shuttle y esta tiempo para su destino. (verde)

  case 5:
    return  { label:'WARNING', color: 'yellow' }  
     // Si ya arranco el Shuttle pero esta junto +/- ajustado al tiempo de llegada. (amarillo)

  case 6:
    return { label:'OVERDUE', color: 'orange' }   
     //Si ya arranco el Shuttle, pero esta por encima del 10% del tiempo de llegada. (naranja)

  case 7:
    return { label:'DONE IN TIME', color: 'green' } 
     // Si fue completado durante el tiempo establecido. (verde con cotejo)
  
  case 8:
    return { label:'DONE LATE', color: 'red' }  
     //si fue completado luego del tiempo establecido. (rojo con cotejo)

  case 9:
    return { label:'CANCELED', color: 'grey' }  
      //Si este fue cancelado por el usuario. (gris con icono bloqueo)

  case 10:
    return { label:'EXPIRED', color: 'red' }  
      //Si el Shuttle no fue completado y sobre paso el tiempo limite por 6 horas. (rojo con icono de X)

  default: 
    return  { label:'IN_TIME', color: 'green' } 
      //Si ya arranco el Shuttle y esta tiempo para su destino. (verde)
  }
}


function  ten (i) {

  return (i < 10 ? '0' : '')+i;

}


export function getTimeAndDate(isoDate){


let dateOut =new Date(isoDate)

const YYYY = dateOut. getFullYear()

const MM = ten(dateOut.getMonth() + 1)
const DD = ten(dateOut.getDate())

const HH = ten(dateOut.getHours())

const II = ten(dateOut.getMinutes())
const SS = ten(dateOut.getSeconds())

dateOut = YYYY + '-'+ MM +'-'+ DD +'T'+ HH +':'+ II+':'+ SS;

return dateOut //"2017-06-01T08:30"

}
