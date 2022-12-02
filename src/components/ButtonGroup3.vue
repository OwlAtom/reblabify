<script setup>
import { ref } from 'vue';

const activetab = ref(0)

</script>


<template>

    <div class="tabview-custom">
        <div class="button-group">
            <div class="button-group-item" @click="activetab = 0" v-bind:class="[ activetab === 0 ? 'active' : '' ]">
                 <p>Kommer</p> 
            </div>
            <div class="button-group-item" @click="activetab = 1" v-bind:class="[ activetab === 1 ? 'active' : '' ]">
                <p>Måske</p>
            </div>
            <div class="button-group-item" @click="activetab = 2" v-bind:class="[ activetab === 2 ? 'active' : '' ]">
                <p>Afvist</p>
            </div>
        </div>

        <TabView v-model:activeIndex="activetab">
            <TabPanel>
                <p>Liste over personer, filtreret på svar (kommer) </p>
            </TabPanel>
            <TabPanel>
                <p>Liste over personer, filtreret på svar (måske) </p>
            </TabPanel>
            <TabPanel>
                <p>Liste over personer, filtreret på svar (afvist) </p>
            </TabPanel>
        </TabView>
        
    </div>
</template>



<style lang="scss" scoped>

.button-group {
    .button-group-item {
        width: 33%;

    }
}

// tabview styles i _theme.scss/shared


</style>
