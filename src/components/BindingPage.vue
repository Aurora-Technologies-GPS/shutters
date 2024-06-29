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
						<input v-model="adding.inputdepTime" class="form-control datepicker" name="from" placeholder="Selected starting date" type="datetime-local"  />
					</div>

					<div class="form-group col-md-6">
						<label for="inputLlegada">TIEMPO DE LLEGADA</label>
						<input  v-model="adding.inputArrTime" class="form-control datepicker" name="from" placeholder="Selected starting date" type="datetime-local"  />
					</div>
				</div>

				<div class="form-group">
					<label for="name">Dispositivo</label>

						<select v-model="adding.trackerId" id="inputTracker" class="form-control" required>
							<option :value="track.id" v-for=" (track, index) in trackersList.list" :key="index">
								{{track.label}}
							</option>
						</select>

				</div>

				<div class="text-center mb-1">
					<button class="Disabled" type="submit" >ASIGNAR</button>
				</div>

        <div v-if="adding.saved">

          <h1 class="text-center">{{adding.sms}}</h1> 
        </div>

			</form>

	</div>

</template>

<script setup>
	import { ref, defineProps, defineEmits, onMounted } from 'vue';
	import { tracker, placeList , crearServiceShuttle } from './DataConector.js' // aqui
	import { getTimeAndDate} from './utils.js'

let adding=ref({
	hash: window.$cookies.get('authorized').user.hash,
  name:"",
  shuttleTemplateId:null,
  trackerId:null,
  startPlaceId:null,
	endPlaceId:null,
	inputdepTime: null, //"2017-06-01T08:30",
	inputArrTime: null, //getTimeAndDate(isoDate),
  schDepTime:null, // "2024-06-29T10:00:00.000-0400"
	schArrTime: null, //"2024-06-29T10:00:00.000-0400",
  saved:false,
  sms:" "
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

function consultarTrackers(){
	
	tracker(window.$cookies.get('authorized').user.hash).then(inTrackersList=>{
	if (inTrackersList) {

		// console.log(inTrackersList)

			trackersList.value=inTrackersList
	}else{
			console.log("No se pudo cargar Trackers")
	}

})

}
consultarTrackers()

function consultarPlaces(){
	placeList(window.$cookies.get('authorized').user.hash).then(respPlaces=>{

if (respPlaces) {

	try{
		respPlaces.list.forEach(elemPlace=>{

			if (elemPlace.id) {
				places_List.value.set(elemPlace.id, elemPlace)
			}else{
				console.log("no existe tal")
			}
		})

	}catch(err){
		console.log(err)
	}
}else{
	console.log("ocurrio un Error al cargar places")
}
});

}

consultarPlaces()





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


function enviar(){

	adding.value.schDepTime=adding.value.inputdepTime
	adding.value.schArrTime=adding.value.inputArrTime



	crearServiceShuttle(adding.value).then(respAddServiceShutter=>{

		//console.log(respAddServiceShutter)


		if (respAddServiceShutter) {
			adding.value.saved=true
			adding.value.sms=respAddServiceShutter

			gotoshutters()

			}else{
				adding.value.saved=true
				adding.value.sms="No se Guardaron Datos"

			}

			setTimeout(()=>{
				adding.value.saved=false
				adding.value.sms=""
			},2000)
	})
}

function hideMe(){
	outGoingData('cerrar');
}


function gotoshutters(){
	outGoingData('ir');
}

const incomingData = defineProps({
  in_template: Object
})
const outGoingData = defineEmits(
	['cerrar', 'ir']
)


onMounted(async () => {
	adding.value.shuttleTemplateId=incomingData.in_template.id
	adding.value.name=incomingData.in_template.name
	adding.value.startPlaceId=incomingData.in_template.startPlaceId
	adding.value.endPlaceId=incomingData.in_template.endPlaceId
	adding.value.inputdepTime=getTimeAndDate(incomingData.in_template.departureDue)
	adding.value.inputArrTime=getTimeAndDate(incomingData.in_template.arrivalDue)
	adding.value.schDepTime=incomingData.in_template.departureDue
	adding.value.schArrTime=incomingData.in_template.arrivalDue
})


</script>

<style scoped>

.formContainer{
	padding: 40px;
	margin-top: 10px;
	margin-bottom: 10px;
	background: white;
	border-radius: 15px 15px 15px 15px;
	box-shadow: rgba(0, 0, 0, 0.49) 0px 0px 20px 5px;
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