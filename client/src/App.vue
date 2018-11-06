<template>
  <div id="app">
    <TopMenu :socket="socket"/>
    <div class="grid">
      <InputList :inputs="devices.inputs"></InputList>
      <hr>
      <OutputList :outputs="devices.outputs"></OutputList>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import io from 'socket.io-client';
import { mapActions, mapGetters } from "vuex";

import InputList from './components/Input/InputList.vue';
import OutputList from './components/Output/OutputList.vue';
import TopMenu from "./components/Menu.vue";
import { SERVER_URL } from './constants';

export default {
  name: 'app',
  components: { InputList, OutputList, TopMenu },

  data() {
    
    return {
      socket: {}
    }
  },
  methods: {
    ...mapActions(['fetchAll', 'fetchInputs','fetchOutputs','fetchTriggers']),
  },
  computed: {
    ...mapGetters({devices: 'getDevices'})
  },
  created() {
    this.fetchAll();
    this.socket = new io(SERVER_URL);
    this.socket.on('update:outputs', this.fetchOutputs);
    this.socket.on('update:inputs', this.fetchInputs);
    this.socket.on('update:triggers', this.fetchTriggers);
  }
}
</script>

<style lang="scss" scoped>
.grid {
  padding: 10px;
  padding-top: 20px;
}
</style>
