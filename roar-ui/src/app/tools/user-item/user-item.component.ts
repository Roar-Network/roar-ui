import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserInfo } from '../user-info';
import { environment } from 'src/environments/environment';
import encrypt from '../encrypt';

@Component({
  selector: 'user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent implements OnInit {
  @Input() following: boolean = false;
  @Input() alias: string = "";
  @Input() username: string = "";

  usr: UserInfo;
  
  constructor(private _snackBar: MatSnackBar) 
  {
    this.usr = {alias: this.alias, username: this.username};
  }

  ngOnInit(): void {
    this.usr = {alias: this.alias, username: this.username};
    console.log(this.usr);
  }

  onUnfollow(){
    fetch(`http://${environment.IP}:${environment.port}/me/unfollow/${encodeURIComponent(this.alias)}`, 
      {
        method: "DELETE",
        headers: {
          "accept": "application/json",
          "Authorization": `${localStorage.getItem("token")}`,
        }
      }
    ).then(r => {
      if (r.status == 200)
        this.following = false;
      else{
        this._snackBar.open("Unfollow failed!", "🚨", {
          horizontalPosition: "start",
          duration: 2000,
          verticalPosition: "bottom"
        });
      }
    }).catch(e => {
      this._snackBar.open("Unfollow failed!", "🚨", {
        horizontalPosition: "start",
        duration: 2000,
        verticalPosition: "bottom"
      })
    })
  }
  onFollow() {
    fetch(`http://${environment.IP}:${environment.port}/me/follow/${encodeURIComponent(this.alias)}`, 
    {
      method: "POST",
      headers: {
        "accept": "application/json",
        "Authorization": `${localStorage.getItem("token")}`,
      }
    })
    .then(r => {
      if (r.status == 200)
        this.following = false;
      else{
        this._snackBar.open("Follow failed!", "🚨", {
          horizontalPosition: "start",
          duration: 2000,
          verticalPosition: "bottom"
        });
      }
    })
    .catch(e => {
      this._snackBar.open("Follow failed!", "🚨", {
        horizontalPosition: "start",
        duration: 2000,
        verticalPosition: "bottom"
      })
    });
  }
}
