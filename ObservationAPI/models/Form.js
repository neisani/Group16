var db = require('../dbconnection');

var ObservationslipForm = {

    getAllObservationslipForms: function(callback) {
        return db.query("Select * from  observationsliptest ORDER BY Date DESC ", callback);
    },
    countSyncObservationslipForms: function(callback) {
      return db.query("Select COUNT(*) AS number from  observationsliptest WHERE SyncStatus = '0'", callback);
  },
  selectJustAddedRecord: function(callback){
    return db.query("Select * from observationsliptest WHERE SyncStatus = '0' ORDER BY O_CreationDate DESC LIMIT 1", callback);

  },
    getObservationslipFormById: function(id, callback) {
      return db.query("Select * from observationsliptest  where id = ?", [id], callback);
    },

    addObservationSlip: function(Observationslip, callback) {

      console.log(Observationslip);

      let sql = "INSERT INTO observationsliptest(Date, Userid, Station, TIME, TotalAmountOfAllClouds, TotalAmountOfLowClouds,TypeOfLowClouds1,  OktasOfLowClouds1, HeightOfLowClouds1,CLCODEOfLowClouds1, TypeOfLowClouds2,OktasOfLowClouds2, HeightOfLowClouds2, CLCODEOfLowClouds2, TypeOfLowClouds3,OktasOfLowClouds3, HeightOfLowClouds3, CLCODEOfLowClouds3, TypeOfMediumClouds1,OktasOfMediumClouds1, HeightOfMediumClouds1, CLCODEOfMediumClouds1, TypeOfMediumClouds2, OktasOfMediumClouds2, HeightOfMediumClouds2,  CLCODEOfMediumClouds2, TypeOfMediumClouds3, OktasOfMediumClouds3, HeightOfMediumClouds3, CLCODEOfMediumClouds3, TypeOfHighClouds1,OktasOfHighClouds1,   HeightOfHighClouds1, CLCODEOfHighClouds1, TypeOfHighClouds2, OktasOfHighClouds2, HeightOfHighClouds2, CLCODEOfHighClouds2,TypeOfHighClouds3,  OktasOfHighClouds3, HeightOfHighClouds3, CLCODEOfHighClouds3, CloudSearchLightReading, Rainfall, Dry_Bulb, Wet_Bulb,   Max_Read,Max_Reset, Min_Read, Min_Reset, Piche_Read, Piche_Reset, TimeMarksThermo, TimeMarksHygro, TimeMarksRainRec, Present_Weather,  Present_WeatherCode,Past_Weather, Visibility, Wind_Direction, Wind_Speed, Gusting, AttdThermo, PrAsRead, Correction, CLP,   MSLPr, TimeMarksBarograph, TimeMarksAnemograph, OtherTMarks, Remarks, O_SubmittedBy, Approved, SoilMoisture, SoilTemperature, sunduration,  trend, windrun,Max_temp,Min_temp, speciormetar, UnitOfWindSpeed, IndOrOmissionOfPrecipitation,TypeOfStation_Present_Past_Weather, HeightOfLowestCloud, StandardIsobaricSurface, GPM, DurationOfPeriodOfPrecipitation, GrassMinTemp,   CI_OfPrecipitation, BE_OfPrecipitation, IndicatorOfTypeOfIntrumentation, SignOfPressureChange, Supp_Info, VapourPressure, T_H_Graph, DeviceType ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?, ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?, ?,?,?,?,?,?,?,?,?) ";
      return db.query(sql,[Observationslip.Date, Observationslip.Userid, Observationslip.Station, Observationslip.TIME,  Observationslip.TotalAmontOfAllClouds, Observationslip.TotalAmountOfLowClouds,Observationslip.TypeOfLowClouds1,Observationslip.OktasOfLowClouds1, Observationslip.HeightOfLowClouds1,Observationslip.CLCODEOfLowClouds1,  Observationslip.TypeOfLowClouds2,
      Observationslip.OktasOfLowClouds2, Observationslip.HeightOfLowClouds2,Observationslip.CLCODEOfLowClouds2, Observationslip.TypeOfLowClouds3,Observationslip.OktasOfLowClouds3, Observationslip.HeightOfLowClouds3, Observationslip.CLCODEOfLowClouds3,
      Observationslip.TypeOfMediumClouds1,Observationslip.OktasOfMediumClouds1, Observationslip.HeightOfMediumClouds1, Observationslip.CLCODEOfMediumClouds1, Observationslip.TypeOfMediumClouds2, Observationslip.OktasOfMediumClouds2, Observationslip.HeightOfMediumClouds2,
      Observationslip.CLCODEOfMediumClouds2, Observationslip.TypeOfMediumClouds3, Observationslip.OktasOfMediumClouds3, Observationslip.HeightOfMediumClouds3, Observationslip.CLCODEOfMediumClouds3, Observationslip.TypeOfHighClouds1,
      Observationslip.OktasOfHighClouds1, Observationslip.HeightOfHighClouds1, Observationslip.CLCODEOfHighClouds1, Observationslip.TypeOfHighClouds2, Observationslip.OktasOfHighClouds2, Observationslip.HeightOfHighClouds2, Observationslip.CLCODEOfHighClouds2,
      Observationslip.TypeOfHighClouds3,  Observationslip.OktasOfHighClouds3, Observationslip.HeightOfHighClouds3, Observationslip.CLCODEOfHighClouds3, Observationslip.CloudSearchLightReading, Observationslip.Rainfall, Observationslip.Dry_Bulb, Observationslip.Wet_Bulb,
      Observationslip.Max_Read, Observationslip.Max_Reset, Observationslip.Min_Read, Observationslip.Min_Reset, Observationslip.Piche_Read, Observationslip.Piche_Reset, Observationslip.TimeMarksThermo, Observationslip.TimeMarksHygro, Observationslip.TimeMarksRainRec, Observationslip.Present_Weather,
      Observationslip.Present_WeatherCode, Observationslip.Past_Weather, Observationslip.Visibility, Observationslip.Wind_Direction, Observationslip.Wind_Speed, Observationslip.Gusting, Observationslip.AttdThermo, Observationslip.PrAsRead, Observationslip.Correction, Observationslip.CLP,
      Observationslip.MSLPr, Observationslip.TimeMarksBarograph, Observationslip.TimeMarksAnemograph, Observationslip.OtherTMarks, Observationslip.Remarks, Observationslip.O_SubmittedBy, Observationslip.Approved, Observationslip.SoilMoisture, Observationslip.SoilTemperature, Observationslip.sunduration,
      Observationslip.trend, Observationslip.windrun, Observationslip.Max_temp,Observationslip.Min_temp, Observationslip.speciormetar, Observationslip.UnitOfWindSpeed, Observationslip.IndOrOmissionOfPrecipitation,
      Observationslip.TypeOfStation_Present_Past_Weather, Observationslip.HeightOfLowestCloud, Observationslip.StandardIsobaricSurface, Observationslip.GPM, Observationslip.DurationOfPeriodOfPrecipitation, Observationslip.GrassMinTemp,
      Observationslip.CI_OfPrecipitation, Observationslip.BE_OfPrecipitation,Observationslip.IndicatorOfTypeOfIntrumentation, Observationslip.SignOfPressureChange, Observationslip.Supp_Info, Observationslip.VapourPressure,
      Observationslip.T_H_Graph, Observationslip.DeviceType], callback);
        },
        updateSyncStatus: function(id, synData, callback) {
          let sql = "UPDATE observationsliptest SET SyncStatus=? WHERE id=?";
          let data = ['1',id];
          console.log('executing query');
          return db.query(sql, data, callback);
        },
        // getUnsyncedObservationslip(){
        //   consol.log('execute select')
        //     return db.query("Select * from syncobservationslip WHERE SyncStatus = '0' ORDER BY O_CreationDate DESC LIMIT 1", callback);
        // },
        getUnsyncedObservationslip(){
          consol.log('execute select')
            return db.query("Select * from observationsliptest WHERE SyncStatus = '0' ORDER BY O_CreationDate DESC LIMIT 1", callback);

        },
      deleteObservationslip: function(id, callback) {
        return db.query("delete from systemusersTest where Userid = ?", [id], callback);
      },
      updateApproveStatus: function (id, Observationslip, callback){
        console.log(id);
        let sql = "UPDATE observationsliptest SET Approved = ?  WHERE id = ?";
        return db.query(sql, ['1', id]);

      },
    updateObservationSlipForm: function(id, Observationslip, callback){
      let sql = "UPDATE  observationsliptest SET Date = ? , Userid = ? , Station = ? , TIME = ? , TotalAmountOfAllClouds = ? , TotalAmountOfLowClouds = ? ,TypeOfLowClouds1 = ? ,  OktasOfLowClouds1 = ? , HeightOfLowClouds1 = ? ,CLCODEOfLowClouds1 = ? , TypeOfLowClouds2 = ? ,OktasOfLowClouds2 = ? , HeightOfLowClouds2 = ? , CLCODEOfLowClouds2 = ? , TypeOfLowClouds3 = ? ,OktasOfLowClouds3 = ? , HeightOfLowClouds3 = ? , CLCODEOfLowClouds3 = ? , TypeOfMediumClouds1 = ? ,OktasOfMediumClouds1 = ? , HeightOfMediumClouds1 = ? , CLCODEOfMediumClouds1 = ? , TypeOfMediumClouds2 = ? , OktasOfMediumClouds2 = ? , HeightOfMediumClouds2 = ? ,  CLCODEOfMediumClouds2 = ? , TypeOfMediumClouds3 = ? , OktasOfMediumClouds3 = ? , HeightOfMediumClouds3 = ? , CLCODEOfMediumClouds3 = ? , TypeOfHighClouds1 = ? ,OktasOfHighClouds1 = ? ,   HeightOfHighClouds1 = ? , CLCODEOfHighClouds1 = ? , TypeOfHighClouds2 = ? , OktasOfHighClouds2 = ? , HeightOfHighClouds2 = ? , CLCODEOfHighClouds2 = ? ,TypeOfHighClouds3 = ? ,  OktasOfHighClouds3 = ? , HeightOfHighClouds3 = ? , CLCODEOfHighClouds3 = ? , CloudSearchLightReading = ? , Rainfall = ? , Dry_Bulb = ? , Wet_Bulb = ? ,   Max_Read = ? ,Max_Reset = ? , Min_Read = ? , Min_Reset = ? , Piche_Read = ? , Piche_Reset = ? , TimeMarksThermo = ? , TimeMarksHygro = ? , TimeMarksRainRec = ? , Present_Weather = ? ,  Present_WeatherCode = ? ,Past_Weather = ? , Visibility = ? , Wind_Direction = ? , Wind_Speed = ? , Gusting = ? , AttdThermo = ? , PrAsRead = ? , Correction = ? , CLP = ? ,   MSLPr = ? , TimeMarksBarograph = ? , TimeMarksAnemograph = ? , OtherTMarks = ? , Remarks = ? , O_SubmittedBy = ? , Approved = ? , SoilMoisture = ? , SoilTemperature = ? , sunduration = ? ,  trend = ? , windrun = ? ,Max_temp = ? ,Min_temp = ? , speciormetar = ? , UnitOfWindSpeed = ? , IndOrOmissionOfPrecipitation = ? ,TypeOfStation_Present_Past_Weather = ? , HeightOfLowestCloud = ? , StandardIsobaricSurface = ? , GPM = ? , DurationOfPeriodOfPrecipitation = ? , GrassMinTemp = ? ,   CI_OfPrecipitation = ? , BE_OfPrecipitation = ? , IndicatorOfTypeOfIntrumentation = ? , SignOfPressureChange = ? , Supp_Info = ? , VapourPressure = ? , T_H_Graph = ? , DeviceType = ?   WHERE  id  =  ?";

      return db.query(sql,[Observationslip.Date, Observationslip.Userid, Observationslip.station, Observationslip.TIME,Observationslip.TotalAmountOfAllClouds, Observationslip.TotalAmountOfLowClouds,Observationslip.TypeOfLowClouds1,Observationslip.OktasOfLowClouds1, Observationslip.HeightOfLowClouds1,Observationslip.CLCODEOfLowClouds1,  Observationslip.TypeOfLowClouds2,
      Observationslip.OktasOfLowClouds2, Observationslip.HeightOfLowClouds2,Observationslip.CLCODEOfLowClouds2, Observationslip.TypeOfLowClouds3,Observationslip.OktasOfLowClouds3, Observationslip.HeightOfLowClouds3, Observationslip.CLCODEOfLowClouds3,
      Observationslip.TypeOfMediumClouds1,Observationslip.OktasOfMediumClouds1, Observationslip.HeightOfMediumClouds1, Observationslip.CLCODEOfMediumClouds1, Observationslip.TypeOfMediumClouds2, Observationslip.OktasOfMediumClouds2, Observationslip.HeightOfMediumClouds2,
      Observationslip.CLCODEOfMediumClouds2, Observationslip.TypeOfMediumClouds3, Observationslip.OktasOfMediumClouds3, Observationslip.HeightOfMediumClouds3, Observationslip.CLCODEOfMediumClouds3, Observationslip.TypeOfHighClouds1,
      Observationslip.OktasOfHighClouds1, Observationslip.HeightOfHighClouds1, Observationslip.CLCODEOfHighClouds1, Observationslip.TypeOfHighClouds2, Observationslip.OktasOfHighClouds2, Observationslip.HeightOfHighClouds2, Observationslip.CLCODEOfHighClouds2,
      Observationslip.TypeOfHighClouds3,  Observationslip.OktasOfHighClouds3, Observationslip.HeightOfHighClouds3, Observationslip.CLCODEOfHighClouds3, Observationslip.CloudSearchLightReading, Observationslip.Rainfall, Observationslip.Dry_Bulb, Observationslip.Wet_Bulb,
      Observationslip.Max_Read, Observationslip.Max_Reset, Observationslip.Min_Read, Observationslip.Min_Reset, Observationslip.Piche_Read, Observationslip.Piche_Reset, Observationslip.TimeMarksThermo, Observationslip.TimeMarksHygro, Observationslip.TimeMarksRainRec, Observationslip.Present_Weather,
      Observationslip.Present_WeatherCode, Observationslip.Past_Weather, Observationslip.Visibility, Observationslip.Wind_Direction, Observationslip.Wind_Speed, Observationslip.Gusting, Observationslip.AttdThermo, Observationslip.PrAsRead, Observationslip.Correction, Observationslip.CLP,
      Observationslip.MSLPr, Observationslip.TimeMarksBarograph, Observationslip.TimeMarksAnemograph, Observationslip.OtherTMarks, Observationslip.Remarks, Observationslip.O_SubmittedBy, Observationslip.Approved, Observationslip.SoilMoisture, Observationslip.SoilTemperature, Observationslip.sunduration,
      Observationslip.trend, Observationslip.windrun, Observationslip.Max_temp,Observationslip.Min_temp, Observationslip.speciormetar, Observationslip.UnitOfWindSpeed, Observationslip.IndOrOmissionOfPrecipitation,
      Observationslip.TypeOfStation_Present_Past_Weather, Observationslip.HeightOfLowestCloud, Observationslip.StandardIsobaricSurface, Observationslip.GPM, Observationslip.DurationOfPeriodOfPrecipitation, Observationslip.GrassMinTemp,
      Observationslip.CI_OfPrecipitation, Observationslip.BE_OfPrecipitation,Observationslip.IndicatorOfTypeOfIntrumentation, Observationslip.SignOfPressureChange, Observationslip.Supp_Info, Observationslip.VapourPressure,
      Observationslip.T_H_Graph, Observationslip.DeviceType, id], callback);
      }
};

module.exports = ObservationslipForm;
