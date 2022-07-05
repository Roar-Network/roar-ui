import { Component, Inject, Input, NgModule, OnInit, Output, SimpleChange } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EventEmitter } from 'events';
import { environment } from 'src/environments/environment';
import { UserInfo } from '../user-info';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent implements OnInit {
  @Input() reply: string = "";
  @Input() replyToAlias: string = "";
  @Output() public onClose = new EventEmitter();
  current_usr: UserInfo = {alias: localStorage.getItem("alias") || "", username: localStorage.getItem("username") || "", isFollowing: false};
  isDarkTheme: boolean = localStorage.getItem("dark-theme") == "y" || false;

  constructor(private router: Router, private _snackBar: MatSnackBar) 
  {
  }

  ngOnInit(): void {
  }

  onSend(content: string) {
    let token = localStorage.getItem("token");
    if (token != "" && token != null){

      // TODO handle response from send post to db
      fetch(`http://${environment.IP}:${environment.port}/me/post?content=` + encodeURIComponent(content) + "&reply=" + encodeURIComponent(this.reply)  , {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Authorization": `${localStorage.getItem("token")}`
        }
      })
      .then(r => {
        if (r.status == 200){
          this._snackBar.open("Post sent!", "Close", {
            duration: 2000,
            verticalPosition: "bottom",
            horizontalPosition: "start"}
          );
          this.onClose.emit("CLOSE");
        }
        else{
          this._snackBar.open("Error sending post!", "Close", {
            duration: 2000,
            verticalPosition: "bottom",
            horizontalPosition: "start"
          });
        }
      })
      .catch(e => {
        this._snackBar.open("Error sending post!", "Close", {
          duration: 2000,
          verticalPosition: "bottom",
          horizontalPosition: "start"});
      })
    }
    else {
      this.onClose.emit("CLOSE");
      this.router.navigate(["/"]);
      
    }
  }

}
