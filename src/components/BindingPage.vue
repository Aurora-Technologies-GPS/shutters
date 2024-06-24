<template>
	<div style="position: relative;">
		
			<form class="formContainer" @submit.prevent="enviar" >

				<i @click="hideMe()" class="bi bi-x btnCerrar"></i>

				<div class="form-group">
					<label for="name">TITULO DEL SHUTTER</label>
					<input v-model="adding.name" type="text" class="form-control" id="name" placeholder=" ">
				</div>
				<div class="form-row">
					<div class="form-group col-md-6">
						<label for="inputOrigen">ORIGEN</label>
					<input type="text" class="form-control" id="name" :placeholder="get_places_Label(adding.startPlaceId)" readonly>
					</div>

					<div class="form-group col-md-6">
						<label for="inputDestino">DESTINO</label>
						<input type="text" class="form-control" id="name" :placeholder="get_places_Label(adding.endPlaceId)" readonly>
					</div>
				</div>

				<div class="form-row">
					<div class="form-group col-md-6">
						<label for="inputSalida">TIEMPO DE SALIDA</label>
						<input v-model="adding.departureDue" class="form-control datepicker" name="from" placeholder="Selected starting date" type="datetime-local"  />
					</div>

					<div class="form-group col-md-6">
						<label for="inputLlegada">TIEMPO DE LLEGADA</label>
						<input  v-model="adding.arrivalDue" class="form-control datepicker" name="from" placeholder="Selected starting date" type="datetime-local"  />
					</div>
				</div>

				<div class="form-group">
					<label for="name">Dispositivo</label>

						<select v-model="adding.tracker_id" id="inputTracker" class="form-control" required>
							<option :value="track.id" v-for=" (track, index) in trackersList.list" :key="index">
								{{track.label}}
							</option>
						</select>

				</div>

				<div class="text-center mb-1">
					<button type="submit" >ASIGNAR</button>
				</div>

        <div v-if="adding.saved">

          <h1 class="text-center">Guardado Correctamente</h1> 
        </div>

			</form>

	</div>

</template>

<script setup>
	import { ref, defineProps, defineEmits, onMounted } from 'vue';
	import { tracker } from './DataConector.js'


let adding=ref({
  name:"",
  startPlaceId:null,
  endPlaceId:null,
  departureDue:getTimeAndDate("2020-06-04T02:44:57Z"),
  arrivalDue:getTimeAndDate("2020-06-04T02:44:57Z"),
  tracker_id:null,
  saved:false
})

let trackersList=ref({
	client_id: null,
	list: [
		{
			id: null,
			deviceId: "",
			model: "",
			label: "",
			created: "2020-05-21"
		}
	]
})

tracker(window.$cookies.get('authorized').user.hash).then(inTrackersList=>{
	if (inTrackersList) {

		console.log(inTrackersList)

			trackersList.value=inTrackersList
	}else{
			console.log("No se pudo cargar Trackers")
	}

})


const places_List =ref( new Map())


function get_places_Label(placeId){

	try{

		const detailsPlace=places_List.value.get(placeId)
		/*console.log(`se Convirtio PlaceId ${PlaceId} to String`)*/
		return `${detailsPlace.name} `
	}catch{
		// console.log(`No se Convirtio PlaceId ${PlaceId} (ERROR)`)
		return placeId
	}
}

function getTimeAndDate(isoDate){

try{
		// console.log(`se Convirtio isoDate ${isoDate} to Date`)

		const dateOut=new Date(isoDate)

		return dateOut.toISOString().split('.')[0].substr(0,dateOut.toISOString().split('.')[0].length-3)

	}catch{
		// console.log(`NO se Convirtio isoDate ${isoDate}`)
		return null
	} 


}




function enviar(){

  console.log(adding.value)
  adding.value.saved=true

  setTimeout(()=>{
    //window.location.replace("./dashboard");
  },2000)
}

function hideMe(){
	outGoingData('cerrar');
}

const incomingData = defineProps({
  in_template: Object,
  in_places: Object,
})
const outGoingData = defineEmits(
	['cerrar']
	)


onMounted(async () => {
	adding.value.name=incomingData.in_template.name
	adding.value.startPlaceId=incomingData.in_template.startPlaceId
	adding.value.endPlaceId=incomingData.in_template.endPlaceId
	adding.value.departureDue=getTimeAndDate(incomingData.in_template.departureDue)
	adding.value.arrivalDue=getTimeAndDate(incomingData.in_template.arrivalDue)

	places_List.value=incomingData.in_places


})


</script>

<style scoped>

.formContainer{
	padding: 40px;
	background: white;
	border-radius: 15px 15px 15px 15px;
	box-shadow: rgba(0, 0, 0, 0.49) 0px 0px 30px 10px;
}

.btnCerrar{
	float: right; 
	cursor: pointer; 
	margin-top: -15px; 
	font-size: 30px;
}

.formContainer label{
  color: #283469;
  font-weight: 610;
}



.formContainer button{
  background: #283469; 
  cursor: pointer; 
  color: white;
  padding-top: 5px;
  padding-bottom: 5px;
  min-width: 210px;
  font-weight: 610;
  border-radius: 15px 15px 15px 15px;
}

.formContainer h1{
  color: green;
}

</style>