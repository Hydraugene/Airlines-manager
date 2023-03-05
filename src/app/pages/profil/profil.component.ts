import { Component, Input, OnInit } from '@angular/core';
import { Auth, updateProfile } from '@angular/fire/auth';
import { doc, Firestore, setDoc } from '@angular/fire/firestore';
import { UserI } from 'src/app/modeles/id-i';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {


  @Input('blutinator') blublublu:string = ''
  user : UserI = <UserI>{}

  constructor(private auth:Auth, public userService: UserService, private bdd: Firestore) {
    
   }

  ngOnInit(): void {
    this.user = this.userService.getUser();
  }

  async update(){
    const docUser = doc(this.bdd,'users',this.auth.currentUser!.uid);
    // Créer ou mettre à jour l'utilisateur
    await setDoc(docUser,this.userService.user,{merge:true})
    .then((r) => console.log("L'utilisateur à été crée ou mis a jour") )
    .catch((err) => console.log("L'utilisateur n'a été crée"));

    // Modifié les données de l'utilisateur
    updateProfile(this.auth.currentUser!, {
     displayName: this.userService.user.nom
     }).then((r) => {
       console.log("les données ont bien été mis à jour");
     }).catch((error) => {
       console.log(error);
     })
   }
}
