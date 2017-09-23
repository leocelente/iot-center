<template>
    <div>
        <div class="c-card c-card--higher u-higher cgp">
            <header class="c-card__header">
                <h2 class="c-heading">
                    {{output.name}}
                    <div class="c-heading__sub">{{output.role}}</div>
                </h2>
            </header>
            <div class="c-card__body">
                <p class="c-paragraph">
                    {{output.ip}}
                </p>
                <p class="c-paragraph">
                    {{output.description}}
                </p>
                <!-- <p class="c-paragraph" v-for="output in device.outputs" :key=""></p> -->
            </div>
            <footer class="c-card__footer">
                <div class="c-input-group">
                    <button class="c-button c-button--block c-button--ghost-error" @click="remove()">
                        <i class="fa fa-trash" aria-hidden="true"></i> Delete</button>
                    <button class="c-button c-button--block c-button--brand">
                        <i class="fa fa-sliders" aria-hidden="true"></i> Control</button>
                </div>
            </footer>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    props: ['output'],
    data() {
        return {
        }
    },
    methods: {
        remove() {
            if (window.confirm("Are you sure?")) {
                axios.delete("http://localhost:8877/outputs?id=" + this.output._id).then(({ data }) => {
                    console.log(data);
                }).catch(err => { console.log(err) });
            }
        }
    },

}
</script>

<style scoped>

</style>