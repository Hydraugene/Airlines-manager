import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PageI } from '../modeles/page-i';

@Injectable({
  providedIn: 'root'
})
export class PagesService {

  mentions:PageI = {
    titre:"mentions legales depuis le service",
    contenu:`Ce site est complètement et totalement légal, garanti à 100%`
  }

  constructor(private readonly http:HttpClientModule) { }

  getPages(){
    //  this.http.get('assets/data/pages.json').subscribe({ p, p => {console.log(p); }})
  }

}
