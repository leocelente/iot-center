<template>
  <div id="app">
    <ul class="c-nav c-nav--inline u-high">
      <li class="c-nav__item">
        <i class="fa fa-home" aria-hidden="true"></i> IoT Center</li>
      <li class="c-nav__item c-nav__item--right" @click="showInputModal()">
        <i class="fa fa-plus" aria-hidden="true"></i> Input</li>
      <li class="c-nav__item c-nav__item--right" @click="showOutputModal()">
        <i class="fa fa-plus" aria-hidden="true"></i> Output</li>
      <li class="c-nav__item c-nav__item--right" @click="newDeviceStatus = true">
        <i class="fa fa-plus" aria-hidden="true"></i> Trigger</li>
    </ul>
    <!-- END MENU -->
    <div>
      <div v-if="triggersModal">
        <ManageTriggersModal @onclose="closeTriggersModal()"></ManageTriggersModal>
      </div>
      <div v-if="inputModal">
        <AddInputModal :input="currentInput" @onclose="closeInputModal()"></AddInputModal>
      </div>
      <div v-if="outputModal">
        <AddOutputModal :output="currentOutput" @onclose="closeOutputModal()"></AddOutputModal>
      </div>
    </div>
    <div class="grid">
      <InputList :inputs="inputs"></InputList>
      <hr>
      <OutputList :outputs="outputs"></OutputList>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import io from 'socket.io-client';
import InputList from './components/Input/InputList.vue';
import OutputList from './components/Output/OutputList.vue';
import AddInputModal from './components/Input/AddInputModal.vue';
import AddOutputModal from './components/Output/AddOutputModal.vue';
import ManageTriggersModal from './components/Trigger/ManageTriggersModal.vue';

export default {
  name: 'app',
  components: { InputList, OutputList, AddInputModal, AddOutputModal, ManageTriggersModal },
  data() {
    return {
      outputs: [],
      inputs: [],
      inputModal: false,
      outputModal: false,
      triggersModal: false,
      currentInput: {},
      currentOutput: {}
    }
  },
  methods: {
    fetchInputs() {
      axios.get("http://localhost:8877/inputs")
        .then(({ data }) => {
          this.inputs = data;
        }).catch(err => console.log(err));
    },
    fetchOutputs() {
      axios.get("http://localhost:8877/outputs")
        .then(({ data }) => {
          this.outputs = data;
        }).catch(err => console.log(err));
    },
    showInputModal() {
      this.inputModal = true;
    },
    showOutputModal() {
      this.outputModal = true;
    },
    showTriggersModal() {
      this.triggersModal = true;
    },
    closeInputModal() {
      this.inputModal = false;
    },
    closeOutputModal() {
      this.outputModal = false;
    },
    closeTriggersModal() {
      this.triggersModal = false;
    }
  },

  created() {
    this.fetchInputs();
    this.fetchOutputs();
    const socket = new io("http://localhost:8877");
    socket.on('update:outputs', this.fetchOutputs);
    socket.on('update:inputs', this.fetchInputs);
    socket.on('new:input', this.showInputModal);
    socket.on('new:output', this.showOutputModal);
  }
}
</script>

<style lang="scss" scoped>
.grid {
  padding: 10px;
  padding-top: 20px;
}
</style>
