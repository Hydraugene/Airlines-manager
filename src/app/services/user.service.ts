import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { UserI } from '../modeles/id-i';
import { collection, deleteDoc, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user : UserI;
  allUsers: UserI[];
  token: string | number = "monToken";

  constructor(private readonly auth:Auth, private readonly route:Router, private readonly bdd:Firestore) {
    this.allUsers=[] 
    this.user= <UserI>{}
  }

  getUser(){
    return this.user
  }

  // async identification(id : string, mdp:string){
  //   await signInWithEmailAndPassword(this.auth, id, mdp)
  //   .then(async item => {
  //     //await this.getFireProfil(id);
  //     await this.getUser(id)
  //     this.route.navigateByUrl("/intranet");
  //   }).catch(item => console.log(item))
  // } 

  async getFireAllProfils() {
    this.allUsers = [];
    await getDocs(collection(this.bdd, 'profils'))
    .then(ps => {
      console.log(ps);
      ps.forEach( p => {
        console.log(p.data());
        this.allUsers.push(p.data() as UserI);
      })

      console.log(this.allUsers);
    });
  }

  async getFireProfil(uid:string) {
    const docProfil = doc(this.bdd, 'profils', uid);
    this.user = await (await getDoc(docProfil)).data() as UserI;
    return this.user;
  }

  async delFireProfil(uid:string) {
    const docProfil = doc(this.bdd, 'profils', uid);
    await deleteDoc(docProfil);
  }

  async updateFireProfil(uid:string, data:UserI) {
    const docProfil = doc(this.bdd, 'profils', uid);
    await setDoc(docProfil, data, {merge:true});
  }

  async getAllUsers() {
    await this.getFireAllProfils()
  }

  signOut(){
    this.user=<UserI>{}
    this.route.navigateByUrl('/')
  }
}
