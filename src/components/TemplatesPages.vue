<template>

	<div>


	<div v-if="view.showingBinding"  class="popContainer d-xl-block d-lg-block  d-md-block d-sm-none d-none">
		<BindingPage :in_places="places_List" :in_template="template_Out" class="popFormContainer" />					
	</div>

	<div  v-for=" (dato, index) in template_In" :key="index"  class="containerTemplates">
		<div class="rows">
			<div class="row">
				<div class="col-md-5">

					<div class="contRowTitle">

						<div @click="bindTracker(dato)" class="text-center iconoContainerTitle">
						<i class="bi bi-person-plus"></i>
						<div class="title_text">ASIGNAR</div>
							
						</div>

						<div class="tituloContainer">
						<div>
							<div class="title_temp">TITULO DEL TEMPLANTE:</div>
							<div class="title_text">{{dato.name}}</div>	
						</div>

						<div style="height: 20px;">
							
						</div>
						<div class="title_temp nota">NOTA: <span>{{dato.note}}</span></div>
							
						</div>
					</div>					
				</div>

			<div class="col-md-7">
				<div class="row">
					<div class="col-md-10 details">

						<div class="contenido">
							<div>ORIGEN:</div>
							<label>{{get_places_Label(dato.startPlaceId)}}</label>
							<div>DESTINO:</div>
							<label>{{get_places_Label(dato.endPlaceId)}}</label>
						</div>
						<div class="contenido">
							<div>SALIDA:</div>
							<label>{{getTimeAndDate(dato.departureDue)}}</label>
							<div>LLEGADA:</div>
							<label>{{getTimeAndDate(dato.departureDue)}}</label>
						</div>
					</div>

					<div class="col text-center iconoPro">
						<div class="d-xl-block d-lg-block  d-md-block d-sm-none d-none">
							<button  style="border: none; background: transparent;" data-toggle="dropdown" >
          <i class="bi bi-sliders"></i>
        </button>

        <div class="text-center dropdown-menu" >
          <a class="dropdown-item" href="#">Action</a>
          <div class="dropdown-divider"></div>
          <a  class="dropdown-item" href="#">Ocultar Trayecto</a>
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
import { temp_findTemplates  } from './DataConector.js' 

const view=ref({
	showingBinding:false
})

const places_List =ref( new Map())

let template_In= ref([
{
	id:null,
	clientId:null,
	userId:null,
	name:"",
	startPlaceId:null,
	endPlaceId:null,
	departureDue: "2020-06-04T02:44:57Z",
	arrivalDue: "2020-06-04T02:44:57Z",
	note:""
}
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
	note:""
}
])


temp_findTemplates("hash").then(res_templateList=>{

	if (res_templateList) {

			template_In.value=res_templateList

	}else{
		console.log("No se pudo Cargar Template List")
	}
})


function get_places_Label(placeId){

	try{

		const detailsPlace=places_List.value.get(placeId)
		/*console.log(`se Convirtio PlaceId ${PlaceId} to String`)*/
		return `${detailsPlace.name} : ${detailsPlace.address}`
	}catch{
		// console.log(`No se Convirtio PlaceId ${PlaceId} (ERROR)`)
		return placeId
	}
}

function getTimeAndDate(isoDate){
	try{
		// console.log(`se Convirtio isoDate ${isoDate} to Date`)

		const dateOut=new Date(isoDate)
		return dateOut.toLocaleString()

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
})


onMounted(async () => {

	places_List.value=incomingData.in_places

})

	
</script>

<style scoped>

	.popContainer {

  position: absolute;
  min-width: 800px;
  height: auto;
  left: 50%;
  transform: translateX(-50%);
  top: 10%;
  z-index: 2;

}


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
	.containerTemplates{
		width: 100%;
		padding-top: 10px;

	}

	.title_text{
		font-weight: 710;
		color: #283469;

	}


	.iconoContainerTitle{
		padding: 20px;
		cursor: pointer;
	}


	.contRowTitle i{
	font-size: 45px;
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