<template>
	<div style="position: relative;">

		
			<form class="formContainer" @submit.prevent="enviar" >

				<i @click="hideMe()" class="bi bi-x btnCerrar d-xl-block d-lg-block  d-md-block d-sm-none d-none"></i>

				<div class="form-group">
					<label for="name">TITULO DEL TEMPLANTE</label>
					<input v-model="adding.name" type="text" class="form-control" id="name" placeholder="" required>
				</div>

					<div class="form-row">
					<div class="form-group col-md-6">
						<label for="inputOrigen">ORIGEN</label>

						<select v-model="adding.startPlaceId" id="inputTracker" class="form-control" required>
							<option :value="place.id" v-for=" (place, index) in placesList" :key="index">
								{{place.name}}
							</option>
						</select>

					</div>

					<div class="form-group col-md-6">
						<label for="inputDestino">DESTINO</label>

						<select v-model="adding.endPlaceId" id="inputTracker" class="form-control" required>
							<option :value="place.id" v-for=" (place, index) in placesList" :key="index">
								{{place.name}}

							</option>
						</select>

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
					<label for="inputNota">NOTA</label>
					<textarea v-model="adding.note" class="form-control" id="inputNota" rows="3"></textarea>
				</div>

				<div class="text-center mb-1">
					<button type="submit" >CREAR TEMPLANTE</button>
				</div>

        <div v-if="adding.saved">

          <h1 class="text-center">{{adding.sms}}</h1> 
        </div>

			</form>

	</div>

</template>

<script setup>

	import { ref, defineEmits, onMounted } from 'vue'; //defineProps
	import { crearTemplate, placeList } from './DataConector.js'


const adding=ref({
  name:"",
  startPlaceId:null,
  endPlaceId:null,
  departureDue:null, //"2024-06-03T22:44
  arrivalDue:null,//"2024-06-03T22:44"
  note:"",
  saved:false,
  sms:"",

  hash: window.$cookies.get('authorized').user.hash,
  userId: window.$cookies.get('authorized').user.id,
	clientId: window.$cookies.get('authorized').user.clientId
})

let placesList=ref([
{
			id: null,
			name: "",
			lat: 18.4872049,
			lng: -69.95793343,
			radius: null,
			address: ""
}
])



function consultarPlaces(){
	
	placeList(window.$cookies.get('authorized').user.hash).then(respPlaces=>{
		
		if (respPlaces.list) {
			
			try{
				//console.log(respPlaces)
				placesList.value=respPlaces.list
			
			}catch(err){
				console.log(err)
			}
		}else{
			console.log("No se pudo consultar Places")
		}
	})
}



function enviar(){

	if (window.$cookies.isKey('authorized')){

		crearTemplate(adding.value).then(resAddTemplate=>{

			if (resAddTemplate.message) {
				adding.value.saved=true
				adding.value.sms=resAddTemplate.message
			}else{
				adding.value.saved=true
				adding.value.sms="No se Guardaron Datos"

			}

			setTimeout(()=>{
				hideMe()
				gotoTemplates()
			},2000)

		})


	}else{
			adding.value.saved=true
			adding.value.sms="Logueate Por Favor"
		setTimeout(()=>{
		window.location.replace("./");
		},2000)
	}
}


function hideMe(){
	outGoingData('cerrar');
}

function gotoTemplates(){
	outGoingData('ir',3);
}

/* const incomingData = defineProps({
  in_places: Object,
}) */

const outGoingData = defineEmits(
	['cerrar','ir']
	)



onMounted(async () => {
	consultarPlaces()
})

</script>

<style scoped>

.btnCerrar{
	float: right; 
	cursor: pointer; 
	margin-top: -15px; 
	font-size: 30px;
}

.formContainer{
	padding: 40px;
	background: white;
	border-radius: 15px 15px 15px 15px;
	box-shadow: rgba(0, 0, 0, 0.49) 0px 0px 30px 10px;
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