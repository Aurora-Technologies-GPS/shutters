<template>
	<div style=" padding-right: 10px;">

    <div v-if="view.deleted" class="popEliminado text-center">
      <h3>{{view.deletedsms}}</h3>
    </div>

		<h2 v-if="serviceShutters_In.length<1"  class="text-center" > No Hay Ningun Shutter</h2>

      <div v-if="serviceShutters_In[0].ss.id == null" class="text-center">
        {{view.loading}}        
      </div>


			<div v-else v-for=" (dato, index) in serviceShutters_In" :key="index" >


        <div class="card">
         <!--  :class="{ important: dato.important }" -->
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
            <div class="row" style="height: auto">

              <div class=" col-lg-8 col-xl-9 col-md-7 col-sm-8 col-8 "
                style=" position: relative; margin-top: auto; margin-bottom: auto;">
                <div class="col-12" style="font-size:14px; color: #bcbab9;">
                  {{ dato.startPlace.name}}

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
                  {{ dato.endPlace.name }}

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
  import { getStatus } from './utils.js'

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

const view=ref({
  deleted:false,
  deletedsms:"",
  loading:"cargando"
})



         



  let serviceShutters_In= ref([
  {
    "ss": {
      "id": null,
      "name": "",
      "shuttleTemplateId": null,
      "clientId": null,
      "userId": null,
      "trackerId": null,
      "schDepTime": "2024-06-12T11:30:00.000-0400",
      "startPlaceId": null,
      "endPlaceId": null,
      "statusId": null,
      "created": "2024-06-26T12:58:25.551-0400"
    },
    "startPlace": {
      "id": null,
      "clientId": null,
      "name": "",
      "lat": 18.4872049,
      "lng": -69.95793343,
      "radius": null
    },
    "endPlace": {
      "id": null,
      "clientId": null,
      "name": "",
      "lat": 18.46658296,
      "lng": -69.95625968,
      "radius": null
    }
  },
  ])

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
        serviceShutters_In.value=respServiceShuuter
      }catch(err){
        console.log(err)
      }

    }else{
      console.log("No se pudo consultar find_Service_Shuttle")
    }


  })
}


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
