console.log("Starting...");

// MQTT Defined
var mqtt = require('mqtt')  
var mqttOptions = {
  clientId: 'MQTTBroker01',
  port: 1883,
  username: 'nodered',
  password: 'goNodered01'
}
var deviceRoot = "esp32/"  

client = mqtt.connect("mqtt://127.0.0.1", mqttOptions);
console.log("Published");
client.publish('mqttbroker/event', 'connected');
console.log("Published");

client.subscribe(deviceRoot + "+/output");
client.on('message', insertEvent);

function insertEvent(topic, message) {  
  var message = message.toString();

  console.log('Topic: ', topic, ' | ', 'Message: ', message);
};

console.log("Started");
