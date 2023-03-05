import { Component, OnInit } from '@angular/core';
import { IdI, UserI } from 'src/app/modeles/id-i';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
})
export class ConnexionComponent implements OnInit {

  id:IdI={id:'', passe:''};
  user:UserI = <UserI>{};
  

  constructor(private http:HttpClient, private router:Router, private userService:UserService, private authService: AuthService) { }

  ngOnInit(): void {
  }

  // checkId(){
  //   this.http.get<UserI>(`assets/ids/${this.id.id}@${this.id.passe}.json`).subscribe(
  //     retour => {console.log('Gut', retour); this.userService.user = retour; this.router.navigateByUrl('/intranet');},
  //     erreur => {console.log('Arhtung');},
  //   )

  // }
  checkFromFire(){
    this.authService.identification(this.id.id as string, this.id.passe as string);
  }

}
