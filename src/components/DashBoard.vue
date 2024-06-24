<template>

	<div style="display: flex; width: 100%;" >

		<div class="d-xl-block d-lg-block  d-md-block d-sm-none d-none menu">
<!-- class="text-center" -->
			<div  class="text-center logo"  href="/dashboard">

				<div class="centered-element">
					<img src="../assets/auroraLogob.png" style="width: 80%;" alt="Logo">
				</div>

				
			</div>

			<div >
				<ul class="nav nav-pills flex-column mb-auto" style="	margin-top: 20%; ">

					<li @click="showHomeViewPage()" class="menuTitles">
						<div :class="{ pestanaActual: view.homeView }" class="seleccionContainer"></div>
						<div class="titleContainer">
							<div :class="{ pestanaActualTexto: view.homeView }" class="centered-element texto">HOME</div> 							
						</div>
					</li>

					<li @click="showShutterServicePage()" class="menuTitles">
						<div :class="{ pestanaActual: view.shutterService || view.showingAsignarShutter}" class="seleccionContainer"></div>
						<div class="titleContainer">
							<div :class="{ pestanaActualTexto: view.shutterService || view.showingAsignarShutter}" class="centered-element texto">SHUTTERS</div>							
						</div>
 
					</li>
					<li @click="showtemplatePage()" class="menuTitles">
						<div :class="{ pestanaActual: view.template}" class="seleccionContainer"></div>
						<div class="titleContainer">
							<div :class="{ pestanaActualTexto: view.template}" class="centered-element texto">TEMPLATES</div>
						</div> 
					</li>

					<li @click="showReportesPage()" class="menuTitles">
						<div :class="{ pestanaActual: view.reportes}" class="seleccionContainer"></div>
						<div class="titleContainer">
							<div :class="{ pestanaActualTexto: view.reportes}" class="centered-element texto"> REPORTES</div>							
						</div>

					</li>
				</ul>
			</div>

		</div>
	
		<div class="areaTrabajo">

			<div class="text-right headerMenu" href="/dashboard">

				<div class="btnContainer">
					<div class="centered-element btns">
						<i class="bi bi-person-circle"></i> <span class="user">NOEL LORA</span>
						<i class="bi bi-bell-fill"></i> <span @click="salir" class="logut">SIGN OUT</span>
					</div>
				</div>
			</div>

			<div class="d-xl-none d-lg-none d-md-none d-sm-block d-block mt-2" style="width: 100%;">

				<div class="mobileView_container">

					<div @click="mobiShowShuttersPage()" :class="{ mobiMenuSelected: view.mobiShutters}" class="mobileView_Menu text-center">
						SHUTTERS
					</div>
<!-- 					<div @click="mobiShowtemplatePage()" :class="{ mobiMenuSelected: view.mobiTemplates}" class="mobileView_Menu text-center">
						TEMPLATES
					</div> -->
					<div @click="mobiAsignarPage()" :class="{ mobiMenuSelected: view.mobiAsignar}" class="mobileView_Menu text-center">
						ASIGNAR
					</div>

					<div @click="mobiShowAddTemplatePage()" :class="{ mobiMenuSelected: view.mobiAddTemplate}" class="mobileView_Menu text-center">
						CREAR
					</div>
				</div>

			</div>

			<div class="mainContainer">

				<div class="view_header">

<!-- --------------------- <<< HEAD vistas PC >>>>--------------------------->

					<div class=" d-xl-block d-lg-block d-md-block d-sm-none d-none title_view">{{view.title}}</div>
					<div @click="btnFunction()" class=" d-xl-block d-lg-block d-md-block d-sm-none d-none btnTemplate text-center">{{view.btn}}</div>
<!-- --------------------- <<< FIN HEAD vistas PC >>>>--------------------------->

				</div>

				<div v-if="view.homeView" class="d-xl-block d-lg-block d-md-block d-sm-none d-none">

					<HeaderMenu />

					<div class="containerShutter">
						<div class="title_views">SHUTTERS</div>
						<div class="subtitle">TIEMPO Y DISTANCIAS ESTIMADAS DE LLEGADA</div>
						<div class="listContainer">
							<ShuttersTables :in_places="places_List" :in_templates="template_List"  />
						</div>
					</div>
				</div>
<!-- :in_trackers="trackers_List" -->
				<ShuttersTables :in_places="places_List" :in_templates="template_List"  v-if="view.shutterService" class="d-xl-block d-lg-block  d-md-block d-sm-none d-none fullPage" />

				<TemplatesPages v-if="view.template" :in_places="places_List" />

				
				<div v-if="view.showingAsignarShutter"  class="d-xl-block d-lg-block  d-md-block d-sm-none d-none">
					<TemplatesPages :in_places="places_List" />				
				</div>

				<div v-if="view.showingAddTemplate"  class="popContainer d-xl-block d-lg-block  d-md-block d-sm-none d-none">

				<NuevoTemplate  @cerrar="hideAddTemplate" :in_places="places_List" class="popFormContainer" />			
			
				</div>

				<ReportesPage v-if="view.reportes" />

			</div>

			<div class="d-xl-none d-lg-none  d-md-none d-sm-block d-block mobilebody">

				<ShuttersTables v-if="view.mobiShutters" :in_places="places_List" :in_templates="template_List" />
<!-- 				<TemplatesPages v-if="view.mobiTemplates" :in_places="places_List" class="mobileFormContainer" /> -->
				<TemplatesPages v-if="view.mobiAsignar" :in_places="places_List" class="mobileFormContainer" />
				<NuevoTemplate  v-if="view.mobiAddTemplate"  :in_places="places_List" class="mobileFormContainer" />
				
			</div>

		</div>

	</div>
</template>

<script setup>
	import { ref } from 'vue'
	import HeaderMenu from './HeaderMenu.vue' 
	import ShuttersTables from './ShuttersTables.vue'
	import NuevoTemplate from './NuevoTemplate.vue'
	import TemplatesPages from './TemplatesPages.vue'
	import ReportesPage from './ReportesPage.vue'
	import { placeList , temp_findTemplates, logout } from './DataConector.js' 



	const view=ref({
		homeView:true,
		shutterService:false,
		template:false,
		reportes:false,

		mobiShutters:true,
		mobiTemplates:false,
		mobiAsignar:false,
		mobiAddTemplate:false,

		title:"DASHBOAR GENERAL",
		btn:"CREAR TEMPLANTE",
		btn_acction:1,
		showingAddTemplate:false,
		showingAsignarShutter:false
	})

	const places_List =ref( new Map());
/*	const trackers_List =ref( new Map());*/
	const template_List= ref(new Map());

	function hideAddTemplate(){
		view.value.showingAddTemplate=false
	}
/*
//----------<<<  trackers consult   >>----------
	tracker(window.$cookies.get('authorized').user.hash).then(respTrackers=>{

		if (respTrackers) {
			try{

			}
			respTrackers.list.forEach(elemTracker=>{
				trackers_List.value.set(elemTracker.id, elemTracker)
			})
		}else{
			console.log("ocurrio un Error al cargar places")
		}
	});//----------<<< FIN  trackers consult   >>----------*/



//----------<<<  temp_findTemplates consult   >>----------
	temp_findTemplates(window.$cookies.get('authorized').user.hash).then(res_templateList=>{

	if (res_templateList) {

		try{

			res_templateList.forEach(elem_template=>{

				if (elem_template.id) {
					template_List.value.set(elem_template.id, elem_template)
				}else{
					console.log("No existe elemento alguno")
				}
			})

		}
		catch(errr){
			console.log(errr)
		}
	}else{
		console.log("No se pudo Cargar Template List")
	}
})//----------<<< FIN  temp_findTemplates consult   >>----------


//----------<<<  temp_placeList consult   >>----------
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
	});//----------<<< FIN temp_placeList consult   >>----------


//----------<<<  FUNCIONES DE VISTAS >>----------
	function showHomeViewPage(){
		view.value.title="DASHBOAR GENERAL"
		view.value.btn="CREAR TEMPLANTE"
		view.value.btn_acction=1
		view.value.homeView = true
		view.value.shutterService = false
		view.value.template = false
		view.value.reportes = false
		view.value.showingAddTemplate=false
		view.value.showingAsignarShutter=false
	}

	function showShutterServicePage(){
		view.value.title="SHUTTERS"
		view.value.btn="ASIGNAR NUEVO SERVICIO SHUTTERS"
		view.value.btn_acction=2
		view.value.homeView = false
		view.value.shutterService = true
		view.value.template = false
		view.value.reportes = false
		view.value.showingAddTemplate=false
		view.value.showingAsignarShutter=false

	}

	function showtemplatePage(){
		view.value.title="TEMPLATES"
		view.value.btn="CREAR TEMPLANTE"
		view.value.btn_acction=3
		view.value.homeView = false
		view.value.shutterService = false
		view.value.template = true
		view.value.reportes = false
		view.value.showingAddTemplate=false
		view.value.showingAsignarShutter=false
	}

	function showReportesPage(){
		view.value.title="REPORTES"
		view.value.btn="VER MAS"
		view.value.btn_acction=4

		view.value.homeView = false
		view.value.shutterService = false
		view.value.template = false
		view.value.reportes = true
		view.value.showingAddTemplate=false
		view.value.showingAsignarShutter=false

	}

	function mobiShowShuttersPage(){

		view.value.mobiAddTemplate=false
		view.value.mobiShutters = true
		view.value.mobiTemplates=false
		view.value.mobiAsignar=false
	}

	function mobiAsignarPage(){

		view.value.mobiAsignar=true
		view.value.mobiAddTemplate=false
		view.value.mobiTemplates=false
		view.value.mobiShutters = false

	}

/*	function mobiShowtemplatePage(){

		view.value.mobiAddTemplate=false
		view.value.mobiTemplates=true
		view.value.mobiShutters = false
		view.value.mobiAsignar=false

	}
*/
	function mobiShowAddTemplatePage(){

		view.value.mobiTemplates=false
		view.value.mobiAddTemplate=true
		view.value.mobiShutters = false
		view.value.mobiAsignar=false
	}


	function btnFunction(){

		switch (view.value.btn_acction) {
		case 1:
			addTemplate();
			break;
		case 2:
			asignarShutt();
			break;
		case 3:
			addTemplate();
			break;
		default:
			console.log(`No se hara nada`);
			break;
		}

	}

	function addTemplate(){
		console.log("Creando un TEMP")
		view.value.showingAddTemplate=true
	}

	function asignarShutt(){
		console.log("Creando un Shutter")
		view.value.shutterService=false
		view.value.showingAsignarShutter=true
	}//----------<<< FIN FUNCIONES DE VISTAS >>----------

	function salir(){
		try{
			logout(window.$cookies.get('authorized').user.hash).then(res_logout=>{
				if (res_logout) {
					if(res_logout.success){
						console.log(res_logout)  
						window.$cookies.remove('authorized') 
						window.location.replace("./");
					}else{
						console.log("NO SE PUDO DESLOGUEAR")
					}
				}else{
					console.log("No se Pudo hacer Logout")
				}
			})
		}catch(error){
			console.log(error)
		}
	}
	
</script>

<style scoped>

	@import url('./styles/tablaHome.css');
	@import url('./styles/mobile.css');

.view_header {
	display: flex; 
	justify-content: space-between;
	width: 100%;
	position: relative;
}

.view_header .title_view{
	color: #283469;
	font-weight: 610;
}

.view_header .btnTemplate{
  background: #283469; 
  cursor: pointer; 
  color: white;
  padding: 7px;
  min-width: 200px;
  font-weight: 610;
  border-radius: 15px 15px 15px 15px;
}

.menu{
	width: 250px;
	background: white;
}

.menu .logo{
	position:relative; 
	height: 80px;
	cursor: pointer; 
	width: 100%;
}

.areaTrabajo{
	width: 100%; 
	background: #dfe9e8; 
	height: 100vh;
}

.areaTrabajo .headerMenu {
	background: #22356a;
	height: 80px; 
	width: 100%;
}

.areaTrabajo .headerMenu .btnContainer{
	position: relative;
	color: white;
	height: 100%;
}

.areaTrabajo .headerMenu .btnContainer .btns{
	right: 40px;
}

.areaTrabajo .headerMenu .btnContainer .btns .logut{
	margin-left: 30px;
	cursor: pointer;
}

.areaTrabajo .headerMenu .btnContainer .btns .user{
	margin-right: 30px;
}

.menuTitles {
	cursor: pointer; 
	position: relative;
	min-height: 60px;
	display: flex;
	width: 100%;
}

 .menuTitles .seleccionContainer{
	width: 10%;
/*	background-color: blue;*/
}

.menuTitles .selected{

}

.fullPage{
	max-height: 80vh;
	margin-top: 10px;
	overflow: auto;
}

/* width */
::-webkit-scrollbar {
  width: 10px;
}


/* Handle */
::-webkit-scrollbar-thumb {
  background: #283469;
  border-radius: 10px;
}

.menuTitles:hover{
	.seleccionContainer {
		background: #283469;
	} 
	.titleContainer .texto {
		color: #283469;
	}
}

.pestanaActual {
		background: #283469;
}

.pestanaActualTexto {
	color: #283469 !important;
}

.menuTitles .titleContainer{
	position: relative;
	width: 100%;
}

.menuTitles .titleContainer .texto{
	padding-left: 20px;
	color: #adaeb2;
	font-weight: 610;

}

.mainContainer{

	padding-top: 30px;
	padding-left: 40px;
	padding-right: 50px;
	padding-bottom: 20px;
	position: relative;
	height: auto;

}
.centered-element {
  margin: 0;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

  .templateContainer {
  /* background-color: #1e1f24; */
/*  position: absolute;
  left: 0px;
  background: red;
  top: 20%;
  right: 0px;
  bottom: 0px;*/
  position: relative;
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

.popContainer {

  position: absolute;
  min-width: 800px;
  height: auto;
  left: 50%;
  transform: translateX(-50%);
  top: 10%;
  z-index: 2;

}

</style>