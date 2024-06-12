<template>
<div>
<!-- login -->

<section class="login">

<div class="contenidoLogin text-center">
  <img  src='../assets/auroraLogo.png' alt="Responsive image" style=" width: 50%;">
<h3 class="Bienvenido">Bienvenido!</h3>

<form @submit.prevent="consultar" >
<div  class="searchBar   mt-2 rounded-pill" style="position: relative;">
<i class="bi bi-person-fill"></i>
<input v-model="datosUser.username" class="inputsearchBar"  placeholder="Usuario" type="text" required autofocus>
<i v-if="claveIncorrecta" class="bi bi-exclamation-circle" style="position: absolute; right: 5%; margin: 5px; font-size: larger; color: red;"></i> 
</div>

<br>	
<div  class="searchBar rounded-pill" style="position: relative;">
<i class="bi bi-key-fill"></i>
<input class="inputsearchBar" v-model="datosUser.password"  placeholder="Contrasena" type="password"  required>
<i v-if="claveIncorrecta" class="bi bi-exclamation-circle" style="position: absolute; right: 5%; margin: 5px; font-size: larger; color: red;"></i> 
</div>

<button type="submit" class="btn btn-primary rounded-pill btAcceder" href="#" role="button"><b>Ingresar</b>
</button>

</form>


</div>

</section>	
</div>
</template>

<script setup>
	import {ref} from 'vue'
	import { auth, } from './DataConector.js' //auth placeList auth ,


let datosUser=ref({username:"", password:""})
let claveIncorrecta=ref(false)

if (window.$cookies.isKey('authorized')){

  console.log("Wellcome Back")
  //console.log(window.$cookies.get('authorized'))

  setTimeout(()=>{
    window.location.replace("./dashboard");
  },100)

}else{
  console.log("Logeate Por Favor")
}


function consultar(){

auth(datosUser.value).then(result=>{

  console.log(result)

  if (result.Error) {
    console.log("Clave Incorrecta")
    claveIncorrecta.value=true
  
  }else{  

    if (result) {
      console.log("Bienvenido")
      window.$cookies.set('authorized',result)
      window.$cookies.get('authorized')

      setTimeout(()=>{
     window.location.replace("./dashboard");
      },100)

    }else{
      console.log("No se pudo Conectar")
    }

  }
  
})

}

</script>


<style scoped>
/* para el login*/

.Bienvenido{
  color:#4abed5;
  font-size: calc(1em + 1vw);
  padding-bottom: 20px;
}

.inputsearchBar{
padding:10px;
width: 80%;

outline: none !important;
border: none;

}

.searchBar{
  /*width: 400px;*/
  margin-left: 21%;
  margin-right: 21%;
  background-color: white;
  border: none;
  color: #00ab5f;
}

.btAcceder{
  background-color: #ffffff;
  color: #003466;
  width: 230px;
   border: none;
   margin-top: 20px;
   margin-bottom:20px;
}


.login {
  /*background-image: url("../assets/fondoazul.png");*/
  height: 100vh;
  /*min-width: 1000px;*/
  background-color: #366fce;
 background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
}

.contenidoLogin{
  position: absolute;
  width: auto;
  padding: 15px;
  height: auto;
  min-width: 600px;
  background-color: rgba(0, 0, 0, 0.0);;
  left: 50%;
  transform: translateX(-50%);
  top: 20%;
  border-radius: 15px 15px 15px 15px;
/*  box-shadow: rgba(0, 0, 0, 0.49) 0px 0px 30px 10px;*/
  
}

.pagina{
background-color: #cbcbcb;
min-height: 100vh;
font-family: 'Poppins', sans-serif;
}






</style>