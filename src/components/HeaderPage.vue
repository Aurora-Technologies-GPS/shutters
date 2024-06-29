<template>

    <div class="text-right headerMenu" href="/dashboard">
        <div class="btnContainer">
            <div class="centered-element btns">
                <i class="bi bi-person-circle"></i> <span class="user">{{`${user.firstName} ${user.lastName}`}}</span>
                <i class="bi bi-bell-fill"></i> <span @click="salir" class="logut">SIGN OUT</span>
            </div>
        </div>
    </div>

</template>

<script setup>

import { ref } from 'vue'
import { logout } from './DataConector.js' 

let user = ref({
    firstName: 'NOEL',
    lastName: 'LORA'
})

if (window.$cookies.isKey('authorized')) {
    user.value.firstName = window.$cookies.get('authorized').user.firstName.toUpperCase()
    user.value.lastName = window.$cookies.get('authorized').user.lastName.toUpperCase()
} else {
    window.location.replace("./");
}

function salir(){
		try{
			logout(window.$cookies.get('authorized').user.hash).then(res_logout=>{

				if (res_logout) {
					if(res_logout.success){
						console.log(res_logout)
						
						// setTimeout(()=>{
							window.$cookies.remove('authorized') 
							window.location.replace("./");
						// },2000)

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
@import url('./styles/header.css');
</style>