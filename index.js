const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

// DECLARES GLOBAL VARIABLES
let Output;
let Input;
let Trigger;
let io;

// SETUP MONGODB VIA MONGOOSE
mongoose.connect("mongodb://mongo:27017");
const db = mongoose.connection;

// DEFINES THE DEVICE SCHEMA
const OutputSchema = mongoose.Schema({
  ip: String,
  role: String,
  name: String,
  description: String
});

// DEFINES THE INPUT SCHEMA
const InputSchema = mongoose.Schema({
  ip: String,
  role: String,
  description: String,
  name: String
});

const TriggerSchema = mongoose.Schema({
  input: Object,
  outputs: Array,
  condition: String
});

// INSTACIATES SCHEMAS MODELS
Output = mongoose.model('Output', OutputSchema);
Input = mongoose.model('Input', InputSchema);
Trigger = mongoose.model('trigger', TriggerSchema);

// STARTS THE DATABASE
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("[*] - CONNECTED TO DATABASE");
});

// Express Config
app.use(cors());
app.use(bodyParser.json());
app.use('/', express.static('client/dist'));


// BROADCASTS THE HANDSHAKE 
app.get('/handshake', (req, res) => {
  const ip = req.connection.remoteAddress.split(':')[3];
  const { role, type } = req.query;

  io.emit('new:' + type, { role, ip });
  console.log(`[*] - Found new Device! : ${role} @ ${ip}`);
});


app.get('/trigger', (req, res)=>{
  const { ip } = req.query;
  Trigger.find()
});

// START TRIGGERS
app.get('/triggers', (req, res) => {
  Trigger.find({}, (err, triggers) => {
    res.send(triggers);
  });
});

app.post('/triggers', (req, res) => {
  const trigger = new Trigger(req.body);
  trigger.save((err => {
    if (err) { res.send(err); throw err; }
    res.send(trigger);
  }));
  io.emit('update:triggers')
});

app.delete('/triggers', (req, res) => {
  const { id } = req.query;
  Trigger.findByIdAndRemove(id, (err, trigger) => {
    res.send(trigger);
  });
  io.emit('update:triggers');
});

app.put('/triggers', (req, res) => {
  const { id, data } = req.body;
  Trigger.findAndUpdate(id, data, (err, trigger) => {
    res.send(trigger);
  });
  io.emit('update:triggers')
});

// END TRIGGERS


// START DEVICES
app.get('/outputs', (req, res) => {
  Output.find({}, (err, outputs) => {
    res.send(outputs);
  });
});

app.post('/outputs', (req, res) => {
  const output = new Output(req.body);
  output.save((err => {
    if (err) { res.send(err); throw err; }
    res.send(output);
  }));
  io.emit('update:outputs');
});

app.delete('/outputs', (req, res) => {
  const { id } = req.query;
  Output.findByIdAndRemove(id, (err, output)=>{
    res.send(output);
  });
  io.emit('update:outputs');
});

app.put('/outputs', (req, res) => {
  const { id, data } = req.body;
  Output.findAndUpdate(id, data, (err, output) => {
    res.send(output);
  });
  io.emit('update:outputs');
});
// END DEVICES


// START INPUTS
app.get('/inputs', (req, res) => {
  Input.find({}, (err, inputs) => {
    res.send(inputs);
  });

});

app.post('/inputs', (req, res) => {
  const input = new Input(req.body);
  input.save((err => {
    if (err) { res.send(err); throw err; }
    res.send(input);
  }));
  io.emit('update:inputs')
});

app.delete('/inputs', (req, res) => {
  const { id } = req.query;
  Input.findByIdAndRemove(id, (err, input)=>{
    res.send(input);
  });
  io.emit('update:inputs');
});

app.put('/inputs', (req, res) => {
  const { id, data } = req.body;
  Input.findAndUpdate(id, data, (err, input) => {
    res.send(input);
  });
  io.emit('update:devices');
});
// END INPUTS


// SETUPS THE SERVER
const server = app.listen(8877, () => {
  console.log("[*] - SERVER STARTED ON 8877");
});

// STARTS THE RT SERVER
io = require('socket.io')(server);
