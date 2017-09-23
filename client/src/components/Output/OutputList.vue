<template>
    <div class="o-grid o-grid--wrap">
        <div v-for="output in outputs" :key="output._id">
            <SingleOutput :output="output"></SingleOutput>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import SingleOutput from './SingleOutput.vue';
export default {
    components: { SingleOutput },
    props: ['outputs'],
    data() {
        return {

        }
    },
}
</script>

<style scoped>

</style>