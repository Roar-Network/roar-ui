import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent implements OnInit {
  @Input() following: boolean = false;
  @Input() alias: string = "";
  @Input() username: string = "";
  constructor() { }

  ngOnInit(): void {
  }
  onUnfollow(){
    // TODO implement unfollow
  }
  onFollow() {
    // TODO implement follow
  }
}
