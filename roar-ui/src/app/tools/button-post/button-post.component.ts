import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreatePostComponent } from '../create-post/create-post.component';

@Component({
  selector: 'app-button-post',
  templateUrl: './button-post.component.html',
  styleUrls: ['./button-post.component.css']
})
export class ButtonPostComponent implements OnInit {
  isDarkTheme: boolean = localStorage.getItem("dark-theme") == "y";

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }
  onCreatePostClick(){
    this.isDarkTheme = localStorage.getItem("dark-theme") == "y";
    const post_creator = this.dialog.open(CreatePostComponent, {panelClass: this.isDarkTheme ? "dark-theme": ""});
    post_creator.componentInstance.onClose.on("CLOSE", () => {
      post_creator.close();
    });
  }

}
