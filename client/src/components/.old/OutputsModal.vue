<template>
    <div>
        <div class="c-overlay" @click="close()"></div>
        <div class="o-modal">
            <div class="c-card">
                <header class="c-card__header">
                    <button type="button" class="c-button c-button--close" @click="close()">×</button>
                    <h2 class="c-heading">{{input.name}}</h2>
                </header>
                <div class="c-card__body">

                    <table class="c-table">
                        <caption class="c-table__caption">List of Outputs:</caption>
                        <thead class="c-table__head">
                            <tr class="c-table__row c-table__row--heading">
                                <th class="c-table__cell">Id</th>
                                <th class="c-table__cell">Condition</th>
                                <th class="c-table__cell">Device</th>
                                <th class="c-table__cell">Action</th>
                            </tr>
                        </thead>
                        <tbody class="c-table__body">
                            <tr class="c-table__row" v-for="(output, index) in input.outputs" :key="output._id">
                                <td class="c-table__cell">{{output._id}}</td>
                                <td class="c-table__cell">{{output.condition}}</td>
                                <td class="c-table__cell">{{output.request}}</td>
                                <td class="c-table__cell">
                                    <button class="c-button c-button--brand" @click="trigger(output.request)"> <i class="fa fa-bolt"></i> Trigger</button>
                                    <button class="c-button c-button--error" @click="remove(output._id)"> <i class="fa fa-trash"></i> Delete</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </div>
                <footer class="c-card__footer">
                    <div class="c-input-group">
                        <div class="o-field">
                            <input class="c-field" v-model="condition" placeholder="condition">
                        </div>
                        <!-- <div class="o-field">
                            <input class="c-field" v-model="request" placeholder="request">
                        </div> -->
                        <div class="o-field">
                            <select class="c-field" v-model="ip">
                                <option :value="dev.ip" v-for="dev in devices" :key="dev._id">{{dev.name}}</option>
                            </select>
                        </div>
                        <button class="c-button c-button--brand" @click="add()"> <i class="fa fa-plus"></i> Add</button>
                        
                    </div>
                </footer>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    props: ['input'],
    data() {
        return {
            condition: "",
            request: "",
            ip: "",
            devices: []
        }
    },
    methods: {
        add() {
            const {condition, ip} = this;
            const id = this.input._id;
            console.log(id, condition);
            const a = this.url(ip, condition);
            axios.post("http://localhost:8877/input/output", {
                id, request:a , condition
            }).then(res =>{
                console.log(res.data);
            }).catch(err=>{
                console.log(err);
            })
            this.request = "";
            this.condition = "";
         },
        url(ip, cond){
            return `http://localhost:8877/${ip}/${cond}`;
        },
        update() { },
        remove(id) {
            axios.delete("http://localhost:8877/input/output?input_id=" + this.input._id +"&output_id=" + id);
         },
        fetch() {
            axios.get("http://localhost:8877/devices")
            .then(res=>{
                res.data.forEach(element =>{
                    this.devices.push(element);
                });
                console.log(res.data, this.devices);
            })
         },
        close(){
            this.$emit("onclose");
        },
        trigger(url){
            console.log(url);
            axios.get(url)
            .then(res =>{
                window.alert("Done");
                console.log(res.data);
            }).catch(err=>{
                console.log(err);
                if (err) throw err;
            });
        }
    },
    mounted() {
        this.fetch();
    }
}
</script>

<style scoped>

</style>