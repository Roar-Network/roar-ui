import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import encrypt from "../encrypt";
import Swal from 'sweetalert2';


@Component({
  selector: 'app-authenticator',
  templateUrl: './authenticator.component.html',
  styleUrls: ['./authenticator.component.css']
})
export class AuthenticatorComponent implements OnInit {

  state = AuthStates.LOGIN;
  resetForm = this.fb.group({
    answer1: [''],
    answer2: [''],
    alias: [''],
    new_password: ['']
  });
  loginForm = this.fb.group({
    alias: [''],
    password: ['']
  });
  createForm = this.fb.group({
    alias: [''],
    password: [''],
    username: [''],
    answer1: [''],
    answer2: ['']
  });
  isDarkTheme: boolean = localStorage.getItem("dark-theme") == "y" || false;

  constructor(public fb: FormBuilder, private router: Router, public dialog: MatDialog) {}

  ngOnInit(): void { }
  
  onCreateSubmit(){
    let alias =  encodeURIComponent(this.createForm.controls["alias"].value);
    let username = encodeURIComponent(this.createForm.controls['username'].value);
    let password = encodeURIComponent(encrypt(this.createForm.controls['password'].value));
    let answer1 = encodeURIComponent(encrypt(this.createForm.controls['answer1'].value));
    let answer2 = encodeURIComponent(encrypt(this.createForm.controls["answer2"].value));

    // TODO: handle response of create user api request
    fetch(
      "http://172.27.5.2:32020/create_user?username=" + username + "&password=" + password + "&alias=" + alias + "&a1=" + answer1 + "&a2=" + answer2, 
      {
        method: "PUT", 
        headers: {
          'Accept': 'application/json'
        }
      }
    )
    .then(r => {
      if (r.status == 200)
        return r.json();
      Swal.fire("account created", "", "success");
      return r.json();
    })
    .then(r => console.log(r));
  }

  onLoginSubmit(){
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
        else 
          // TODO finish
          // this.dialog.open();
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
          // TODO: show error message in frontend 
        }
      })
      .catch(err => {
        this.unAuth();
        // TODO: show error message in frontend 
      });
  }

  onResetSubmit(){ 
    let alias = encodeURIComponent(this.resetForm.controls["alias"].value);
    let answer1 = encodeURIComponent(encrypt(this.resetForm.controls["answer1"].value));
    let answer2 = encodeURIComponent(encrypt(this.resetForm.controls["answer2"].value));
    let new_password = encodeURIComponent(encrypt(this.resetForm.controls["new_password"].value));

    // TODO: handle response of forgot password api request
    fetch(`http://${environment.IP}:${environment.port}/forgot_password?alias=${alias}&a1=${answer1}&a2=${answer2}&new_password=${new_password}`, {method: "PUT"})
  }
  
  unAuth(){ 
    console.log("NOK: Unauthorized");
    localStorage.setItem("token", ""); 
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