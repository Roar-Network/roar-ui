import { Component, Inject, Input, NgModule, OnInit, Output, SimpleChange } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EventEmitter } from 'events';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})
export class CreatePostComponent implements OnInit {
  @Input() reply: string = "";
  @Input() replyToAlias: string = "";
  @Output() public onClose = new EventEmitter();
  alias: string = localStorage.getItem("alias") || ""; 
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
      fetch("http://172.27.5.3:32020/me/post?content=" + encodeURIComponent(content) + "&reply=" + encodeURIComponent(this.reply)  , {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Authorization": localStorage.getItem("token") || ""
        }
      })
      this.onClose.emit("CLOSE");
      this._snackBar.open("Post sent!", "✅", {
        horizontalPosition: "start",
        verticalPosition: "bottom",
        duration: 1000,  
      });
    }
    else {
      this.onClose.emit("CLOSE");
      this.router.navigate(["/"]);
      
    }
  }

}
