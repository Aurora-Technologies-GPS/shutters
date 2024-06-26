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
								<i :style="{color: getColor(1)}" class="bi bi-circle-fill">
									<span>PENDING</span>
								</i>
								<br>
								<div class="espacio"></div>
								<i :style="{color: getColor(2)}" class="bi bi-circle-fill"> 
									<span>PRE CHECKING</span>
								</i>
								<br>
								<div class="espacio"></div>
								<i :style="{color: getColor(7)}" class="bi bi-circle-fill"> 
									<span>DONE LATE</span>
								</i>
							</div>

							<div>
								<i :style="{color: getColor(3)}" class="bi bi-circle-fill">
									<span>LATE CHECKING</span>
								</i>
								<br>
								<div class="espacio"></div>
								<i :style="{color: getColor(4)}" class="bi bi-circle-fill">
									<span>WARNING</span>								
								</i>
								<br>
								<div class="espacio"></div>
								<i :style="{color: getColor(8)}" class="bi bi-circle-fill">
									<span>CANCELED</span>								
								</i>
							</div>

							<div>
								<i :style="{color: getColor(5)}" class="bi bi-circle-fill">
									<span>OVERDUE</span>
								</i>
								<br>
								<div class="espacio"></div>
								<i :style="{color: getColor(6)}" class="bi bi-circle-fill">
									<span>DONE IN TIME</span>
								</i>
								<br>
								<div class="espacio"></div>
								<i :style="{color: getColor(9)}" class="bi bi-circle-fill">
									<span>EXPIRED</span>
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

	</div>

</template>

<script setup>
	import { getColor } from './utils.js'

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