import { Component, OnInit } from '@angular/core';
import { PagesService } from 'src/app/services/pages.service';

@Component({
  selector: 'app-mentions',
  templateUrl: './mentions.component.html',
  styleUrls: ['./mentions.component.css']
})
export class MentionsComponent implements OnInit {

  public secretDevoile:boolean=false;

  constructor(public page: PagesService) { }

  ngOnInit(): void {
  }

  public secret(){
    this.secretDevoile=!this.secretDevoile
  }

}
