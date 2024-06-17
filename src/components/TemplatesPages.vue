<template>

	<div v-if="view.showingBinding"  class="popContainer d-xl-block d-lg-block  d-md-block d-sm-none d-none">
		<BindingPage class="popFormContainer" />					
	</div>

	<div class="containerTemplates">
		<div class="rows">
			<div class="row">
				<div class="col-md-5">

					<div class="contRowTitle">

						<div @click="bindTracker()" class="text-center iconoContainerTitle">
						<i class="bi bi-person-plus"></i>
						<div class="title_text">ASIGNAR</div>
							
						</div>

						<div class="tituloContainer">
						<div>
							<div class="title_temp">TITULO DEL TEMPLANTE:</div>
							<div class="title_text">NOEL LORA LLEVAR COMIDA A SU CASA DESPUES DEL TRABAJO.</div>	
						</div>

						<div style="height: 20px;">
							
						</div>
						<div class="title_temp nota">NOTA: <span> test1 de la texteada</span></div>
							
						</div>
					</div>					
				</div>

			<div class="col-md-7">
				<div class="row">
					<div class="col-md-10 details">

						<div class="contenido">
							<div>ORIGEN:</div>
							<label>RES. COLINAS DEL SEMINARIO V, PROL. CALLE LA PELONA MANZ. A, SANTO DOMINGO 10606 </label>
							<div>DESTINO:</div>
							<label>RES. COLINAS DEL SEMINARIO V, PROL. CALLE LA PELONA MANZ. A, SANTO DOMINGO 10606</label>
						</div>
						<div class="contenido">
							<div>SALIDA:</div>
							<label>17/6/2024, 11:22:29</label>
							<div>LLEGADA:</div>
							<label>17/6/2024, 11:22:29</label>
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

</template>

<script setup>

import BindingPage from './BindingPage.vue'
import { ref } from 'vue'

const view=ref({
	showingBinding:false
})


	function bindTracker(tracker_id){

		console.log(tracker_id)

		view.value.showingBinding=true
}

	
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