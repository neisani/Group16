var express = require('express');
var router = express.Router();
var Station = require('../models/Station');

// STATION

  // add new station
      router.post('/', function (req, res, next ) {
        Station.addStation(req.body, function (err, count) {
            if (err) {
              res.json(err);
            } else {
              res.json(req.body);
            }
          });
    });
    
    // return  station(s)
    router.get('/:id?', function(req, res, next) {
      if (req.params.id) {
        Station.getStationById(req.params.id, function (err, rows) {
          if (err){
            res.json(err);
          } else {
            res.json(rows);
          }
        });
      } else{
        // get all
        Station.getAllStations( function (err, rows ) {
          if (err) {
            res.json(err);
          } else {
            res.json (rows);
          }
        });
      }
    });


module.exports = router;
