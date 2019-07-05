import { Injectable } from '@angular/core';
import { Station } from '../../views/models/station/station';
import { Observationslip } from '../../views/models/observationslip/observationslip';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Http,Headers,Response,RequestOptions } from '@angular/http';
import 'rxjs/Rx';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};



@Injectable()

export class DataService {

  public url:string='http://localhost:3000/Tasks';
  public formsUrl:string='http://localhost:3000/forms';
    // public formsUrl:string='/forms';
  public stationsUrl:string='http://localhost:3000/stations';
  // private wimeaOnlineURL:string='http://wimea.mak.ac.ug/wdr/ionic_login/wimeaAppconnect/insert.php';
  private wimeaOnlineApi:string='http://wimea.mak.ac.ug/wdr/wimeaDesktopApiconnect/insert.php';
  private wimeaOfflineURL:string='http://localhost/ionic_login/wimeaDesktopApiconnect/insert.php';
  // private observationslipApi = 'http://localhost:8081/api/observationslip';
  private observationslipApi = '/api/observationslip';
  private connectionStatus;


  constructor(private _http: Http, private http: HttpClient) {

    }
  // STATION
      //add a station
      createStation(station: Station){
        let body = JSON.stringify(station);
        let headers = new Headers({ 'Content-Type': 'application/json'});
        let options = new RequestOptions({ headers: headers });

        return this._http.post(this.stationsUrl, body, options)
        .map((response: Response) => response.json());
      }

      getStationDetails(){
        return this._http.get(this.stationsUrl);
      }

  //OBSERVATIONSLIP

    getAllObservationslips(){
      return this._http.get(this.formsUrl);
    }
    // getAllObservationslips(){
    //   return this._http.get(this.observationslipApi+'/getAll');
    // }

    getObservationslip(id: number): Observable <any> {
      return this.http.get(this.formsUrl+ '/'+id);
    }

    // getObservationslip(id: number): Observable <any> {
    //   return this.http.get(this.observationslipApi+ '/'+id);
    // }

    getReportObservationslips(){
      return this._http.get(this.formsUrl)
      .map(res => res.json());
    }


    countSyncObservationslips(){
      return this._http.get(this.formsUrl+'/count');
    }
    // countSyncObservationslips() {
    //   return this._http.get(this.observationslipApi + '/'+ 'countUnsynced');
    // }

    updateObservatonslip(observationslip: Observationslip){
      let body = JSON.stringify(observationslip);
      let headers = new Headers({ 'Content-Type': 'application/json'});
      let options = new RequestOptions({ headers: headers });
      return this._http.put(this.formsUrl+'/updateObservationslip', body, options)
      .map((response: Response) => response.json());
    }

    approveObservationslip(observationslip: Observationslip){
      let body = JSON.stringify(observationslip);
      console.log(body);
      // let body = JSON.stringify(observationslip);
      let headers = new Headers({ 'Content-Type': 'application/json'});
      let options = new RequestOptions({ headers: headers });
      return this._http.put(this.formsUrl+'/approve', body, options)
      .map((response: Response) => response.json());
    }

    // updateObservatonslip(observationslip: Observationslip): Observable <any>{
    //    return this.http.put(this.observationslipApi+'/updateObservationslip', observationslip, httpOptions);
    // }


    // createObservationslip(observationslip: Observationslip){
    //   let body = JSON.stringify(observationslip);
    //   let headers = new Headers({ 'Content-Type': 'application/json'});
    //   let options = new RequestOptions({ headers: headers });
    //     return this._http.post(this.observationslipApi+ '/create', body, options)
    //   .map((response: Response) => response.json());
    //
    // }

    createObservationslip(observationslip: Observationslip){
      let body = JSON.stringify(observationslip);
      let headers = new Headers({ 'Content-Type': 'application/json'});
      let options = new RequestOptions({ headers: headers });
        return this._http.post(this.formsUrl+ '/create', body, options)
      .map((response: Response) => response.json());

    }

    // update sync status
    updateSyncStatus(id){
      console.log(id);
      let body = JSON.stringify(id);
      console.log(body);
      let headers = new Headers({ 'Content-Type': 'application/json'});
      let options = new RequestOptions({ headers: headers });
        // console.log(body);
        return this._http.put(this.formsUrl+'/updateSyncStatus', body, options)
      .map((response: Response) => response.json());

    }


    //save observationslip online
    syncObservationslip(observationslip: Observationslip){
      let body = JSON.stringify(observationslip);
      let headers = new Headers({ 'Content-Type': 'application/json'});
      let options = new RequestOptions({ headers: headers });
          return this._http.post(this.wimeaOnlineApi, body, options)
      .map((response: Response) => response.json());

    }



}
