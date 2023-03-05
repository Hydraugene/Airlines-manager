import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { collection, deleteDoc, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore';
import { AvionI, PersonnelI, VolI } from '../modeles/compagnie-i';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompagnieService {

  mesVol:Array<VolI> = [];
  avions: Array<AvionI> = [];
  aeroports: Array<string> = [];
  personnels: Array<{ id: string, data: PersonnelI }> = [];
  vols: Array<{ id: string, data: VolI }> = []

  personnels$: BehaviorSubject<Array<{ id: string, data: PersonnelI }>> = new BehaviorSubject(<Array<{ id: string, data: PersonnelI }>>[]);
  vols$: BehaviorSubject<Array<{ id: string, data: VolI }>> = new BehaviorSubject(<Array<{ id: string, data: VolI }>>[]);


  constructor(private http:HttpClient, private readonly bdd:Firestore) {
    this.getVols();
    this.getAeroports();
    this.getFireVols();
  }

  getVols() {
    this.http.get<Array<VolI>>("assets/data/vols.json").subscribe(v => {
      this.mesVol = v
    })
  }


  getAeroports() {
    this.aeroports = ["PUF","CDG"];
  }


  async getFireAvs() {
    this.avions = [];
    await getDocs(collection(this.bdd, 'avions'))
      .then(av => {
        av.forEach(a => {
          //this.listeAvions.push({id:a.id, data:a.data() as AvionI}); 
          this.avions.push(a.data() as AvionI);
        })
      })
      .catch(erreur => console.log("Erreur", erreur));
  }

  // Requete pour récupérer une collection de personnell à partir de la firebase 
  async getFirePersonnels() {
    this.personnels = []; // reinitialized array list 
    await getDocs(collection(this.bdd, 'personnels'))
      .then((per) => {
        per.forEach(p => {
          //this.listePersonnels.push({id: p.id, data: p.data() as PersonnelI});
          this.personnels.push({ id: p.id, data: p.data() as PersonnelI });
        })
        this.personnels$.next(this.personnels);
      })
      .catch(err => console.log("Erreur", err));
  }

  //Recuperer un avion à partir de son code 
  async getFireAvions(code: string) {
    const docAvion = doc(this.bdd, "avions", code);
    await getDoc(docAvion);
    return docAvion
  }

  // Récuperer un personnel à partir de son id 
  async getPersonnelVols(id: string) {
    const docPersonnel = doc(this.bdd, "personnels", id);
    return await getDoc(docPersonnel);
  }

  // Recuperer une collection de vols 
  async getFireVols() {
    this.vols = []; // reinitialized array list 
    this.getFirePersonnels(); // recuperer la list des personnels 
    await getDocs(collection(this.bdd, 'attributions'))
      .then((vol) => {
        vol.forEach(v => {
          let listPersonnel: Array<PersonnelI> = []
          let aeroportDepart = "";
          let aeroportArrive = "";

          // on récupere la liste de personnels p
          v.data()["personnel"].forEach((el: PersonnelI) => {
            listPersonnel.push(el);
          });

          aeroportDepart = v.data()["aeroportDepart"]
          aeroportArrive = v.data()["aeroportArrive"]

          let data = v.data();
          data["personnel"] = listPersonnel as Array<PersonnelI>
          data["aeroportDepart"] = aeroportDepart
          data["aeroportArrive"] = aeroportArrive
          data["date"]= v.data()["date"].toDate()
          this.vols.push({ id: v.id, data: data as VolI });
        })
        this.vols$.next(this.vols);
      })
      .catch(err => console.log("Erreur", err));
  }


  //fonctions CREATE, UPDATE, DELETE pour les Avions

  // delete un avion à partir de son code 
  async delFireAvions(code: string) {
    const docAvion = doc(this.bdd, "avions", code);
    await deleteDoc(docAvion)
      .then((r) => {
        this.getFireAvs()
        alert("L'avion a été supprimé")
        console.log("L'avion à été supprimé")
      })
      .catch((err) => {
        console.log("L'avion n'a été supprimé")
      });
  }

  // Recuperer un avion à partir de son code 
  async updateFireAvions(code: string, data: AvionI) {
    const docAvion = doc(this.bdd, "avions", code);
    await setDoc(docAvion, data, { merge: true })
      .then((r) => {
        alert("L'avion a été mis à jour")
        console.log("L'avion à été mis à jour")
      })
      .catch((err) => {
        console.log("L'avion n'a été mis à jour")
      });
  }

  async addFireAvions(code: string, data: AvionI) {
    const docAvion = doc(this.bdd, 'avions', code);
    // Créer ou mettre à jour l'avion
    await setDoc(docAvion, data, { merge: true })
      .then((r) => {
        this.getFireAvs()
        alert("L'avion a été crée")
        console.log("L'avion à été crée")
      })
      .catch((err) => {
        console.log("L'avion n'a été crée")
      });
  }


  //fonctions CREATE, UPDATE, DELETE pour le personnel

   async addFirePersonnel(id: string, data: PersonnelI) {
    const docPersonnel = doc(this.bdd, 'personnels', id);
    // Créer ou mettre à jour le personnel
    await setDoc(docPersonnel, data, { merge: true })
      .then((r) => {
        this.getFirePersonnels()
        alert("Le personnel a été crée")
        console.log("Le personnel à été crée")
      })
      .catch((err) => {
        console.log("Le personnel n'a été crée")
      });
  }

  // Recuperer un personnel à partir de son id 
  async updateFirePersonnel(id: string, data: PersonnelI) {
    const docPersonnel = doc(this.bdd, "personnels", id);
    await setDoc(docPersonnel, data, { merge: true })
      .then((r) => {
        alert("L'avion a été mis à jour")
        console.log("L'avion à été mis à jour")
      })
      .catch((err) => {
        console.log("L'avion n'a été mis à jour")
      });
  }

  // delete un personnel à partir de son id 
  async delFirePersonnel(id: string) {
    const docPersonnel = doc(this.bdd, "personnels", id);
    await deleteDoc(docPersonnel)
      .then((r) => {
        this.getFirePersonnels()
        alert("Le personnel a été supprimé")
        console.log("Le personnel à été supprimé")
      })
      .catch((err) => {
        console.log("Le personnel n'a été supprimé")
      });
  }



  //fonctions CREATE, UPDATE, DELETE pour les Vols


   async addFireVols(id: string, data: VolI) {
    const docVol = doc(this.bdd, 'vols', id);
    // Créer ou mettre à jour le vol
    await setDoc(docVol, data, { merge: true })
      .then((r) => {
        this.getFireVols()
        alert("Le vol a été crée")
        console.log("Le vol à été crée")
      })
      .catch((err) => {
        console.log("Le vol n'a été crée")
      });
  }

  //Recuperer un vol à partir de son id 
  async updateFireVols(id: string, data: VolI) {
    const docVol = doc(this.bdd, "vols", id);
    await setDoc(docVol, data, { merge: true })
      .then((r) => {
        alert("Le vol a été mis à jour")
        console.log("Le vol à été mis à jour")
      })
      .catch((err) => {
        console.log("Le vol n'a été mis à jour")
      });
  }

  // delete un vol à partir de son id 
  async delFireVols(id: string) {
    const docVol = doc(this.bdd, "vols", id);
    await deleteDoc(docVol)
      .then((r) => {
        this.getFireVols()
        alert("Le vol a été supprimé")
        console.log("Le vol à été supprimé")
      })
      .catch((err) => {
        console.log("Le vol n'a été supprimé")
      });
  }
}
