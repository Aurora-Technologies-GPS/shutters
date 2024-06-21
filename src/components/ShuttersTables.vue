<template>
	<div style=" padding-right: 10px;">
		<h2 v-if="serviceShutters_Out.length<1"  class="text-center" > No Hay Ningun Shutter</h2>
			<div  v-for=" (dato, index) in serviceShutters_Out" :key="index" >


        <div class="card">
         <!--  :class="{ important: dato.important }" -->
          <div class="card-header" >

        <button style="float: right; border: none; background: transparent;" data-toggle="dropdown" >
          <i class="bi bi-sliders"></i>
        </button>

        <div class="dropdown-menu" >
          <a class="dropdown-item" href="#">Action</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#">Ocultar Trayecto</a>
        </div>

            <div class="header_status">
              <div><strong>{{ `${dato.name} : ${dato.trackerLabel}` }}</strong></div>
              <div class="d-xl-none d-lg-none  d-md-none d-sm-block d-block">
                    {{"dato.actualTime"}}
                  </div>
              <div> {{ dato.status }}
                <i class="ubication bi bi-geo-alt-fill"></i>
              </div>

            </div>






          </div>
          <div class="card-body">
            <div class="row" style="height: auto">

              <div class=" col-lg-8 col-xl-9 col-md-7 col-sm-8 col-8 "
                style=" position: relative; margin-top: auto; margin-bottom: auto;">
                <div class="col-12" style="font-size:14px; color: #bcbab9;">
                  {{ dato.origen}}

                </div>

                <div class="progress " role="progressbar" aria-label="Example with label" aria-valuenow="25"
                  aria-valuemin="0" aria-valuemax="100">

                  <div class="estado d-xl-block d-lg-block  d-md-block d-sm-none d-none">
                    {{"activo: "+dato.ultimaConexion }}
                  </div>
      
                  <div  class="progress-bar progress-bar-striped progress-bar-animated"
                    :style="{width:dato.porcentaje+'%'}">{{ dato.porcentaje +"%"}}</div>
                </div>
                <div class="col-12" style="text-align: right; font-size:14px; color: #bcbab9; ">
                  {{ dato.destino }}

                </div>

              </div>

              <div class="col header_status">
                <button type="button" class="btn btn-circle btn-xl d-xl-block d-lg-block  d-md-block d-sm-none d-none">
                  <span class="tituloBola">{{dato.tiempoRestante}}</span>{{ "Min" }}
                  <img class="etaBT" src="../assets/etaBola.png">
                </button>
                <div class="text-center" style="border-right:dashed #bcbab9; padding-right: 20px;">
                  <span style="font-size:14px; color: #bcbab9;">Restante</span>
                  <br>
                  <span>{{ dato.kilometrosRestantes + " KM" }} </span>
                </div>

                <div class="text-center">
                  <span style="font-size:14px; color: #bcbab9;">llegada </span>
                  <br>
                  <span>{{ dato.horaLLegada }}</span>
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

  import { ref, defineProps, onMounted } from 'vue';
  import { temp_find_Service_Shuttle  } from './DataConector.js'

  const trackerList_MAP =ref( new Map())
  const template_List_MAP= ref(new Map());
  const places_List_MAP =ref( new Map())


  let serviceShutters_In= ref([{
    id: null,
    shuttleId: null,
    clientId: null,
    userId: null,
    trackerId: null,
    statusId: null
  }
  ])


  let serviceShutters_Out= ref([{

    id: null,
    shuttleId: null,
    clientId: null,
    userId: null,
    trackerId: null,
    statusId: null,
    trackerLabel: "trackerInfo(trackerId)",
    name:"templateInfo(shuttleId).name",
    origen:"templateInfo(shuttleId).startPlaceId",
    destino:"templateInfo(shuttleId).destino",
    ultimaConexion: etaInfo("id").ultimaConexion,
    porcentaje: etaInfo("id").porcentaje,
    tiempoRestante:etaInfo("id").tiempoRestante,
    kilometrosRestantes: etaInfo("id").kilometrosRestantes,
    horaLLegada: etaInfo("id").horaLLegada,
    status: etaInfo("id").status,
  }
  ])

  //------------------serviceShutters_In-------------------
  temp_find_Service_Shuttle("hash").then(respServiceShuuter=>{
    if (respServiceShuuter) {

      serviceShutters_In.value=respServiceShuuter
      serviceShutters_Out.value=[]
      serviceShutters_In.value.forEach(elemServiceList=>{

        serviceShutters_Out.value.push({
          id: elemServiceList.id,
          shuttleId: elemServiceList.shuttleId,
          clientId: elemServiceList.clientId,
          userId: elemServiceList.userId,
          trackerId: elemServiceList.trackerId,
          statusId: elemServiceList.statusId,
          trackerLabel: trackerInfo(elemServiceList.trackerId).label,
          name:templateInfo(elemServiceList.shuttleId).name,
          origen:placesInfo(templateInfo(elemServiceList.shuttleId).startPlaceId).name,
          destino:placesInfo(templateInfo(elemServiceList.shuttleId).endPlaceId).name,
          ultimaConexion: etaInfo(elemServiceList.id).ultimaConexion,
          porcentaje: etaInfo(elemServiceList.id).porcentaje,
          tiempoRestante:etaInfo(elemServiceList.id).tiempoRestante,
          kilometrosRestantes: etaInfo(elemServiceList.id).kilometrosRestantes,
          horaLLegada: etaInfo(elemServiceList.id).horaLLegada,
          status: etaInfo(elemServiceList.id).status,
        })

      })
    }else{
      console.log("No se pudo consultar find_Service_Shuttle")
    }


  })
  //------------------ FIN serviceShutters_In-------------------

  function templateInfo(shuttleId){

    try{

      if (template_List_MAP.value.get(shuttleId).name) {

        return template_List_MAP.value.get(shuttleId)
      }

    }catch(error){
      console.log(error)

      return {
          id: shuttleId,
          clientId: null,
          userId: null,
          startPlaceId: null,
          departureDue: "2000-06-03T22:44:00.000-0400",
          endPlaceId: shuttleId,
          arrivalDue: "2000-06-03T22:44:00.000-0400",
          name: "No encontro id "+shuttleId

        }
    }

  }

  //------------------------------------------------

  function trackerInfo(trackerId){

    try{
      if (trackerList_MAP.value.get(trackerId).label) {
        return trackerList_MAP.value.get(trackerId)
      }

    }catch(error){
      console.log(error)
      return {
        id: trackerId,
        deviceId: "N/A",
        model: "N/A",
        label: "No encontro el id "+trackerId,
        created: "2000-05-21"
    }
    }

  }

//-----------------------------------------------

  function placesInfo(placeId){

  try{

    if(places_List_MAP.value.get(placeId)){

      return places_List_MAP.value.get(placeId)
    }

  }catch(error){
    console.log(error)
    // console.log(`No se Convirtio PlaceId ${PlaceId} (ERROR)`)
    return placeId+"hoy"
  }
}

placesInfo(1)

//------------------------------------------

  function etaInfo(ShutterServiceId){
    let temp=ShutterServiceId
    temp= " "
    console.log(temp)
    try{

      const output={
        ultimaConexion:new Date().toLocaleString(),
        porcentaje:50,
        tiempoRestante:60,
        kilometrosRestantes:30,
        horaLLegada: new Date().toLocaleTimeString(),
        status: "En Trasito"
      }
      return output
    }catch{
      return ShutterServiceId
    }
  }

  const incomingData = defineProps({
  in_trackers: Object,
  in_templates: Object,
  in_places: Object,
})


onMounted(async () => {

  trackerList_MAP.value=incomingData.in_trackers
  template_List_MAP.value=incomingData.in_templates
  places_List_MAP.value=incomingData.in_places

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

.tituloBola {
  font-size: 40px;
  font-family: "Truculenta", sans-serif;
  font-weight: bold;

}
.important{
  background-color:pink;
}

.etaBT {
  position: absolute;
  right: 8px;
  bottom: -5px;
  width: 31%;
  max-width: 40px
}

.login {
  text-align: center;


}

.ubication:hover {
  cursor: pointer;
}

@media (max-width: 1230px) {
  .btn-circle.btn-xl {
    width: auto;
    height: 70%;
    margin-top: 10%;
    margin-bottom: 10%;
  }

  .tituloBola {
    font-size: 20px;
  }

  .etaBT {
    position: absolute;
    right: 38px;
    bottom: -5px;
    width: 50%;
    max-width: 50px
  }

}


@media (max-width: 730px) {
  .btn-circle.btn-xl {
    width: auto;
    height: 60%;
    margin-top: 20%;
    margin-bottom: 20%;
  }

  .tituloBola {
    font-size: 20px;
  }

  .etaBT {
    position: absolute;
    right: 30px;
    bottom: -5px;
    width: 50%;
    max-width: 50px
  }

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
