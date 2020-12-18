var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";

MongoClient.connect(url, (err, db) => {
  if (err) throw err;
  var dbo = db.db("testdb")
  dbo.collection("test").find({"password":"pass1"}).toArray( function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});