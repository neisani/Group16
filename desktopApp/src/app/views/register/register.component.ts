import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../services/allServices';
import { SignUpInfo } from '../models/user/signup-info';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})


export class RegisterComponent implements OnInit {
  form: any = {};
  signupInfo: SignUpInfo;
  isSignedUp = false;
  issignUpFailed =  false;
  errorMessage = '';

  constructor( private authService: AuthService) { }

  ngOnInit() {}

  onSubmit() {
    console.log(this.form);

    this.signupInfo = new SignUpInfo (
      this.form.name,
      this.form.username,
      this.form.email, 
      this.form.password,
      this.form.roles
    );
  
    this.authService.signUp(this.signupInfo).subscribe(
      data => {
        console.log(data);
        this.isSignedUp = true;
        this.issignUpFailed = false;
      },
      error => {
        console.log(error);
        this.errorMessage =  error.error;
        this.isSignedUp = true;
      }
    )
  }

}

