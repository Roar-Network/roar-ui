import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from "@angular/material/bottom-sheet";
import { AuthenticatorComponent } from 'src/app/tools/authenticator/authenticator.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isDarkTheme = () => localStorage.getItem("dark-theme") == "y";

  constructor(private loginSheet: MatBottomSheet) { }

  ngOnInit(): void {
  }

  onGetStarted() {
    this.loginSheet.open(AuthenticatorComponent, {panelClass: this.isDarkTheme() ? ["dark-theme", "mat-app-background"]: "mat-app-background" });
  }
}
