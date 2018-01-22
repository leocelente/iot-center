<template>
    <div>
        <div class="c-overlay c-overlay--visible" @click="close()"></div>
        <div class="o-modal">
            <div class="c-card">
                <header class="c-card__header">
                    <button type="button" class="c-button c-button--close" @click="close()">×</button>
                    <h2 class="c-heading">Triggers</h2>
                </header>
                <div class="c-card__body">

                    <table class="c-table">
                        <caption class="c-table__caption">List of Triggers:</caption>
                        <thead class="c-table__head">
                            <tr class="c-table__row c-table__row--heading">
                                <!-- <th class="c-table__cell">Id</th> -->
                                <th class="c-table__cell">Input</th>
                                <th class="c-table__cell">Condition</th>
                                <th class="c-table__cell">Output</th>
                                <th class="c-table__cell">Actions</th>
                            </tr>
                        </thead>
                        <tbody class="c-table__body">
                            <tr class="c-table__row" v-for="trigger in triggers" :key="trigger._id">
                                <!-- <td class="c-table__cell">{{trigger._id}}</td> -->
                                <td class="c-table__cell">{{parseInput(trigger.input)}}</td>
                                <td class="c-table__cell">{{trigger.condition}}</td>
                                <td class="c-table__cell">{{parseOutput(trigger)}}</td>
                                <td class="c-table__cell">
                                    <button class="c-button c-button--brand" @click="spark(trigger)">
                                        <i class="fa fa-bolt"></i> Trigger</button>
                                    <button class="c-button c-button--error" @click="remove(trigger)">
                                        <i class="fa fa-trash"></i> Delete</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                </div>
                <footer class="c-card__footer">
                    <div class="c-input-group">
                        <div class="o-field">
                            <select class="c-field" v-model="input_id">
                                <option :value="dev._id" v-for="dev in devices.inputs" :key="dev._id">{{dev.name}}</option>
                            </select>
                        </div>    
                        <div class="o-field">
                            <input class="c-field" type="text" name="" v-model="condition" id="">
                        </div>
                        <div class="o-field">
                            <select class="c-field" v-model="output_id">
                                <option :value="dev._id" v-for="dev in devices.outputs" :key="dev._id">{{dev.name}}</option>
                            </select>
                        </div>
                        <div class="o-field">
                            <input type="text" class="c-field" v-model="output_payload">
                        </div>
                        <button class="c-button c-button--brand" @click="add()">
                            <i class="fa fa-plus"></i> Add</button>

                    </div>
                    <p class="c-paragraph c-text--quiet">
                        1 = active (click) <br>
                        0 = disable
                    </p>
                </footer>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';
import { SERVER_URL } from './../../constants';

export default {
    data() {
        return {
            condition: "",
            input_id: "",
            output_id: "",
            output_payload: ""

        }
    },
    computed: {
        ...mapGetters({devices: 'getDevices', triggers: 'getTriggers'}),
    },
    methods: {
        add() {
            const { input_id, condition, output_id, output_payload } = this;
            axios.post(SERVER_URL + '/triggers', {
                input: input_id,
                output: output_id,
                output_payload,
                condition
            }).then(({data})=>{
                console.log(data);
            }).catch(err=>console.log(err));
        },
        remove (trigger){
            if(window.confirm("Are you sure"))
                axios.delete(SERVER_URL+ '/triggers?id='+trigger._id)
                    .then(({data})=>{
                        console.log(data);
                    }).catch(err=>console.log(err));
        },
        parseOutput(trigger) {
            const {output, output_payload} = trigger;
            console.log(trigger)
            if (this.devices.outputs) {
                let parsed ={};
                this.devices.outputs.forEach(inDb => {
                    console.log(inDb._id, output)
                        if (output == inDb._id) {
                            
                            parsed = inDb;
                        }
                }); 
                return `${parsed.name}(${output_payload})`;
            } else {
                return ""
            }
        },
        parseInput(id) {
            if (this.devices.inputs) {
                let parsed = {};
                this.devices.inputs.forEach(inDb => {
                    if (id == inDb._id) {
                        parsed = inDb;
                    }
                });
                let ret = parsed.name;
                return ret;
            } else {
                return ""
            }
        },
        spark({input}) {
            const payload = prompt("What payload to send with trigger? ");
            if(!payload) return;
            axios.post(SERVER_URL + '/trigger', {input, payload})
        },
        close() {
            this.$emit("onclose");
        }
    },
}
</script>

<style scoped>

</style>