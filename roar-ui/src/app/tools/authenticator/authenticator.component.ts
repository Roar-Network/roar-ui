import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import encrypt from "../encrypt";
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-authenticator',
  templateUrl: './authenticator.component.html',
  styleUrls: ['./authenticator.component.css']
})
export class AuthenticatorComponent implements OnInit {

  state = AuthStates.LOGIN;
  resetForm = this.fb.group({
    answer1: ['', Validators.required],
    answer2: ['', Validators.required],
    alias: ['', Validators.required],
    new_password: ['', Validators.required]
  });
  loginForm = this.fb.group({
    alias: ['', Validators.required],
    password: ['', Validators.required]
  });
  createForm = this.fb.group({
    alias: ['', Validators.required],
    password: ['', Validators.required],
    username: ['', Validators.required],
    answer1: ['', Validators.required],
    answer2: ['', Validators.required]
  });
  isDarkTheme: boolean = localStorage.getItem("dark-theme") == "y" || false;

  constructor(public fb: FormBuilder, private router: Router, private _snackBar: MatSnackBar) {}

  ngOnInit(): void { }
  
  onCreateSubmit(){
    if (this.createForm.invalid)
      return;
    let alias =  encodeURIComponent(this.createForm.controls["alias"].value);
    let username = encodeURIComponent(this.createForm.controls['username'].value);
    let password = encodeURIComponent(encrypt(this.createForm.controls['password'].value));
    let answer1 = encodeURIComponent(encrypt(this.createForm.controls['answer1'].value));
    let answer2 = encodeURIComponent(encrypt(this.createForm.controls["answer2"].value));

    // TODO: handle response of create user api request
    fetch(
      `http://${environment.IP}:${environment.port}/create_user?username=` + username + "&password=" + password + "&alias=" + alias + "&a1=" + answer1 + "&a2=" + answer2, 
      {
        method: "PUT", 
        headers: {
          'Accept': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    )
    .then(r => {
      if (r.status != 200)
      {
        this._snackBar.open("Registration failed!", "🚨", {
          horizontalPosition: "start",
          verticalPosition: "bottom",
          duration: 2000,  
        });
      }
      else this.state = AuthStates.LOGIN;
    })
    .catch(e => {
      this._snackBar.open("No connection to server!", "🙈", {
        horizontalPosition: "start",
        verticalPosition: "bottom",
        duration: 2000,  
      });
    });
  }

  onLoginSubmit(){
    if (this.loginForm.invalid)
      return;
    // get datas from login form
    let alias = encodeURIComponent(this.loginForm.controls["alias"].value);
    let password = encodeURIComponent(encrypt(this.loginForm.controls["password"].value));

    // get token from API
    fetch(`http://${environment.IP}:${environment.port}/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Accept": "application/json"
      },
      body: `grant_type=&username=${alias}&password=${password}&scope=&client_id=&client_secret=`
    }).then(res => {
        // if status code is 200 then we are good
        if(res.status == 200)
          return res.json()
        else if(res.status == 401){
          this._snackBar.open("Wrong credentials!", "🔒", {
            horizontalPosition: "start",
            verticalPosition: "bottom",
            duration: 2000,  
          });
        }
        else {
          this._snackBar.open("Unexpected error!", "🚨", {
            horizontalPosition: "start",
            verticalPosition: "bottom",
            duration: 2000,  
          });
        }
        return null;
      })
      .then(res => {
        if (res != null){
          // save token in local storage
          localStorage.setItem("token", `Bearer ${res["access_token"]}`);
          fetch(`http://${environment.IP}:${environment.port}/${alias}/info`, {
            method: "GET",
            headers: {
              "accept": "application/json",
            }
          })
          .then(r => r.json())
          .then(r => {
            // save user info in local storage
            localStorage.setItem("alias", r["alias"]);
            localStorage.setItem("username", r["username"]);
            localStorage.setItem("followings", r["following"]);
            localStorage.setItem("followers", r["followers"]);
            this.router.navigate(["/postfeed"]).then(() => window.location.reload());
          })
        }
        else{
          this.unAuth();
        }
      })
      .catch(err => {
        this.unAuth();
        this._snackBar.open("No connection to server!", "🙈", {
          horizontalPosition: "start",
          verticalPosition: "bottom",
          duration: 2000,  
        });
      });
  }

  onResetSubmit(){ 
    if (this.resetForm.invalid)
       return;
    let alias = encodeURIComponent(this.resetForm.controls["alias"].value);
    let answer1 = encodeURIComponent(encrypt(this.resetForm.controls["answer1"].value));
    let answer2 = encodeURIComponent(encrypt(this.resetForm.controls["answer2"].value));
    let new_password = encodeURIComponent(encrypt(this.resetForm.controls["new_password"].value));

    // TODO: handle response of forgot password api request
    fetch(`http://${environment.IP}:${environment.port}/forgot_password?alias=${alias}&a1=${answer1}&a2=${answer2}&new_password=${new_password}`, {method: "PUT"})
  }
  
  unAuth(){ 
    console.log("NOK: Unauthorized");
    localStorage.clear(); 
    localStorage.setItem("dark-theme",  this.isDarkTheme ? "y" : "n");
  }

  onForgot(){ this.state = AuthStates.FORGOT_PASSWORD; }
  onCreate(){ this.state = AuthStates.REGISTER; }
  onLogin(){ this.state = AuthStates.LOGIN; }
  isAuthState(authState: AuthStates){ return this.state == authState; }
}


export enum AuthStates {
  LOGIN,
  REGISTER,
  FORGOT_PASSWORD
}