<template>
	<div  class="popContainer">

  <div style="position: relative; text-align: left;">
  <div style="cursor: pointer; position: absolute; top: 10px; right: 15px;">
    <i class="bi bi-x-lg"></i>           
  </div>

  </div>

  <div style="position: relative; margin-top: 20px; width: 100%">
    <h2 class="text-center">Selecciona Un Dispositivo</h2>

    <form class="container" @submit.prevent="add_template" >

    <div class="form-row">
        <div class="form-group col-md-6">

      <div class="card">
        <div class="card-header">
          <h5>{{ "name" }}</h5>          
        </div>
        <div class="card-body">

             <div class="form-row">

    <div class="form-group col-md-6">

      <strong>
        <label>Origen</label>
      </strong>

      <div>{{"origen"}}</div>
    </div>

    <div class="form-group col-md-6">

      <strong>
        <label>Destino</label>
      </strong>
       <div>{{"Destino" }}</div>
    </div>

  </div>

      <div class="form-row">

    <div class="form-group col-md-6">

      <strong>
        <label>Salida</label>
      </strong>

      <div>{{ "Salida" }}</div>
    </div>

    <div class="form-group col-md-6">

      <strong>
        <label>Llegada</label>
      </strong>
    
       <div>{{"llegada"}}</div>
    </div>

  </div>
          
        </div>
      </div>

  
    </div>
    <div class="form-group col-md-6">

      <strong><label for="inputDestino">Dispositivo (Tracker)</label></strong>
      <select v-model="params.tracker_id" id="inputDestino" class="form-control" required>
      <option value="volvo">Volvo</option>

<!--         <option :value="track.id" v-for=" (track, index) in trackers_List" :key="index">
          {{track.label}}
      </option> -->



      </select>
    </div>
  </div>
    <div class="text-center mb-5">
  <button type="submit" class="btn btn-primary">Guardar</button>
  </div>
</form>

  </div>

</div>
</template>
<script setup>

import { ref } from 'vue'

	const params=ref({
      hash: window.$cookies.get('authorized').user.hash,
      name:null,
      origen:null,
      destino:null,
      departureDue:null,
      arrivalDue:null,
      shuttle_id: 31,
      tracker_id:2935572

	})

	function add_template(){
		console.log("se Guardo El template")
		console.log(params.value)
	}
	
</script>

<style scoped>
	.popContainer {
  /* background-color: #1e1f24; */
  background-color: white;
  position: absolute;
  /* color: white; */
  color: black;
  width: 50%;
  min-height: 50%;
  left: 50%;
  transform: translateX(-50%);
  top: 20%;
  border-radius: 15px 15px 15px 15px;
  z-index: 2;
  box-shadow: rgba(0, 0, 0, 0.49) 0px 0px 30px 10px;
}

.targetasContainer{
 display: flex;
 flex-wrap: wrap;
  flex-direction: row;
/* justify-content: space-around;*/
}

.card {
 padding: 10px;
 border-color: #3af665;
 background-color: #f1fff49c;
 margin-top: 10px;
 margin-right: 10px;
 margin-left: 10px;
 cursor: pointer;
}

.card .card-header {
  border-color: #3af665; 
  background-color:  #c0ffcd9c;
}
</style>