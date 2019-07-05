var db = require('../dbconnection');

var Station = {
    // station
      addStation: function(Station, callback) {
        let sql = 'INSERT INTO stations (StationName, StationNumber, StationRegNumber, Location, Indicator, StationRegion, Country, Latitude, Longitude, Altitude,StationStatus, StationType) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)';
        let data = [Station.stationName, Station.stationNumber, Station.stationRegNumber, Station.location, Station.indicator,Station.region, Station.country, Station.latitude, Station.longitude,Station.altitude, Station.status, Station.stationType];

        return db.query(sql, data, callback);
      },
      getStationById: function(id, callback) {         
        return db.query("Select * from  stations where station_id = ?",[id], callback);
    },
    getAllStations: function(callback) {
      return db.query("Select * from  stations", callback);
  }
};

module.exports = Station;
