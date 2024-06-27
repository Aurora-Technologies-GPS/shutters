<template>

	<div>

		<div v-if="view.deleted" class="popEliminado text-center">
			<h3>{{view.deletedsms}}</h3>
		</div>

<!--  class="popContainer d-xl-block d-lg-block  d-md-block d-sm-none d-none" -->
	<div v-if="view.showingBinding">

		<BindingPage :in_places="places_List" :in_template="template_Out" class="popFormContainer" @cerrar="hideBinding" />					
	</div>

	<h3 v-if="template_In.length <1" class="text-center" > NO HAY NINGUN TEMPLANTE
	</h3>


	<div v-else v-show="!view.showingBinding"  v-for=" (dato, index) in template_In" :key="index">
		<div class="rows">
			<div class="row">
				<div class="col-md-5">

					<div class="contRowTitle">

						<div @click="bindTracker(dato.st)" class="text-center iconoContainerTitle">
						<i class="bi bi-person-plus"></i>
						<div class="title_text">ASIGNAR</div>
							
						</div>

						<div class="tituloContainer">
						<div>
							<div class="title_temp">TITULO DEL TEMPLANTE:</div>
							<div class="title_text">{{dato.st.name}}</div>	
						</div>

						<div style="height: 20px;">
							
						</div>
<!-- 						<div class="title_temp nota">NOTA: <span>{{dato.note}}</span></div> -->
							
						</div>
					</div>					
				</div>

			<div class="col-md-7">
				<div class="row">
					<div class="col-md-10 details">

						<div class="contenido">
							<div>ORIGEN:</div>
							<label>{{`${dato.startPlace.name} : ${dato.startPlace.address}`}}</label>
							<div>DESTINO:</div>
							<label>{{`${dato.endPlace.name} : ${dato.endPlace.address}`}}</label>
						</div>
						<div class="contenido">
							<div>SALIDA:</div>
							<label>{{getTimeAndDate(dato.st.departureDue)}}</label>
							<div>LLEGADA:</div>
							<label>{{getTimeAndDate(dato.st.arrivalDue)}}</label>
						</div>
					</div>

					<div class="col text-center iconoPro">
						<div class="d-xl-block d-lg-block  d-md-block d-sm-none d-none">
							<button  style="border: none; background: transparent;" data-toggle="dropdown" >
          <i class="bi bi-sliders"></i>
        </button>

        <div class="text-center dropdown-menu" >
          <a class="dropdown-item" href="#">Accion</a>
          <div class="dropdown-divider"></div>
          <a @click="eliminarTemplate(dato.st.id)" class="dropdown-item" href="#">Eliminar Template</a>
        </div>
							
						</div>
					</div>
				</div>
					
				</div>
			</div>
		</div>
	</div>


	</div>

</template>

<script setup>

import BindingPage from './BindingPage.vue'
import { ref, defineProps, onMounted } from 'vue';
import { findTemplates, deleteTemplate  } from './DataConector.js' 

const view=ref({
	showingBinding:false,
	deleted:false,
	deletedsms:""
})

const places_List =ref( new Map())
// const trackers_List =ref( new Map())

let template_In= ref([
/*{
		st: {
			id: null,
			clientId: null,
			userId: 300310,
			startPlaceId: 2117241,
			departureDue: "2024-06-03T22:44:00.000-0400",
			endPlaceId: 2117261,
			arrivalDue: "2024-06-03T22:44:00.000-0400",
			name: "DEIBY LORA LLEVAR JUGO A SU CASA DESPUESs ",
			estimatedTime: 665,
			estimateDistance: 10324
		},
		startPlace: {
			id: 2117241,
			clientId: 300310,
			name: "MI CASA ",
			lat: 18.4872049,
			lng: -69.95793343,
			radius: 50,
			address: "Orquideas, Santo Domingo de Guzmán, Distrito Nacional, República Dominicana, 10132"
		},
		endPlace: {
			id: 2117261,
			clientId: 300310,
			name: "CASA DE NOEL ",
			lat: 18.53096835,
			lng: -69.90716463,
			radius: 122,
			address: "Banca Quisqueya, Avenida Hermanas Mirabal, Villa Mella, Santo Domingo, República Dominicana, 11201"
		}
	}*/
])

let template_Out= ref([{
	id:0,
	clientId:0,
	userId:0,
	name:"",
	startPlaceId:0,
	endPlaceId:2117261,
	departureDue: "",
	arrivalDue: "",
	estimatedTime:null,
	estimateDistance:null

	// note:""
}
])

function hideBinding() {
	consultarTemplates()

	view.value.showingBinding=false

 }

function eliminarTemplate(id){
	deleteTemplate(window.$cookies.get('authorized').user.hash, id).then(resdelete=>{

		if (resdelete) {
				view.value.deleted=true
				view.value.deletedsms=resdelete
				consultarTemplates()

		}else{
				view.value.deleted=true
				view.value.deletedsms="No se pudo Eliminar"

			}

			setTimeout(()=>{
				
				view.value.deleted=false
				view.value.deletedsms=""
			},2000)
	})
}

//----------<<<  temp_findTemplates consult   >>----------

function consultarTemplates(){

	findTemplates(window.$cookies.get('authorized').user.hash).then(res_templateList=>{

	if (res_templateList) {


		try{

			template_In.value=res_templateList

		}catch(err){
			console.log(err)
		}
	}else{
		console.log("No se pudo Cargar Template List")
	}
})

}//----------<<< FIN  temp_findTemplates consult   >>----------



/*function placesInfo(placeId){

	try{
		if (places_List.value.get(placeId).name) {

			return places_List.value.get(placeId)
		}
	}catch(error){
		console.log(error)
		return 	{
			id: 2117241,
			name: placeId,
			lat: 18.4872049,
			lng: -69.95793343,
			radius: 50,
			address: "C/ Lorenzo Despradel #2, La Castellana, Santo Domingo"
		}
	}

}*/




function getTimeAndDate(isoDate){
	try{
		// console.log(`se Convirtio isoDate ${isoDate} to Date`)

		let dateOut=new Date(isoDate).toLocaleString()

		if (dateOut=='Invalid Date') {
			dateOut= 'dd/mm/aaaa --:--'
		}

		return dateOut

	}catch{
		// console.log(`NO se Convirtio isoDate ${isoDate}`)
		return isoDate
	} 
}

function bindTracker(template){
	template_Out.value=template
	view.value.showingBinding=true
}

const incomingData = defineProps({
  in_places: Object,
  // in_trackers: Object,
})


onMounted(async () => {

	places_List.value=incomingData.in_places
	consultarTemplates()
	// trackers_List.value=incomingData.in_trackers

})

	
</script>

<style scoped>


.popFormContainer {
  max-width: 750px;
  height: 100%;
  margin-left: auto; 
  margin-right: auto;
  display: flex;  
	flex-wrap: wrap;
	flex-direction: column;
	justify-content: space-around;

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
  top: 20%;
  padding: 50px;
  border-radius: 15px 15px 15px 15px;
  z-index: 2;
  box-shadow: rgba(0, 0, 0, 0.49) 0px 0px 30px 10px;
}

	.title_text{
		font-weight: 710;
		color: #283469;

	}


	.iconoContainerTitle{
		padding: 20px;
		padding-top: 10px !important;
		cursor: pointer;
	}


	.contRowTitle i{
	font-size: 40px;
	color: #283469;
	}


	.contRowTitle{
		display: flex;

	}

	.tituloContainer{
		padding: 10px;
		border-left: solid 1px;
		border-color: #80808030;
		position: relative;
		display: flex;  
		flex-wrap: wrap;
		flex-direction: column;
		justify-content: space-around;

	}
	.tituloContainer i{
		cursor: pointer;

	}

	.nota{

		position: absolute;
		bottom: 10px;
		height: 20px

	}

	.rows{
		background: white;
		padding: 5px;
		margin-top: 10px;
		border-radius: 10px 10px 10px 10px;
	}

	.title_temp{
		font-size: 10px;
	}

	.details{
		display: flex;  
		flex-wrap: wrap;
		flex-direction: row;
		font-size: 10px;

	}

	.details .contenido{
		padding: 5px;
		border-left: solid 1px;
		border-color: #80808030;
		max-width: 55%;
	}

	.details label{
		font-weight: 700;
		color: #283469;	
	}

	.iconoPro{
	display: flex;  
	flex-wrap: wrap;
	flex-direction: column;
	justify-content: space-around;
	font-size: 35px;
	border-left: solid 1px;
	border-color: #80808030;

	}

	.iconoPro i{
		cursor: pointer;

	}
</style>