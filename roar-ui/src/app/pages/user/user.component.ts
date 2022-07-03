import { HttpClient } from '@angular/common/http';
import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserInfoService } from 'src/app/service/user-info.service';
import { getNumberLiteral } from 'src/app/tools/format-data'
import { UserInfo } from 'src/app/tools/user-info';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  alias: string="";
  isFollowing: boolean = false;
  isMe: boolean = false;
  username: string="";
  posts: any[] = [];
  likes: any[] = [];
  shares: any[] = []
  followers: UserInfo[] = [];
  followings: UserInfo[] = [];
  count_followers = () => getNumberLiteral(this.followers.length);
  count_followings = () => getNumberLiteral(this.followings.length);
  tabSelected: number = 0;
  loadData: number = 0;

  constructor(private routes: ActivatedRoute, private router: Router, private _snackBar: MatSnackBar, private getter: UserInfoService) 
  {  }

  ngOnInit(): void {
    // TODO: check if user logged following alias
    this.routes.queryParams.subscribe(params=>{
      this.tabSelected = params["tab"] > 4 || params["tab"] < 0 ? 0 : params["tab"];
    });
    this.routes.params.subscribe(params => {
      // if alias == logged alias then redirect to /user/me
      if (params["alias"] == localStorage.getItem("alias"))
        this.router.navigate(["/user/me"]);

      // store alias
      this.alias = params["alias"] != "me" ? params["alias"] : localStorage.getItem("alias");
      this.isMe = (localStorage.getItem("alias") === this.alias) || (this.alias === "me");
      // store username if alias is me.
      if(this.alias == localStorage.getItem("alias"))
        this.username = localStorage.getItem("username") || "";
      else{
        // fetch username
        fetch(`http://${environment.IP}:${environment.port}/` + encodeURIComponent(this.alias) + "/info")
          .then(r => {
            if(r.status == 404)
              this.router.navigate(["/404"]);
            return r.json();
          })
          .then(r => {
            this.username = r.username;
          }).catch(e => {
            console.log(e);
          })
      }
      this.loadData += 1;
      // TODO: load data of user on init

      // * Load posts
      fetch(`http://${environment.IP}:${environment.port}/${encodeURIComponent(this.alias)}/posts`,
        {
          method: "GET",
          headers: {
            "accept": "application/json"
          }
        }
      )
      .then(r => {
        if (r.status == 200)
          return r.json();
        else return null;
      })
      .then(r => {
        console.log();
        // TODO save post in posts field
        this.loadData+= 1;
      })
      .catch(e => {
        this._snackBar.open("No connection to server!", "🚨", {
          horizontalPosition: "start",
          duration: 2000,
          verticalPosition: "bottom"
        });
      });

      // * Load shares
      fetch(`http://${environment.IP}:${environment.port}/${encodeURIComponent(this.alias)}/shares`,
        {
          method: "GET",
          headers: {
            "accept": "application/json"
          }
        }
      )
      .then(r => {
        if (r.status == 200)
          return r.json();
        else return null;
      })
      .then(r => {
        // TODO save shares in posts field
        this.loadData+= 1;

      })
      .catch(e => {
        this._snackBar.open("No connection to server!", "🚨", {
          horizontalPosition: "start",
          duration: 2000,
          verticalPosition: "bottom"
        });
      });

      // * Load likes
      fetch(`http://${environment.IP}:${environment.port}/${encodeURIComponent(this.alias)}/likes`,
      {
        method: "GET",
        headers: {
          "accept": "application/json"
        }
      }
    )
    .then(r => {
      if (r.status == 200)
        return r.json();
      else return null;
    })
    .then(r => {
      // TODO save likes in posts field
      this.loadData+= 1;

    })
    .catch(e => {
      this._snackBar.open("No connection to server!", "🚨", {
        horizontalPosition: "start",
        duration: 2000,
        verticalPosition: "bottom"
      });
    });

    // * Load followers
    this.getFollowers();

    // * Load followings
    this.getFollowings();
  })
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
    )
    .then(r => {
      if (r.status != 200){
        this._snackBar.open("Unfollow failed!", "🚨", {
          horizontalPosition: "start",
          duration: 2000,
          verticalPosition: "bottom"
        });
      }
      else {
        this.isFollowing = false;
      }
    })
    .catch(e => {
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
      }
    )
    .then(r => {
      if (r.status != 200){
        this._snackBar.open("Follow failed!", "🚨", {
          horizontalPosition: "start",
          duration: 2000,
          verticalPosition: "bottom"
        });
      }
      else this.isFollowing = true;
    })
    .catch(e => {
      this._snackBar.open("Follow failed!", "🚨", {
        horizontalPosition: "start",
        duration: 2000,
        verticalPosition: "bottom"
      })
    });
  }

  getFollowers(){
    this.getter.getFollowers(this.alias).subscribe(f => this.followers = f);
    this.loadData+= 1;

  }
  getFollowings(){
    this.getter.getFollowings(this.alias).subscribe(f => this.followings = f);
    this.loadData+= 1;

  }
}
