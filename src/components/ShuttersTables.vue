<template>
	<div style=" padding-right: 10px;">

    <div v-if="view.deleted" class="popEliminado text-center">
      <h3>{{view.deletedsms}}</h3>
    </div>

      <h2 v-if="view.listadoVacio" 
        class="text-center" > {{view.listadoVacioSms}}       
      </h2>

			<div v-else v-for=" (dato, index) in serviceShutters_In" :key="index" >

        <div class="card">
          <div class="card-header"  :style="{background: getStatus(dato.ss.statusId).color}" style="border-radius: 15px 15px 0px 0px;" >

        <button style="float: right; border: none; background: transparent;" data-toggle="dropdown" >
          <i class="bi bi-sliders"></i>
        </button>

        <div class="dropdown-menu" >
          <a class="dropdown-item" href="#">Action</a>
          <div class="dropdown-divider"></div>
          <a @click="eliminarShutter(dato.ss.id)" class="dropdown-item" href="#">Cancelar Trayecto</a>
        </div>

            <div class="header_status">
              <div><strong>{{ `${dato.ss.name} : ${dato.ss.trackerId}` }}</strong></div>
              <div class="d-xl-none d-lg-none  d-md-none d-sm-block d-block">
                    {{dato.ss.created}}
                  </div>
              <div> {{ getStatus(dato.ss.statusId).label }}
                <i class="ubication bi bi-geo-alt-fill"></i>
              </div>

            </div>






          </div>
          <div class="card-body">
            <div  style=" display: flex;  flex-direction: row-reverse;">


              <div  style="width:25%;">

                <div class="form-row">
                  <div class="form-group col-md-6 col-sm-12" style="margin-top:auto; margin-bottom: auto;">



                    <div style="display: flex;">



                      <div  class="d-xl-block d-lg-block d-md-block d-sm-none d-none" style="padding-right: 10px; padding-left: 10px; background-color:white; position: relative;">

                        <div style="background-color: #e7eeee; padding: 40px; border-radius: 50px 50px 50px 50px; position: relative;">

                        <div style="position: absolute; top: 11px; right: 19px; color: #283469;  font-weight: bold;  font-size: 35px;">{{timeConverter(dato.ss.timeRemain)}}</div>

                        <img style="position: absolute; width: 25px; bottom: 0px; right: 0px;" src="../assets/etaBola.png">
                      </div>
                      </div>


                      <div style="margin-left: auto; margin-right: auto;">

                        <div class="text-center">

                          <div class="tituloGris">RESTANTE</div>
                          <div class="titulosAzulBold">{{ distanceConverter(dato.ss.distanceRemain) + " KM" }} </div>

                        </div>

                        <div class="text-center">
                          <div class="tituloGris">LLEGADA</div>
                          <div class="titulosAzulBold" >{{timeLlegadaConverter(dato.ss.timeRemain)}}</div>

                        </div>

                      </div>

                    </div>


                  </div>

                  <div class="form-group col-md-6  d-xl-block d-lg-block d-md-block d-sm-none d-none" style="border-left: solid 1px; border-color: #80808030; min-width: 160px;">

                    <div style="font-size: 9px;">DATOS SUMINISTRADOS POR EL CLIENTE</div>

                    <div style="display: flex; flex-wrap: wrap;">

                    <div>
                    <div class="titulosAzulBold">SALIDA</div>
                 
                    <div class="tituloGris" >{{new Date(dato.ss.schDepTime).toLocaleString()}}</div>
                      
                    </div>

                    <div>

                    <div class="titulosAzulBold">LLEGADA</div>
    
                    <div class="tituloGris">{{new Date(dato.ss.schArrTime).toLocaleString()}}</div>
                      
                    </div>
                      
                    </div>
                  </div>
                </div>

              </div>

              <div  style="width:75%; position: relative; margin-top: auto; margin-bottom: auto;">
                <div class="col-12" style="font-size:14px; color: #bcbab9;">
                  {{ dato.startPlace.name}}

                </div>

                <div class="progress " role="progressbar" aria-label="Example with label" aria-valuenow="25"
                  aria-valuemin="0" aria-valuemax="100">

                  <div class="estado d-xl-block d-lg-block  d-md-block d-sm-none d-none">
                    {{"activo: "+fake.ultimaConexion }}
                  </div>
      
                  <div  class="progress-bar progress-bar-striped progress-bar-animated"
                    :style="{width:(dato.ss.completed || 0)+'%'}">{{ (dato.ss.completed || 0) +"%"}}</div>
                </div>
                <div class="col-12" style="text-align: right; font-size:14px; color: #bcbab9; ">
                  {{ dato.endPlace.name }}

                </div>

              </div>

            </div>

          </div>

        </div>
        <br>
      </div>



 



  </div>
</template>

<script setup>

  import { ref, onMounted } from 'vue'; //defineProps
  import { find_Service_Shuttle, deleteShutter } from './DataConector.js'
  import { getStatus, ten } from './utils.js'


let updater=ref()
//clearInterval(updater.value);

  let fake={
    ultimaConexion:new Date().toLocaleString()
  }

const view=ref({
  deleted:false,
  deletedsms:"",
  listadoVacio:true,
  listadoVacioSms:"No Hay Ningun Shutter"
})



         



  let serviceShutters_In= ref([
  {
    ss: {
      id: null,
      name: "",
      shuttleTemplateId: null,
      clientId: null,
      userId: null,
      trackerId: null,
      schDepTime: "2000-07-01T10:00:00.000-0400",
      schArrTime: "2000-07-01T10:30:00.000-0400",
      startPlaceId: null,
      endPlaceId: null,
      statusId: null,
      created: "2000-07-01T11:58:06.516-0400",
      distance: null,
      distanceRemain: null,
      travelTime: null,
      timeRemain: null,
      completed: null
    },
    startPlace: {
      id: null,
      clientId: null,
      name: "",
      lat: 18.4872049,
      lng: -69.95793343,
      radius: null
    },
    endPlace: {
      id: null,
      clientId: null,
      name: "",
      lat: 18.46658296,
      lng: -69.95625968,
      radius: null
    }
  },
] )

function eliminarShutter(id){
  deleteShutter(window.$cookies.get('authorized').user.hash,id).then(respDelete=>{

        if (respDelete) {
        view.value.deleted=true
        view.value.deletedsms=respDelete
        consultarServicesList()

    }else{
        view.value.deleted=true
        view.value.deletedsms="No se pudo Cancelar"

      }

      setTimeout(()=>{
        
        view.value.deleted=false
        view.value.deletedsms=""
      },2000)
  })

}

  //------------------serviceShutters_In-------------------
function consultarServicesList(){

  find_Service_Shuttle(window.$cookies.get('authorized').user.hash).then(respServiceShuuter=>{

    if (respServiceShuuter) {

      try{

        if (respServiceShuuter== 'Not registers found') {
          view.value.listadoVacio=true
          view.value.listadoVacioSms=respServiceShuuter
          
        } else {
          view.value.listadoVacio=false
          view.value.listadoVacioSms="No Hay Ningun Shutter"
          serviceShutters_In.value=respServiceShuuter
          
        }

      }catch(err){
        console.log(err)
      }

    }else{
      console.log("No se pudo consultar find_Service_Shuttle")
    }


  })
}

function timeConverter(timeRemain){

  let timeConvertered=0


  try{

    timeRemain=timeRemain || 0

    timeConvertered=ten(Math.round(timeRemain /60)) 

    return timeConvertered 

  }catch(err){
    console.log(err)
    return timeConvertered
  }

}

function timeLlegadaConverter(segundos){

  let timeLlegadaConvertered=0

  try{
    segundos=segundos || 0

    let manana=new Date(new Date().getTime()+segundos*1000)
    timeLlegadaConvertered=manana.toLocaleTimeString('en-US')

    return timeLlegadaConvertered

  }catch(err){
    console.log(err)
    return timeLlegadaConvertered
  }

}

function distanceConverter(distanceRemain){


  let distanceConvertered=0

  try{

    distanceRemain=distanceRemain || 0

    distanceConvertered=Math.round(distanceRemain).toLocaleString('es-419')

    return distanceConvertered

  }catch(err){
    console.log(err)
    return distanceConvertered
  }

}


/* const incomingData = defineProps({
  in_trackers: Object,
  in_templates: Object,
  in_places: Object,
}) */


onMounted(async () => {

consultarServicesList()

updater.value =setInterval(()=>{ 
    consultarServicesList()

  console.log('Me Actualizo Cada 15 segundos') 
},15000)


})

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Truculenta:opsz,wght@12..72,100..900&display=swap');

.card{
		border-radius: 18px 18px 18px 18px;
}
.btn-circle.btn-xl {
  width: auto;
  height: 100%;
  border-radius: 50%;
  font-size: 12px;
  align-items: center;
  text-align: center;
  position: relative;
  background-color: #606060;
  color: white;
}

.titulosAzulBold{
  color: #2f2f44; 
  font-weight: 610;
  font-size:12px; 
}

.tituloGris{
  font-size:12px; 
  color: #bcbab9;
  font-weight: 600;
}

.popEliminado {
  /* background-color: #1e1f24; */
  background-color: white;
  position: absolute;
  /* color: white; */
  color: black;
  width: 30%;
  min-height: 40%;
  left: 50%;
  transform: translateX(-50%);
  top: 30%;
  padding: 50px;
  border-radius: 15px 15px 15px 15px;
  z-index: 2;
  box-shadow: rgba(0, 0, 0, 0.49) 0px 0px 30px 10px;
}




.login {
  text-align: center;


}

.ubication:hover {
  cursor: pointer;
}



.card {
  box-shadow: rgba(0, 0, 0, 0.49) 5px 2px 5px 0px;
}


.estado {
  position: absolute;
  top: 0px;
  left: 40%;
}

.header_status {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-around;
}

.header_status strong {
  float: left;
}

.popContainer {
  /* background-color: #1e1f24; */
  background-color: white;
  position: absolute;
  /* color: white; */
  color: black;
  width: 50%;
  min-height: 40%;
  left: 50%;
  transform: translateX(-50%);
  top: 20%;
  border-radius: 15px 15px 15px 15px;
  z-index: 2;
  box-shadow: rgba(0, 0, 0, 0.49) 0px 0px 30px 10px;
}
</style>
