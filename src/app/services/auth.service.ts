import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { signInWithEmailAndPassword } from '@firebase/auth';
import { UserI } from '../modeles/id-i';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public readonly auth:Auth, private readonly route:Router, public userService:UserService) { }

  identification(mail: string, mdp: string){
    signInWithEmailAndPassword(this.auth, mail, mdp)
    .then(a => {      
      this.userService.getFireProfil(this.auth.currentUser?.email as string)
      .then(user => {
        this.route.navigateByUrl('/intranet');
      })
      
    })
    .catch(err => console.log(err));
  }

  signOut(){
    this.userService.user = <UserI>{};
    this.auth.signOut();
  }

}
