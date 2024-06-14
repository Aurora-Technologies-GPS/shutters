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
						<div :class="{ pestanaActual: view.homeView}" class="seleccionContainer"></div>
						<div class="titleContainer">
							<div :class="{ pestanaActualTexto: view.homeView}" class="centered-element texto">HOME</div> 							
						</div>
					</li>

					<li @click="showShutterServicePage()" class="menuTitles">
						<div :class="{ pestanaActual: view.shutterService}" class="seleccionContainer"></div>
						<div class="titleContainer">
							<div :class="{ pestanaActualTexto: view.shutterService}" class="centered-element texto">SHUTTERS</div>							
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
						<i class="bi bi-bell-fill"></i> <span class="logut">SIGN OUT</span>
					</div>
				</div>
			</div>

			<div class="mainContainer">

				<div class="view_header">
					<div class="title_view">{{view.title}}</div>
					<div @click="btnFunction()" class="btnTemplate text-center">{{view.btn}}</div>
				</div>

<!-- 				<div v-if="view.showingAddTemplate_Temp" class="popContainer d-xl-block d-lg-block  d-md-block d-sm-none d-none">
					<NuevoTemplate class="popFormContainer" />					
				</div> -->


				<HeaderMenu v-if="view.homeView" class="d-xl-block d-lg-block  d-md-block d-sm-none d-none" />

				<ShuttersTables v-if="view.shutterService" class="d-xl-block d-lg-block  d-md-block d-sm-none d-none fullPage" />

				<div v-if="view.showingAddTemplate"  class="popContainer d-xl-block d-lg-block  d-md-block d-sm-none d-none">
					<NuevoTemplate class="popFormContainer" />					
				</div>

			</div>

			<div class="d-xl-none d-lg-none  d-md-none d-sm-block d-block">
				<ShuttersTables v-if="view.homeView && !view.showingAddTemplate" />
			</div>

			<div v-if="view.showingAddTemplate" class="d-xl-none d-lg-none  d-md-none d-sm-block d-block">
				<NuevoTemplate/>
			</div>

		</div>

	</div>
</template>

<script setup>
	import { ref } from 'vue'
	import HeaderMenu from './HeaderMenu.vue' 
	import ShuttersTables from './ShuttersTables.vue'
	import NuevoTemplate from './NuevoTemplate.vue'




	const view=ref({
		homeView:true,
		shutterService:false,
		template:false,
		reportes:false,
		title:"DASHBOAR GENERAL",
		btn:"CREAR TEMPLANTE",
		btn_acction:1,
		showingAddTemplate:false
	})

	function showHomeViewPage(){
		view.value.title="DASHBOAR GENERAL"
		view.value.btn="CREAR TEMPLANTE"
		view.value.btn_acction=1
		view.value.homeView = true
		view.value.shutterService = false
		view.value.template = false
		view.value.reportes = false
		view.value.showingAddTemplate=false
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
	}

	function showReportesPage(){
		view.value.homeView = false
		view.value.shutterService = false
		view.value.template = false
		view.value.reportes = true
		view.value.showingAddTemplate=false

	}

	function btnFunction(){

		switch (view.value.btn_acction) {
		case 1:
			addTemplate();
			break;
		case 2:
			console.log("Creando un Shutter")
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
		view.value.showingAddTemplate=true
	}

	
</script>

<style scoped>

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