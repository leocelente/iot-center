<template>
    <div>
        <div class="c-card c-card--higher u-higher cgp">
            <header class="c-card__header">
                <h2 class="c-heading">
                    {{device.name}}
                    <div class="c-heading__sub">{{device.role}}</div>
                </h2>
            </header>
            <div class="c-card__body">
                <p class="c-paragraph">
                    {{device.ip}}
                </p>
                <p class="c-paragraph">
                    {{device.description}}
                </p>
                <!-- <p class="c-paragraph" v-for="output in device.outputs" :key=""></p> -->
            </div>
            <footer class="c-card__footer">
                <div class="c-input-group">
                    <button class="c-button c-button--block c-button--ghost-error" @click="remove()"><i class="fa fa-trash" aria-hidden="true"></i> Delete</button>
                    <button class="c-button c-button--block c-button--brand"><i class="fa fa-sliders" aria-hidden="true"></i> Control</button>
                </div>
            </footer>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    name: "app-device",
    props: ['device'],
    data() {
        return {

        };
    },
    methods: {
        control() {
            axios.post("http://localhost:8877/")
            console.log(`Controlling ${this.name} on ${this.device.ip} as a ${this.device.role}`);
        },
        remove(){
            axios.delete("http://localhost:8877/device?id="+this.device._id)
            .then(data=>{
                console.log("DELETED: ", data);
            }).catch(err=>console.log);
        }
    },
    created() {


    }
}
</script>

<style scoped>
    .cgp {
        background-color: #EEE;
        /* width: 23em; */
        margin-top: 1em;
    }
    .c-card__body {
        height: 8em;
    }
</style>

