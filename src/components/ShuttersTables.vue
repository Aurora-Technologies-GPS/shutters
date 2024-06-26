<template>
	<div style=" padding-right: 10px;">
		<h2 v-if="serviceShutters_In.length<1"  class="text-center" > No Hay Ningun Shutter</h2>
			<div  v-for=" (dato, index) in serviceShutters_In" :key="index" >


        <div class="card">
         <!--  :class="{ important: dato.important }" -->
          <div class="card-header"  :style="{background: getColor(dato.statusId)}" style="border-radius: 15px 15px 0px 0px;" >

        <button style="float: right; border: none; background: transparent;" data-toggle="dropdown" >
          <i class="bi bi-sliders"></i>
        </button>

        <div class="dropdown-menu" >
          <a class="dropdown-item" href="#">Action</a>
          <div class="dropdown-divider"></div>
          <a @click="eliminarShutter(dato.id)" class="dropdown-item" href="#">Cancelar Trayecto</a>
        </div>

            <div class="header_status">
              <div><strong>{{ `${dato.id} ${dato.name} : ${dato.trackerId}` }}</strong></div>
              <div class="d-xl-none d-lg-none  d-md-none d-sm-block d-block">
                    {{dato.created}}
                  </div>
              <div> {{ dato.statusId }}
                <i class="ubication bi bi-geo-alt-fill"></i>
              </div>

            </div>






          </div>
          <div class="card-body">
            <div class="row" style="height: auto">

              <div class=" col-lg-8 col-xl-9 col-md-7 col-sm-8 col-8 "
                style=" position: relative; margin-top: auto; margin-bottom: auto;">
                <div class="col-12" style="font-size:14px; color: #bcbab9;">
                  {{ dato.startPlaceId}}

                </div>

                <div class="progress " role="progressbar" aria-label="Example with label" aria-valuenow="25"
                  aria-valuemin="0" aria-valuemax="100">

                  <div class="estado d-xl-block d-lg-block  d-md-block d-sm-none d-none">
                    {{"activo: "+fake.ultimaConexion }}
                  </div>
      
                  <div  class="progress-bar progress-bar-striped progress-bar-animated"
                    :style="{width:fake.porcentaje+'%'}">{{ fake.porcentaje +"%"}}</div>
                </div>
                <div class="col-12" style="text-align: right; font-size:14px; color: #bcbab9; ">
                  {{ dato.endPlaceId }}

                </div>

              </div>

              <div class="col header_status">
                <button type="button" class="btn btn-circle btn-xl d-xl-block d-lg-block  d-md-block d-sm-none d-none">
                  <span class="tituloBola">{{fake.tiempoRestante}}</span>{{ "Min" }}
                  <img class="etaBT" src="../assets/etaBola.png">
                </button>
              <!--   style="border-right:dashed #bcbab9; padding-right: 20px;" -->
                <div class="text-center" >
                  <span style="font-size:14px; color: #bcbab9;">Restante</span>
                  <br>
                  <span>{{ fake.kilometrosRestantes + " KM" }} </span>
                </div>

                <div class="text-center">
                  <span style="font-size:14px; color: #bcbab9;">llegada </span>
                  <br>
                  <span>{{ fake.horaLLegada }}</span>
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
  import { find_Service_Shuttle, deleteShutter } from './DataConector.js'
  import { getColor } from './utils.js'

  // const trackerList_MAP =ref( new Map())
  const template_List_MAP= ref(new Map());
  const places_List_MAP =ref( new Map())

  let fake={
    porcentaje:50,
    ultimaConexion:new Date().toLocaleString(),
    tiempoRestante:50,
    kilometrosRestantes:60,
    horaLLegada:new Date().toLocaleTimeString()

    // schDepTime: "2024-06-03T22:44:00.000-0400",
    // schArrTime: "2024-06-03T22:44:00.000-0400",
    //created: "2024-06-26T09:32:10.893-0400"
    //trackerId
  }


         



  let serviceShutters_In= ref([/*{
    id: 1,
    name: "Pureba",
    shuttleTemplateId: 1,
    clientId: 300310,
    userId: 300310,
    trackerId: 2935572,
    schDepTime: "2024-06-03T22:44:00.000-0400",
    schArrTime: "2024-06-03T22:44:00.000-0400",
    startPlaceId: 2117241,
    endPlaceId: 2117261,
    statusId: 1,
    created: "2024-06-26T09:32:10.893-0400"
  }*/
  ])

function eliminarShutter(id){
  deleteShutter(window.$cookies.get('authorized').user.hash,id).then(respDelete=>{

    console.log(respDelete)
  })

}

  //------------------serviceShutters_In-------------------
function consultarServicesList(){

  find_Service_Shuttle(window.$cookies.get('authorized').user.hash).then(respServiceShuuter=>{

    if (respServiceShuuter) {

      try{
        serviceShutters_In.value=[]

        respServiceShuuter.forEach(elemServiceList=>{

          if(elemServiceList.id){

            serviceShutters_In.value.push({

              id: elemServiceList.id,
              shuttleTemplateId: elemServiceList.shuttleTemplateId,
              clientId: elemServiceList.clientId,
              userId: elemServiceList.userId,
              trackerId: elemServiceList.trackerId,
              name: elemServiceList.name,
              schDepTime: elemServiceList.schDepTime,
              schArrTime: elemServiceList.schArrTime,
              startPlaceId: elemServiceList.startPlaceId,
              endPlaceId: elemServiceList.endPlaceId,
              statusId: elemServiceList.statusId,
              created: elemServiceList.created,
            })

          }else{
            console.log("No existe Elemento alguno")
          }
        })
      }catch(err){
        console.log(err)
      }

    }else{
      console.log("No se pudo consultar find_Service_Shuttle")
    }


  })


}

  //------------------ FIN serviceShutters_In-------------------

  /*function templateInfo(shuttleId){

    try{

      if (template_List_MAP.value.get(shuttleId).name) {

        console.log(template_List_MAP.value.get(shuttleId))

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



  }*/

  //------------------------------------------------

/*  function trackerInfo(trackerId){

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
*/
//-----------------------------------------------

/*  function placesInfo(placeId){

  try{
    if (places_List_MAP.value.get(placeId).name) {

      return places_List_MAP.value.get(placeId)
    }
  }catch(error){
    console.log(error)
    return  {
      id: 2117241,
      name: placeId,
      lat: 18.4872049,
      lng: -69.95793343,
      radius: 50,
      address: "C/ Lorenzo Despradel #2, La Castellana, Santo Domingo"
    }
  }

}
*/


//------------------------------------------

/*  function etaInfo(ShutterServiceId){
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
  }*/

  const incomingData = defineProps({
  in_trackers: Object,
  in_templates: Object,
  in_places: Object,
})


onMounted(async () => {

  // trackerList_MAP.value=incomingData.in_trackers
  template_List_MAP.value=incomingData.in_templates
  places_List_MAP.value=incomingData.in_places

  consultarServicesList()

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
