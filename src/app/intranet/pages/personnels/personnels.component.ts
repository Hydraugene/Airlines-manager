import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PersonnelI } from '../../modeles/compagnie-i';
import { CompagnieService } from '../../service/compagnie.service';

@Component({
  selector: 'app-personnels',
  templateUrl: './personnels.component.html',
  styleUrls: ['./personnels.component.css']
})
export class PersonnelsComponent implements OnInit, OnDestroy {

  filtreModelePersonnels:string = '';
  pers:PersonnelI = <PersonnelI>{};


  personnel :{id: string, data: PersonnelI} = <{id: string, data: PersonnelI}>{};


  // list local des personnels pour montrer de la manipulation d'observable
  persoLocaux : Array<PersonnelI> = [];
  listHabilitations : Array<string> = [];
  subs: Subscription = new Subscription();

  constructor(public compagnieService:CompagnieService) { }

  ngOnInit(): void {
    // appel des données dans firebase
    this.compagnieService.getFirePersonnels();
    this.personnel.data = this.pers;
    
  }

  
  selectPersonnel(nom:string | number):void {
    this.personnel = this.compagnieService.personnels.find(p => p.id == nom)!  ;

  }

  codeInList(code:string | number): boolean {
    let val: boolean = false;
    this.compagnieService.personnels.forEach( element => code == element.id ? val = true : console.log("not in array", element))
    return val;
  }
/* Ajouter un personnel dans la db */
  addPersonnel(id:string | number){
    let val = this.codeInList(id);
    if(val){
      console.log("Le personnel existe déjà : ", id);
      alert("Le personnel existe déjà !")
    }else{
      id = this.personnel.data.nom + "-" + this.personnel.data.prenom;
      this.compagnieService.addFirePersonnel(id as string, this.personnel.data)
    }
  }

  /** Mettre à jour notre avion */
  updatePersonnel(code: number | string) {
    let val = this.codeInList(code);
    if(val){
      this.compagnieService.updateFirePersonnel(code as string, this.personnel.data);
      console.log("le personnel va être mis a jour");
    }else{
      alert("Le personnel à modifier n'existe pas ")
      console.log("Le vol à modifier n'existe pas : ", code);
    }
    
  }  

  /** Supprimer le vol selectionner */
  deletePersonnel(id: string | number) {
    let val = this.codeInList(id);
    if(val){
      this.compagnieService.delFirePersonnel(id as string);
      console.log("le personnel a été supprimé");
    }else{
      alert("Le personnel sélectionné n'existe pas")
      console.log("Le personnel sélectionné n'existe pas");
    }
  }


  /** Annuler la selection sur un personnel */
  resetPersonnel(){
    this.personnel =  <{id: string, data: PersonnelI}>{};
    this.personnel.data = this.pers;
  }
 

  // Lorsque le composant est detruit, la souscriptions à l'observable est arrêté aussi
  ngOnDestroy() {
    this.subs.unsubscribe();
  }

}



