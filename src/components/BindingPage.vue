<template>
	<div style="position: relative;">
		
			<form class="formContainer" @submit.prevent="enviar" >

				<div class="form-group">
					<label for="name">TITULO DEL SHUTTER</label>
					<input v-model="adding.name" type="text" class="form-control" id="name" placeholder=" ">
				</div>
				<div class="form-row">
					<div class="form-group col-md-6">
						<label for="inputOrigen">ORIGEN</label>
					<input v-model="adding.startPlaceId" type="text" class="form-control" id="name" placeholder="" readonly>
					</div>

					<div class="form-group col-md-6">
						<label for="inputDestino">DESTINO</label>
						<input v-model="adding.endPlaceId" type="text" class="form-control" id="name" placeholder="" readonly>
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
					<label for="name">Dispositivo</label>
						<select v-model="adding.startPlaceId" id="inputOrigen" class="form-control" required>
							<option value="volvo">Volvo</option>
						</select>
				</div>

				<div class="text-center mb-1">
					<button type="submit" >ASIGNAR</button>
				</div>

        <div v-if="adding.saved">

          <h1 class="text-center">Guardado Correctamente</h1> 
        </div>

			</form>

	</div>

</template>

<script setup>

  import { ref } from 'vue';


const adding=ref({
  name:"LLEVAR COMIDA A ASU CASA DESPUES",
  startPlaceId:"MIAMI",
  endPlaceId:"LA VEGA",
  departureDue:"2024-06-03T22:44",
  arrivalDue:"2024-06-03T22:44",
  saved:false
})



function enviar(){

  console.log(adding.value)
  adding.value.saved=true

  setTimeout(()=>{
    window.location.replace("./dashboard");
  },2000)
}


</script>

<style scoped>

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