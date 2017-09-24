<template>
    <div>
        <div class="c-overlay" @click="close()"></div>
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
                                <td class="c-table__cell">{{parseInput(trigger.input.ip)}}</td>
                                <td class="c-table__cell">{{parseEvent(trigger.input.event)}}</td>
                                <td class="c-table__cell">{{parseOutput(trigger.outputs)}}</td>
                                <td class="c-table__cell">
                                    <button class="c-button c-button--brand" @click="trigger(trigger)">
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
                            <select class="c-field" v-model="ip">
                                <option :value="dev.ip" v-for="dev in inputs" :key="dev._id">{{dev.name}}</option>
                            </select>
                        </div>    
                        <div class="o-field">
                            <select name="" id="" class="c-field" v-model="operator">
                                <option value="=">equal</option>
                                <option value="<">less than</option>
                                <option value=">">more than</option>
                                <option value="<=">less or equal than</option>
                                <option value=">=">more or equal than</option>
                            </select>
                        </div>
                        <div class="o-field">
                            <input class="c-field" type="number" name="" v-model="threshold" id="">
                        </div>
                        <div class="o-field">
                            <select class="c-field" v-model="output_id">
                                <option :value="dev._id" v-for="dev in outputs" :key="dev._id">{{dev.name}}</option>
                            </select>
                        </div>
                        <div class="o-field">
                            <input type="text" class="c-field" v-model="output_data">
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
export default {
    props: ['inputs', 'outputs', 'triggers'],
    data() {
        return {
            serverURL: "http://localhost:8877/",
            condition: "",
            ip: "",
            output_id: "",
            threshold: "",
            operator: "",
            output_data: ""

        }
    },
    computed: {
        data: ()=>{
            return (this.output_data);
        }
    },
    methods: {
        add() {
            const {ip, condition, operator, threshold, data, output_id} = this;
            axios.post(this.serverURL + 'triggers', {
                input: {
                    ip,
                    event: {
                        operator,
                        threshold
                    }
                },
                outputs: [
                    {
                        _id: output_id,
                        data
                    }
                ]
            }).then(({data})=>{
                console.log(data);
            }).catch(err=>console.log(err));
        },
        remove (trigger){
            if(window.confirm("Are you sure"))
                axios.delete(this.serverURL+ 'triggers?id='+trigger._id)
                    .then(({data})=>{
                        console.log(data);
                    }).catch(err=>console.log(err));
        },
        parseEvent({ value, operator, threshold }) {
            if (this.inputs.length > 0) {
                return `${operator} ${threshold}`;
            } else {
                return '';
            }
        },
        parseOutput(outputs) {
            console.log(outputs);   
            if (this.outputs.length > 0) {
                let parsed = [];
                this.outputs.forEach(inDb => {
                    outputs.forEach(inTrigger => {
                        if (inTrigger._id == inDb._id) {
                            parsed.push(inDb);
                        }
                    })
                });
                let ret = "";
                parsed.forEach(out => {
                    ret += out.name + ", ";
                })
                return ret;
            } else {
                return ""
            }
        },
        parseInput(ip) {
            if (this.inputs.length > 0) {
                let parsed = {};
                this.inputs.forEach(inDb => {
                    if (ip == inDb.ip) {
                        parsed = inDb;
                    }
                });
                let ret = parsed.name;
                return ret;
            } else {
                return ""
            }
        },
        trigger(req) {

        },
        close() {
            this.$emit("onclose");
        }
    },
}
</script>

<style scoped>

</style>