import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-authenticator',
  templateUrl: './authenticator.component.html',
  styleUrls: ['./authenticator.component.css']
})
export class AuthenticatorComponent implements OnInit {

  state = AuthStates.LOGIN;
  constructor() { }

  ngOnInit(): void {
  }
  
  onForgot(){
    this.state = AuthStates.FORGOT_PASSWORD;
  }
  onCreate(){
    this.state = AuthStates.REGISTER;
  }
  onLogin(){
    this.state = AuthStates.LOGIN;
  }
  
  isAuthState(authState: AuthStates){
    return this.state == authState;
  }
}


export enum AuthStates {
  LOGIN,
  REGISTER,
  FORGOT_PASSWORD
}