import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { getNumberLiteral } from 'src/app/tools/format-data'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  alias: string="";
  isFollowing: boolean = false;
  isMe: boolean = this.alias == localStorage.getItem("alias");
  username: string="";
  posts: any[] = [];
  likes: any[] = [];
  followers: any[] = [];
  followings: any[] = [];
  count_followers = () => getNumberLiteral(this.followers.length);
  count_followings = () => getNumberLiteral(this.followings.length);
  tabSelected: number = 0;
  
  constructor(private routes: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    // TODO: check if user logged following alias
    this.routes.queryParams.subscribe(params=>{
      this.tabSelected = params["tab"] > 4 || params["tab"] < 0 ? 0 : params["tab"];
    });
    this.routes.params.subscribe(params => {
      if (params["alias"] == localStorage.getItem("alias"))
        this.router.navigate(["/user/me"]);
      this.alias = params["alias"] != "me" ? params["alias"] : localStorage.getItem("alias");
      if(this.alias == localStorage.getItem("alias"))
        this.username = localStorage.getItem("username") || "";
      else{
        fetch("http://172.27.5.3:32020/" + this.alias + "/info")
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
      // TODO: load data of user on init
  })
  }
  onFollow(){
    // TODO: implement follow
  }
  onUnfollow(){
    // TODO: implement unfollow
  }

}
