<template>
    <div>
        <div class="c-card c-card--higher u-higher cgp">
            <header class="c-card__header">
                <h2 class="c-heading">
                    {{input.name}}
                    <div class="c-heading__sub">{{input.role}}</div>
                </h2>
            </header>
            <div class="c-card__body">
                <p class="c-paragraph">
                    {{input.ip}}
                </p>
                <p class="c-paragraph">
                    {{input.description}}
                </p>
                <p class="c-paragraph">
                    <a href="#" @click="outputsModalStatus = true">Manage Outputs</a>
                    <div v-if="outputsModalStatus">
                        <OutputsModal :input="input" @onclose="outputsModalStatus = false"></OutputsModal>
                    </div>
                </p>
            </div>
            <footer class="c-card__footer">
                <div class="c-input-group">
                    <button class="c-button c-button--block c-button--ghost-error" @click="remove()">
                        <i class="fa fa-trash" aria-hidden="true"></i> Delete</button>
                    <button class="c-button c-button--block c-button--brand" @click="control()">
                        <i class="fa fa-bolt" aria-hidden="true"></i> Click </button>
                </div>
            </footer>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import OutputsModal from './OutputsModal.vue';
export default {
    components: { OutputsModal },
    props: ['input'],
    data() {
        return {
            outputsModalStatus: false
        };
    },
    methods: {
        control() {
            console.log(this.input);
            axios.get("http://localhost:8877/input/" + this.input.ip + "/click").then(data => {
                console.log(data.data);
            }).catch(err=>{
                console.log(err);
            });
            console.log(`Controlling ${this.name} on ${this.input.ip} as a ${this.input.role}`);
        },
        remove() {
            axios.delete("http://localhost:8877/device?id=" + this.input._id)
                .then(data => {
                    console.log("DELETED: ", data);
                }).catch(err => console.log);
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

