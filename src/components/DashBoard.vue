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

					<li class="menuTitles">
						<div class="seleccionContainer"></div>
						<div class="titleContainer">
							<div class="centered-element texto">HOME</div> 							
						</div>
					</li>

					<li class="menuTitles">
						<div class="seleccionContainer"></div>
						<div class="titleContainer">
							<div class="centered-element texto">SHUTTERS</div>							
						</div>
 
					</li>
					<li class="menuTitles">
						<div class="seleccionContainer"></div>
						<div class="titleContainer">
							<div class="centered-element texto">TEMPLATES</div>
						</div> 
					</li>

					<li class="menuTitles">
						<div class="seleccionContainer"></div>
						<div class="titleContainer">
							<div class="centered-element texto"> REPORTES</div>							
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
					<div class="title_view">DASHBOAR GENERAL</div>
				</div>
				<div class="view">
					<div>hola mundo</div>
				</div>
			</div>
		</div>

	</div>
</template>

<script setup>
	
</script>

<style scoped>

.menu{
	width: 250px;
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
	right: 30px;
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

.menuTitles:hover{
	.seleccionContainer {
		background: #283469;
	} 
	.titleContainer .texto {
		color: #283469;
	}
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

	padding: 20px;
	position: relative;
	height: auto;

}


.mainContainer .view_header .title_view{
	color: #283469;
	font-weight: 610;
}

.mainContainer .view {
height: 80%;
overflow: auto
}



.centered-element {
  margin: 0;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
	
</style>