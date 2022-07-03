import { Component } from '@angular/core';
import { MatBottomSheet } from "@angular/material/bottom-sheet";
import { Router } from '@angular/router';
import { AuthenticatorComponent } from 'src/app/tools/authenticator/authenticator.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  alias: string = localStorage.getItem("alias") || "";
  title: string = 'Roar';
  isDarkTheme: boolean = localStorage.getItem("dark-theme") == "y";
  isLogged: boolean = localStorage.getItem("token") != null && localStorage.getItem("token") != "";

  constructor(private loginSheet: MatBottomSheet, private router: Router)
  {
    let mdt = localStorage.getItem("dark-theme");
    if (mdt == "y")
      this.isDarkTheme = true;
    else localStorage.setItem("dark-theme", "n");
  }

  updateDark(e: any){
    let mdt = localStorage.getItem("dark-theme");
    if (mdt == "y" && this.isDarkTheme){
      localStorage.setItem("dark-theme", "n");
      this.isDarkTheme = false;
    }
    else if (mdt == "n" && !this.isDarkTheme){
      localStorage.setItem("dark-theme", "y");
      this.isDarkTheme = true;
    }
    e.checked = this.isDarkTheme;
  }

  onLoginClick(){
    this.loginSheet.open(AuthenticatorComponent, {panelClass: this.isDarkTheme ? ["dark-theme", "mat-app-background"]: "mat-app-background" });
  }

  onLogoutClick(){
    localStorage.clear();
    localStorage.setItem("dark-theme", "n");
    this.router.navigate(["/"]).then(() => window.location.reload());
  }
}
