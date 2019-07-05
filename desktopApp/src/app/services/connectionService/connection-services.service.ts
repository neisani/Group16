import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { first } from 'rxjs/operators';
import { BehaviorSubject, interval } from 'rxjs';
import { Http,Headers,Response,RequestOptions } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class ConnectionServiceService {

  public formsUrl:string='http://localhost:3000/forms';
  // public formsUrl:string='/forms';
  private wimeaOnlineApi:string='http://wimea.mak.ac.ug/wdr/wimeaDesktopApiconnect/insert.php';
  // private observationslipApi = '/api/observationslip';
  public connected$ =  new BehaviorSubject<boolean>(false);
  private config = 'http://wimea.mak.ac.ug/wdr/wimeaDesktopApiconnect/insert.php';
  public connState: boolean;
  private source = interval(9000);
  private idOfsyncedRecord;
  private countOfUnsyncedRecords;
  private dataSynced;
  constructor(private _http: HttpClient, private http: Http) {

    this.source.subscribe(() => {
      this._http.get(this.config, { observe: 'response'})
      .pipe(first())
      .subscribe(resp => {
        if(resp.status === 200 ) {
          this.connected(true);

          //sync data
          this.syncLocalData();

        }else{
          this.connected(false);
        }
      }), err => this.connected(false);
    });

    this.connected$.subscribe(connected => {
      console.log("connected: ", connected);
    });
    }

    connected(data: boolean) {
      this.connState = data;
      this.connected$.next(this.connState);
    }

    syncLocalData(){
      console.log('Syncing local data...............');

      //find out if there is unsynced dat first
      this.countSyncObservationslips().subscribe(
        res => {
          console.log(res[0].number);
          this.countOfUnsyncedRecords =  res[0].number;
          console.log('Count of unsynced records');
          console.log(this.countOfUnsyncedRecords);

        }, err => console.log(err)
      );

      // if there is a record that is not synced -> sync
      if(this.countOfUnsyncedRecords >0) {
      this.getUnsyncedRecord().subscribe(
        res => {
          console.log(res);
          var data = res[0].id;
          this.dataSynced = res;
          console.log('synced data');
          console.log(this.dataSynced);
          this.idOfsyncedRecord =data;
          if(data){
            console.log(data);
            this.syncRecord(res).subscribe(
              res => {
                console.log(res);
                //from update local data sync status
                  // this.updateSyncStatus(this.idOfsyncedRecord).subscribe(
                  this.updateSyncStatus(this.dataSynced).subscribe(
                    res => {
                      console.log(res);
                    }, err => console.log(err)
                  );

              },  err => console.log(err)
            );

          }
        }, err => console.log(err));

      } else {
        console.log('No record to sync');
      }

    }

    countSyncObservationslips(){
      return this._http.get(this.formsUrl+'/count');
    }


    // countSyncObservationslips(){
    //   return this._http.get(this.observationslipApi+'/countUnsynced');
    // }

    getUnsyncedRecord(){
      console.log('find record to sync');
      return this._http.get(this.formsUrl+'/recordToSync');
    }

    syncRecord(observationslip){
      let body = JSON.stringify(observationslip);
      let headers = new Headers({ 'Content-Type': 'application/json'});
      let options = new RequestOptions({ headers: headers });
      return this.http.post(this.wimeaOnlineApi, body, options)
      .map((response: Response) => response.json());

    }

    updateSyncStatus(id){
      console.log('update status');
      // console.log(id);
      // let body = JSON.stringify(id);
      // let headers = new Headers({ 'Content-Type': 'application/json'});
      // let options = new RequestOptions({ headers: headers });
      //   console.log(body);
      //   return this._http.put(this.formsUrl+'/updateLocalDataStatus/'+ id, body, options)
      // .map((response: Response) => response.json());
      console.log(id);
      let body = JSON.stringify(id);
      let headers = new Headers({ 'Content-Type': 'application/json'});
      let options = new RequestOptions({ headers: headers });
        // console.log(body);
        return this.http.put(this.formsUrl+'/updateSyncStatus', body, options)
      .map((response: Response) => response.json());

    }




}
