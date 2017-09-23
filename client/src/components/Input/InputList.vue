<template>
    <div class="o-grid o-grid--wrap">
        <div v-for="input in inputs" :key="input._id">
            <SingleInput :input="input"></SingleInput>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import SingleInput from './SingleInput.vue';
export default {
    components: { SingleInput },
    props: ['inputs'],
    data() {
        return {}
    },
}
</script>

<style scoped>

</style>