import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginRequestPayload } from './login-request.payload';
import { AuthService } from '../shared/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { error } from '@angular/compiler/src/util';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginRequestPayload: LoginRequestPayload;
  registerSuccessMessage: string;
  isError: boolean;

  constructor(private authService: AuthService, private router: Router,
        private toastr: ToastrService,private activatedRoute: ActivatedRoute) {
    this.loginRequestPayload = {
      username: '',
      password: ''
    };

    this.activatedRoute.queryParams.subscribe(params => {
      if(params.registered != undefined && params.registered === 'true'){
        this.toastr.success('Signup successful');
        this.registerSuccessMessage = 'Please Check your inbox for activation email activate your account before you Login!';
      }
    });
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('',Validators.required),
      password: new FormControl('',Validators.required)
    });
  }

  login(){
    this.loginRequestPayload.username = this.loginForm.get('username').value;
    this.loginRequestPayload.password = this.loginForm.get('password').value;

    this.authService.login(this.loginRequestPayload).subscribe(data => {
       this.isError = false;
       this.router.navigateByUrl('');
       this.toastr.success('Login Successful');
    },error =>{
       this.isError = true;
       throwError(error);
    });
  }

}
