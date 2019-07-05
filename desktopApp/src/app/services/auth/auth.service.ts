import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtResponse } from './jwt-response';
import { AuthLoginInfo } from '../../views/models/user/login-info';
import { SignUpInfo } from '../../views/models/user/signup-info';
import { map } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private _loginUrl = 'http://localhost:3000/users/authenticate';
  private loginUrl = 'http://localhost:8081/api/auth/signin';
  // private loginUrl = '/api/auth/signin';
  private signupUrl = 'http://localhost:8081/api/auth/signup';
  private userApi = 'http://localhost:8081/api/users';

  checkResponse: any;

  constructor(
    private _http: Http,
    private http: HttpClient) { }

// login
  attemptAuth(credentials: AuthLoginInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.loginUrl, credentials, httpOptions);
  }

  // add user account
  signUp(info: SignUpInfo): Observable<string> {
    return this.http.post<string>(this.signupUrl, info, httpOptions);
  }

  loginUser(user){
    return this._http.post(this._loginUrl, user);
  }

  getUserDetails(id: number ): Observable <any>{
    // post to httpclient and display user details
    return this.http.get(this.userApi + '/' + id);
  }

  deleteUser(id: number): Observable <any> {
    console.log(id);
    return this._http.delete(this.userApi+'/delete/'+id);
  }

  getAllUsers(){
    // post to httpclient and display user details
    return this._http.get(this.userApi)
    .pipe(map(res=>{
      this.checkResponse =  res;
      if(this.checkResponse.body !== '0') {
        return res.json();
      }
    }));
  }

  updateUser(updatedUserInfo: SignUpInfo): Observable <any> {
    return this.http.put(this.userApi + '/' + 'update', updatedUserInfo, httpOptions);

  }
}
