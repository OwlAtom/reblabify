<script setup>
import { ref } from 'vue';

const activetab = ref(0)

</script>


<template>

    <div class="tabview-custom">
        <div class="button-group tabs">
            <div class="button-group-item" @click="activetab = 0" v-bind:class="[ activetab === 0 ? 'active' : '' ]">
                 <p>Detaljer</p> 
            </div>
            <div class="button-group-item" @click="activetab = 1" v-bind:class="[ activetab === 1 ? 'active' : '' ]">
                <p>Chat</p>
            </div>
        </div>

        <TabView v-model:activeIndex="activetab">
            <TabPanel>
                <p>Begivenheds detaljer komponent her
                </p>
            </TabPanel>
            <TabPanel>
                <p> Chat komponent
                </p>
            </TabPanel>
        </TabView>
        
    </div>
</template>



<style lang="scss" scoped>

.button-group {
    .button-group-item {
        width: 50%;
    }
}

// tabview styles i _theme.scss


</style>
