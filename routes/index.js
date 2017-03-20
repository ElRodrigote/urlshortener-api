var express = require('express');
var mongodb = require('mongodb');
var shortid = require('shortid');
var validUrl = require('valid-url');

var router = express.Router();
var mLab = "mongodb://localhost:27017/url-shortener-microservice";
var MongoClient = mongodb.MongoClient

/* GET home page. */
router.get('/new/:url(*)', function (req, res, next) {
    MongoClient.connect(mLab, function (err, db) {
      if (err) {
        console.log("Unable to connect to server", err);
      } else {
        console.log("Connected to server")
      };
      
      var collection = db.collection('links');
      var params = req.params.url;
      
      var newLink = function (db, callback) {
        var insertLink = { url: params, short: "test" };
        collection.insert([insertLink]);
        res.send(params);
      };
 
      newLink(db, function () {
        db.close();
      });
      
    });
    
    

});




module.exports = router;
