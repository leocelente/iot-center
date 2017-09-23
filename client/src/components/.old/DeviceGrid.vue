<template>
    <div class="o-grid o-grid--wrap">
        <div class="o-grid__cell  o-grid__cell--width-fixed w" v-for="input in inputs" :key="input._id">
            <InputDev :input="input" ></InputDev>
        </div>
        <div class="o-grid__cell  o-grid__cell--width-fixed w" v-for="device in devices" :key="device._id">
            <Device :device="device" ></Device>
        </div>
    </div>
</template>
<script>
import Device from './Device.vue';
import InputDev from './Input.vue';
export default {
    components: {Device, InputDev},
    props: ['devices', 'inputs'],
    data() {
        return {}
    },
    created() {

    }
}
</script>
<style scoped>
.w{
    width: 23em;
}
</style>    
