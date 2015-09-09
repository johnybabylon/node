var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/project4';
var path = require('path');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../views', 'index.html'));
});

router.post('/item', function(req, res) {
  
  var results = [];

  //Grab data from http request
  var data = {text: req.body.text, complete: false};

  //Get a Postgres client from the connection pool
  pg.connect(connectionString, function(err, client, done) {

    //SQL Query > Insert Data
    client.query("INSERT INTO items(text, complete) values($1, $2)", [data.text, data.complete]);

    //SQL Query > Select Data
    var query = client.query("SELECT * FROM items ORDER BY id ASC");

    //Stream results back on row at a time
    query.on('row', function(row) {
      results.push(row);
    });

    //After all data is returned, close connection and return results
    query.on('end', function() {
      client.end();
      return res.json(results);
    });

    //Handle Errors
    if(err) {
      console.log(err);
    }

  });

});

router.get('/items', function(req, res) {

  var results = [];

  // Get a Postgres client from the connection pool
  pg.connect(connectionString, function(err, client, done) {
  
    //SQL Query > Select Data
    var query = client.query("SELECT * FROM items ORDER BY id ASC;");
    
    // Stream results back one row at a time
    query.on('row', function(row) {
      results.push(row);
    });

    //After all data is returned, close connection and return results
    query.on('end', function() {
      client.end();
      return res.json(results);
    });

  //Handle Errors
  if(err) {
    console.log(err);
  }

});

});

//Update
router.put('/item/:id', function(req, res) {

  var results = [];

  //Grab data from the URL parameters
  var id = req.params.id;

  //Grab data from http request
  var data = {text: req.body.text, complete: req.body.complete};

  //Get a Postgres client from the connection pool
  pg.connect(connectionString, function(err, client, done) {

    //SQL Query > Update Data
    client.query("UPDATE items SET text=($1), complete=($2) WHERE id=($3)", [data.text, data.complete, id]);

    // SQL Query > Select Data
    var query = client.query("SELECT * FROM items ORDER BY id ASC");

   // Stream results back on row at a time
   query.on('row', function(row) {
     results.push(row);
   });

   //After all data is returned, close connection and return results
   query.on('end', function() {
     client.end();
     return res.json(results);
   });

  //Handle Errors
  if(err) {
    console.log(err);
  }

  });

});

//Delete

router.delete('/item/:id', function(req, res) {

  var results = [];

  //Grab data from the URL parameters
  var id = req.params.id;

  // Get Postgres client
  pg.connect(connectionString, function(err, client, done) {
  
    //SQL Query > Delete Data
    client.query("DELETE FROM items WHERE id=($1)", [id]);

    //SQL Query > Select Data
    var query = client.query("SELECT * FROM items ORDER BY id ASC");
  
    // Stream results back one row at a time
    query.on('row', function(row) {
      results.push(row);
    });

    //After all data is returned, close connection
    query.on('end', function() {
      client.end();
      return res.json(results);
    });

    //Handle Errors
    if(err) {
      console.log(err);
    }

  });

});

    

module.exports = router;
