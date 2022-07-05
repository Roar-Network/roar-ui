import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'post-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  icons: string[] = ["public", "science", "medical_services", "school", "devices", "directions_run", "monetization_on", "live_tv","family_restroom", "diversity_3"]
  texts: string[] = ["Society & Culture", "Science & Math", "Health", "Education", "Computer & Internet", "Sports", "Business & Finance", "Entertainment", "Family", "Government & Politics"]
  @Input() index: number = -1;
  constructor() { }

  ngOnInit(): void {
  }

  getIconText(): string {
    if(this.index == -1 || this.index > this.icons.length)
      return "";
    return this.icons[this.index -1];
  }
  getText(): string {
    if(this.index == -1 || this.index > this.texts.length)
      return "";
    return this.texts[this.index-1];
  }
}
