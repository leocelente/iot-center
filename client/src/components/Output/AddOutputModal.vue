<template>
    <div>
        <div class="c-overlay" @click="close()"></div>
        <div class="o-modal">
            <div class="c-card">
                <header class="c-card__header">
                    <button type="button" class="c-button c-button--close" @click="close()">×</button>
                    <h2 class="c-heading">Add a new Output Device:</h2>
                </header>
                <div class="c-card__body">
                    <fieldset action="" class="o-fieldset">
                        <div class="o-form-element">
                            <label class="c-label" for="nickname">Name:</label>
                            <input type="text" class="c-field" v-model="name" autofocus>
                        </div>
                        <div class="o-form-element">
                            <label class="c-label" for="nickname">IP:</label>
                            <input type="text" class="c-field" v-model="ip">
                        </div>
                        <div class="o-form-element">
                            <label class="c-label" for="nickname">Role:</label>
                            <select class="c-field" v-model="role">
                                <option value="relay">Relay</option>
                                <option value="servo">Servo</option>
                            </select>
                        </div>
                        <div class="o-form-element">
                            <label class="c-label" for="nickname">Description:</label>
                            <textarea v-model="description" class="c-field" cols="200" rows="8"></textarea>
                        </div>
                    </fieldset>
                </div>
                <footer class="c-card__footer">
                    <button type="button" class="c-button c-button--error u-large" @click="close()">Cancel</button>
                    <button type="button" class="c-button c-button--brand u-large" @click="add()">Add</button>
                </footer>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    props: ['output'],
    data() {
        return {
            name: "",
            ip: "",
            role: "",
            description: "",
        }
    },
    methods: {
        close() {
            this.$emit('onclose');
        },
        add(){
            const { ip, name, role, description } = this;
            axios.post("http://localhost:8877/outputs", { ip, name, role, description })
                .then(({data})=>{
                    console.log(data);
                }).catch(err=>console.log(err));
            this.close();
        },
    },
    mounted() {
        if (this.output) {
            const { ip, role } = this.output;
            this.ip = ip;
            this.role = role;
        }
    }
}
</script>

<style scoped>

</style>