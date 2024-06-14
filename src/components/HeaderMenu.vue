<template>
	<div>

			<div class="barraContainer">
				<div class="border rounded-pill"></div>
			</div>

			<div class="ledContainer">
				<div class="row">
					<div class="col-9" style="margin-top: auto; margin-bottom: auto;">

						<div class="contCircle">
							<div>
								<i class="bi bi-circle-fill">
									<span>ENTREGADOS</span>
								</i>
								<br>
								<div class="espacio"></div>
								<i class="bi bi-circle-fill"> 
									<span>EN TRANSITO</span>
								</i>
							</div>

							<div>
								<i class="bi bi-circle-fill">
									<span>FUERA DE SERVICIO</span>
								</i>
								<br>
								<div class="espacio"></div>
								<i class="bi bi-circle-fill">
									<span>EXPIRADOS</span>								
								</i>
							</div>

							<div>
								<i class="bi bi-circle-fill">
									<span>PROGRAMADOS</span>
								</i>
								<br>
								<div class="espacio"></div>
								<i class="bi bi-circle-fill">
									<span>TARDIOS</span>
								</i>
							</div>

						</div>


					</div>
					<div class="col text-center">
						<label class="porcentGrande">80%</label>
						<br>
						<label class="textoPorcentGrande">SHUTTER ENTREGADOS</label>
					</div>
				</div>
				<div class="searchContainer">

					<div class="search divisor">
						<i class="bi bi-search"></i>
						<span>SHUTTER</span>
						<i class="bi bi-caret-down-fill"></i>
					</div>

					<input type="text" placeholder="BUSCAR... ">
				</div>
			</div>

		<div class="shutterList">
			<ShuttersList />
		</div>

	</div>

</template>

<script setup>

import ShuttersList from './ShuttersList.vue' //
</script>

<style scoped>

.barraContainer {
	width: 100%;
	cursor: pointer; 
	height: 48px; 
	padding: 10px;
}

.barraContainer div {
	height: 100%; 
	background: #283469
}

.ledContainer .contCircle{
/*	background: red;*/
	display: flex;
	flex-wrap: wrap;
	flex-direction: row;
	justify-content: space-around;

}


.ledContainer .contCircle i{
	color: #283469;
}

.ledContainer .contCircle span{
	color: #adaeb2;
	padding-left: 8px;
}


.ledContainer .contCircle .espacio{
	width: 100%;
	height: 10px;
}

.ledContainer .porcentGrande{
	color: #283469;
	font-weight: bold;
	font-size: 45px;
	margin: 0px;
	margin-bottom: -10px;
	margin-top: -10px;

}

.ledContainer .textoPorcentGrande{
	color:  #adaeb2;
	font-weight: 610;
}




.ledContainer .searchContainer{
	background: white;
	border-radius: 15px 15px 15px 15px;
	margin-top: 17px;
	padding: 20px;
	width: 100%;
	display: flex; 
}

.ledContainer .searchContainer .search {
	height: 100%;
}


.ledContainer .searchContainer .search span{
	padding-left: 10px;
	padding-right: 5px;
	color: #283469;
	font-weight: 610;
}

.ledContainer .searchContainer  .search i{
	color: #9a9ea9;
	cursor: pointer; 
}

.divisor{
	padding-right:20px;
	padding-left: 10px;

	border-right: 2px solid #e2e5e7;	
}


.ledContainer .searchContainer input{
	border:none;
	padding-left: 20px;
	outline: none !important;
}

.shutterList{
	height: 100%;
}

</style>