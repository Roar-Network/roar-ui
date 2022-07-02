import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreatePostComponent } from '../create-post/create-post.component';
import { formatDate, getNumberLiteral } from '../format-data';

@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {


  @Input() username: string ="";
  // ? Post id
  @Input("postId") postId: string = "";
  // ? Author of the post
  @Input("author") authorName: string = "";
  // ? date of publication
  @Input("date") published: string = "";
  // ? text of post
  @Input("text") postText: string = "Plura mihi bona sunt, inclinet, amari petere vellent. Ab illo tempore, ab est sed immemorabili. Ullamco laboris nisi ut aliquid ex ea commodi consequat. Quae vero auctorem tractata ab fiducia dicuntur. At nos hinc posthac, sitientis piros Afros.";
  // ? how many favorite has the post
  @Input() countFav: number = 0;
  // ? how many coments has the post
  @Input() countComment: number = 0;
  // ? how many share has the post
  @Input() countShare: number = 0;
  // ? if the user logged liked this post
  @Input() fav: boolean = false;
  // ? if the user shared this post
  @Input() share: boolean = false;
  @Input() category: number = -1;
  
  countFavLit = () => getNumberLiteral(this.countFav);
  countShareLit = () => getNumberLiteral(this.countShare);
  countCommentLit = () => getNumberLiteral(this.countComment);

  isDarkTheme: boolean = localStorage.getItem("dark-theme") == "y";
  isYours: boolean = false;
  constructor(private dialog: MatDialog) {
  
  }

  ngOnInit(): void {
    this.published = formatDate(this.published);
    this.isYours = this.authorName == localStorage.getItem("alias");
  }
  
  onDelete(){
    // TODO: implement delete post
  }

  onLike(): void {
    console.log("like");
    this.fav = !this.fav;
  }
  onShare(): void{
    console.log("share");
    this.share = !this.share;
  }

  onComment(): void{
    console.log("comment");
    this.isDarkTheme = localStorage.getItem("dark-theme") == "y";
    const post_creator = this.dialog.open(CreatePostComponent, {panelClass: this.isDarkTheme ? "dark-theme": ""});
    post_creator.componentInstance.reply = this.postId;
    post_creator.componentInstance.replyToAlias = this.authorName;
    post_creator.componentInstance.onClose.on("CLOSE", () => {
      post_creator.close();
    });
  }

}
