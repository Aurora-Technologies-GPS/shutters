<template>
    <div class="mainPageContainer">

        <HeaderPage  class="header"/>

        <div class="contentContainer">

            <div class="targetasContainer">
               

            </div>

        </div>

        


    </div>
</template>
<script setup>
	import HeaderPage from './HeaderPage.vue'

</script>

<style>
.mainPageContainer{
    height: 100%;
    position: relative;
    background:#f6f8fb;
}

.mainPageContainer .header{
    height: 10%;
}

.mainPageContainer .contentContainer{
    padding: 20px;
    height: 90%;
    background-color: grey;
}

.contentContainer .targetasContainer {
    width: 100%;
    background-color: transparent;

}

</style>