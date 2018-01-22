<template>
    <div>
        <ul class="c-nav c-nav--inline u-high">
            <li class="c-nav__item">
                <i class="fa fa-home" aria-hidden="true"></i> IoT Center</li>
            <li class="c-nav__item c-nav__item--right" @click="iModal = true">
                <i class="fa fa-plus" aria-hidden="true"></i> Input</li>
            <li class="c-nav__item c-nav__item--right" @click="oModal = true">
                <i class="fa fa-plus" aria-hidden="true"></i> Output</li>
            <li class="c-nav__item c-nav__item--right" @click="tModal = true">
                <i class="fa fa-plus" aria-hidden="true"></i> Trigger</li>
        </ul>
            <!-- END MENU -->
        <div>
            <div v-if="tModal">
                <ManageTriggersModal  @onclose="tModal = false"></ManageTriggersModal>
            </div>
            <div v-if="iModal">
                <AddInputModal :input="new_input" @onclose="iModal = false"></AddInputModal>
            </div>
            <div v-if="oModal">
                <AddOutputModal :output="new_output" @onclose="oModal = false"></AddOutputModal>
            </div>
        </div>
    </div>
</template>

<script>
import  AddOutputModal  from "./Output/AddOutputModal.vue";
import  AddInputModal from './Input/AddInputModal.vue';
import  ManageTriggersModal  from "./Trigger/ManageTriggersModal.vue";
export default {
    props: ['socket'],
    components: {
        AddOutputModal,
        AddInputModal,
        ManageTriggersModal
    },
    data() {
        return {
            iModal: false,
            oModal: false,
            tModal: false,
            new_output: {},
            new_input: {}
        }
    },
    created(){
        this.socket.on('new:input', (data)=>{
            this.new_input = data;
            this.iModal = true;
        });
        this.socket.on('new:output', (data)=>{
            console.log(data)
            this.new_output = data;
            this.oModal = true;
        });
    }
};
</script>

<style scoped>

</style>
