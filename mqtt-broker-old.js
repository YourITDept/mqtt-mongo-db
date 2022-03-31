// MQTT Defined
var mqtt = require('mqtt')  
var mqttOptions = {
  clientId: 'MQTTBroker01',
  port: 1883,
  username: 'nodered',
  password: 'goNodered01'
}
var deviceRoot = "esp32/output/"  

// MongoDB Defined
var mongodb = require('mongodb');  
var mongodbClient = mongodb.MongoClient;  
// var mongodbURI = 'mongodb://username:password@127.0.0.1:27017/database'
var mongodbURI = 'mongodb://127.0.0.1:27017/database'
const url = 'mongodb://localhost:27017';
const dbName = 'myproject1';
const assert = require('assert');

var collection,client; 

mongodbClient.connect(mongodbURI, setupCollection);

function setupCollection(err, db) {  
  if (err) throw err;

  const db = client.db(dbName);
  collection = db.collection("test_mqtt");

  //client = mqtt.createClient(1883,'localhost');
  client = mqtt.connect('mqtt://127.0.0.1', mqttOptions);
  client.subscribe(deviceRoot+"+");
  client.on('message', insertEvent);
}

function insertEvent(topic,payload) {  
  var key = topic.replace(deviceRoot,'');

  collection.update(  
  { _id:key },
  { $push: { events: { event: { value:payload, when:new Date() } } } },
  { upsert:true },
  function(err,docs) {
    if(err) { console.log("Insert fail"); } // Improve error handling
  }
  )
}



const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'myproject1';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);
  getDbStats(db, function() {
    client.close();
  });
});


function getDbStats(db, callback) {
  db.command({'dbStats': 1}, function(err, results) {
    console.log(results);
    callback();
  });
};


var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  var myobj = { name: "Company Inc", address: "Highway 37" };
  dbo.collection("customers").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
});
