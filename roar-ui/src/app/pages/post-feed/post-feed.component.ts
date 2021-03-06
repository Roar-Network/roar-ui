import { Component, OnInit } from '@angular/core';
import { UserInfoService } from 'src/app/service/user-info.service';
import { getIP }  from 'src/app/tools/system-network';
import { Post } from 'src/app/tools/post';
import { interval } from "rxjs";


@Component({
  selector: 'app-post-feed',
  templateUrl: './post-feed.component.html',
  styleUrls: ['./post-feed.component.css']
})
export class PostFeedComponent implements OnInit {
  isDarkTheme: boolean = localStorage.getItem("dark-theme") == "y";
  alias: string = localStorage.getItem("alias") || "";
  username: string = localStorage.getItem("username") || "";
  feed: Post[] = [];
  loading: boolean = true;

  constructor(private getter: UserInfoService) { }

  ngOnInit(): void {
    this.loading = true;
    this.getFeeds();
    getIP();
  }
  getFeeds(){
    this.getter.getFeed().subscribe(p =>
      {
        this.feed = p
        this.loading = false;
      }
    );
    interval(15000).subscribe(() => {
      this.getter.getFeed().subscribe(p =>
        {
          this.feed = p
          this.loading = false;
        }
      );
    });
  }
}
