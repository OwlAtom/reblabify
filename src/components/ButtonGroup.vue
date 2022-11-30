<script>
export default {
    data() {
        return {
            activetab: 0
        }
    }
}

</script>


<template>

    <div class="tabview-custom">
        <div class="button-group tabs">
            <div class="button-group-item" @click="activetab = 0" v-bind:class="[ activetab === 0 ? 'active' : '' ]"> <p>test 1</p> </div>
            <div class="button-group-item" @click="activetab = 1" v-bind:class="[ activetab === 1 ? 'active' : '' ]"> <p>test 2</p> </div>
            <div class="button-group-item" @click="activetab = 2" v-bind:class="[ activetab === 2 ? 'active' : '' ]"> <p>test 3</p> </div>
        </div>

        
        <TabView v-model:activeIndex="activetab">
            <TabPanel header="Header I">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </p>
            </TabPanel>
            <TabPanel header="Header II">
                <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
                    architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
                </p>
            </TabPanel>
            <TabPanel header="Header III">
                <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati
                    cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.
                </p>
            </TabPanel>
        </TabView>
        
    </div>
</template>



<style lang="scss" scoped>

.button-group {
    width: 100%;
    background-color: #FCFCFC; //todo: farvevariable
    display: flex;
    border-radius: 8px; //todo: variable
    height: 2.3em;
    padding: 3px;
    gap: 3px;
    box-shadow: 0 2px 4px #30303040; //todo: farvevariable

    .button-group-item {
        flex-grow: 1;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        transition:all .2s linear;

        &.active {
            background-color: #F9D6BC; //todo: variabel
            border-radius: 5px; //todo: variable
        }

        p {
            margin: 0;
        }
    }
}

// tabview styles i _theme.scss


</style>
