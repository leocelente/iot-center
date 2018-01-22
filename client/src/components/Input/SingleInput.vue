<template>
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
                <a href="">Manage Triggers</a>
            </p>
        </div>
        <footer class="c-card__footer">
            <div class="c-input-group">
                <button class="c-button c-button--block c-button--ghost-error" @click="remove()">
                    <i class="fa fa-trash" aria-hidden="true"></i> Delete</button>
                <!-- <button class="c-button c-button--block c-button--brand">
                    <i class="fa fa-bolt" aria-hidden="true"></i> Trigger</button> -->
            </div>
        </footer>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    props: ['input'],
    data() {
        return {}
    },
    methods: {
        remove() {
            if (window.confirm("Are you sure?")) {
                axios.delete("http://localhost:8877/inputs?id=" + this.input._id).then(({ data }) => {
                    console.log(data); 
                }).catch(err => { console.log(err) });
            }
        }
    },

}
</script>

<style scoped>

</style>