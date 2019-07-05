import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { TokenStorageService } from '../../services/auth/token-storage.service';
import { AuthLoginInfo } from '../models/user/login-info';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})




export class LoginComponent implements OnInit {
  form: any = {};
  isLoggedIn =  false;
  isLoginFailed =  false;
  errorMessage = '';
  roles: string[] = [];
  private loginInfo: AuthLoginInfo;
  returnUrl= '';

  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router: Router,

    ) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getAuthorities();
    }
    this.returnUrl = '/dashboard';

  }

  onSubmit() {
    console.log(this.form);

    this.loginInfo =  new AuthLoginInfo(
      this.form.username,
      this.form.password
    );

    this.authService.attemptAuth(this.loginInfo).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUsername(data.username);
        this.tokenStorage.saveAuthorities(data.authorities);
        this.isLoginFailed =  false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getAuthorities();
        this.router.navigate([this.returnUrl]);
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.reason;
        this.isLoginFailed =  true;
      }
    );
  }
}
