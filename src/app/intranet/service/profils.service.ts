import { Injectable } from '@angular/core';
import { User, getAuth ,createUserWithEmailAndPassword, deleteUser } from '@angular/fire/auth';
import { Firestore, collection, doc, getDocs, setDoc, deleteDoc } from '@angular/fire/firestore';
import { IdI, UserI } from 'src/app/modeles/id-i';
import { UserService } from 'src/app/services/user.service';


@Injectable({
  providedIn: 'root'
})
export class ProfilsService {

  id: IdI = <IdI>{};
  user: UserI = <UserI>{};
  users: Array<UserI> = [];

  constructor(private bdd: Firestore, private userService:UserService) { }
  
  async getFireUser(){
    this.users = [];
    await getDocs(collection(this.bdd, 'users'))
      .then(u => {
        u.forEach(user => {
          let data: UserI = user.data() as UserI
          data.uid = user.id;
          this.users.push(data);
        })
      })
      .catch(erreur => console.log("Erreur", erreur));  
  }

  getUserByUid(uid: string | number){
    this.userService.getFireProfil(uid as string).then(data => this.user = data);
  }

  getIdByUser(user: User): string | number {
    let userId: string | number = ""; 
    userId = user.uid as string | number;
    return userId;
  }

  /** Check if userID exist in list */
  idInListUsers(uid:string | number): boolean {
    let val: boolean = false;
    this.users.forEach( element => uid == element.uid ? val = true : console.log("not in array", element))
    return val;
  }

  createAuthUser(new_user: UserI, id: IdI){
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, id.id, id.passe)
      .then((userCredential) => {
        const user = userCredential.user;
        new_user.uid = user.uid;
        this.addFireUser(new_user);
        console.log('USER CREATED',user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('ErrorCode : ', errorCode, ', ' ,errorMessage);
      });
  }

  deleteAuthUser(id: string) {
    const auth = getAuth();
    const user = auth.currentUser;

    //deleteUser(user).then(() => {
    // User deleted.
    //}).catch((error) => {
    // An error ocurred
    // ...
    //});
  }

  /***
   * function CREATE, UPDATE, DELETE USER
   */

  async addFireUser(user :UserI) {
    const docUser = doc(this.bdd, 'users', user.uid as string);
    // Créer ou mettre à jour l'ustilisateur
    await setDoc(docUser, user, { merge: true })
      .then((r) => {
        alert("L'utilisateur a été crée")
        console.log("L'utilisateur à été crée")
      })
      .catch((err) => {
        console.log("L'utilisateur n'a été crée")
      });
  }

  /** Recuperer un utilisateur à partir de son id */
  async updateFireUser(data: UserI) {
    const docUser = doc(this.bdd, "users", data.uid as string);
    await setDoc(docUser, data, { merge: true })
      .then((r) => {
        alert("L'utilisateur a été mis à jour")
        console.log("L'utilisateur à été mis à jour")
      })
      .catch((err) => {
        console.log("L'utilisateur n'a été mis à jour")
      });
  }

  async delFireUser(id: string) {
    const docUser = doc(this.bdd, "users", id);
    await deleteDoc(docUser)
      .then((r) => {
        alert("L'utilisateur a été supprimé")
        console.log("L'utilisateur à été supprimé")
      })
      .catch((err) => {
        console.log("L'utilisateur n'a été supprimé")
      });
  }


}

