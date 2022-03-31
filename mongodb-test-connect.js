const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'mqtt';

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
