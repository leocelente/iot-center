import Vuex from "vuex";
import axios from "axios";
import { SERVER_URL } from './../constants';
export const store = {
    state: {
        inputs: [],
        outputs: [],
        triggers: []
    },
    mutations: {
        setInputs: (state, payload) => {
            console.log("CHANGED INPUTS: ", payload)
            state.inputs = payload;
        },
        setOutputs: (state, payload) => {
            console.log("CHANGED OUTPUTS: ", payload);
            state.outputs = payload;
        },
        setTriggers: (state, payload) => {
            console.log("CHANGED TRIGGERS: ", payload);
            state.triggers = payload;
        }
    },
    getters: {
        getDevices: state => {
            const { inputs, outputs } = state;
            console.log("STATE: ", state);
            return { inputs, outputs };
        },
        getTriggers: state => {
            const { triggers } = state;
            return triggers;
        },
        getInputs: state => {
            const { inputs } = state;
            return { inputs };
        },
        getOutputs: state => {
            const { outputs } = state;
            return { outputs };
        }
    },
    actions: {
        fetchAll: ({ commit }) => {
            const promises = [
                axios.get(SERVER_URL + "/inputs"),
                axios.get(SERVER_URL + "/triggers"),
                axios.get(SERVER_URL+ "/outputs")
            ];
            Promise.all(promises)
                .then(res => {
                    console.log(res);
                    commit("setInputs", res[0].data);
                    commit("setTriggers", res[1].data);
                    commit("setOutputs", res[2].data);
                })
                .catch(err => console.log(err));
        },
        fetchInputs: ({ commit }) => {
            axios.get(SERVER_URL + "/inputs").then(({ data }) => {
                commit('setInputs', data)
            }).catch(e=>console.log(e))
        },
        fetchOutputs: ({ commit }) => {
            axios.get(SERVER_URL + "/outputs").then(({ data }) => {
                commit('setOutputs', data)
            }).catch(e=>console.log(e))
        },
        fetchTriggers: ({ commit }) => {
            axios.get(SERVER_URL + "/triggers").then(({ data }) => {
                commit('setTriggers', data)
            }).catch(e=>console.log(e))
        }
    }
};

