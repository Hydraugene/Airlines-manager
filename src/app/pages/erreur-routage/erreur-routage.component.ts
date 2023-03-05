import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-erreur-routage',
  templateUrl: './erreur-routage.component.html',
  styleUrls: ['./erreur-routage.component.css']
})
export class ErreurRoutageComponent implements OnInit {

  public imageChat : string = "<insert cute cat here>"
  constructor() { }

  ngOnInit(): void {
  }

}
