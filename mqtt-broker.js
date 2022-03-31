console.log("Starting...");

// MQTT Defined
var mqtt = require('mqtt')  
var mqttOptions = {
  clientId: 'MQTTBroker01',
  port: 1883,
  username: 'nodered',
  password: 'goNodered01'
}
var deviceRoot = ""  

client = mqtt.connect("mqtt://127.0.0.1", mqttOptions);
console.log("Published");
client.publish('mqttbroker/event', 'connected');
console.log("Published");

client.subscribe(deviceRoot + "#");
client.on('message', insertEvent);

// Mongodb Defined
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

function insertEvent(topic, message) {  
  var message = message.toString();
  console.log('Topic: ', topic, ' | ', 'Message: ', message);

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var myobj = { topic: topic, message: message,  when: new Date() };

    dbo.collection("mqttevents").insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    });
  });
};

console.log("Started");
