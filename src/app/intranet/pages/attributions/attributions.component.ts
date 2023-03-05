import { Component, OnInit } from '@angular/core';
import { VolI } from '../../modeles/compagnie-i';
import { CompagnieService } from '../../service/compagnie.service';

@Component({
  selector: 'app-attributions',
  templateUrl: './attributions.component.html',
  styleUrls: ['./attributions.component.css']
})
export class AttributionsComponent implements OnInit {

  mesVols: {id: string, data: VolI} = <{id: string, data: VolI}>{};

  // paramtre pour filtre
  filtreModele:string = '';
  filtreModeleAttribution:string = '';
  

  constructor(public compagnies:CompagnieService) { }

  ngOnInit(): void {
    this.compagnies.getFireVols();
    this.mesVols.data = <VolI>{};
    //this.vol.data.avion = <AvionI>{};
    //this.vol.data.personnel = Array<PersonnelI>;
    this.mesVols.data.aeroportDepart = "BLU";
    this.mesVols.data.aeroportArrive = "ULB";
    this.mesVols.data.date
  }


  selectVols(id:string | number):void {
    this.mesVols = this.compagnies.vols.find(p => p.id == id)!  ;
  }

  codeInList(code:string | number): boolean {
    let val: boolean = false;
    this.compagnies.vols.forEach( element => code == element.id ? val = true : console.log("not in array", element))
    return val;
  }

  elementtInList(value: string, champs: string): boolean {
    let val: boolean = false; 
    switch(champs) {
      case "avions":
        this.compagnies.avions.forEach( element => value == element.modele ? val = true : console.log("not in array", element));
        break;
      case "personnels" :
        this.compagnies.personnels.forEach( element => value == element.id ? val = true : console.log("not in array", element));
        break;
      // case "aeroport":
      //   this.compagnies.aeroports.forEach( element => value == element.name ? val = true : console.log("not in array", element))
    }
    return val
  }

  /* Ajouter un Vols dans la db */
  addVols(id:string | number){
    let val = this.codeInList(id);
    if(val){
      console.log("Le vol existe déjà : ", id);
      alert("Le vol existe déjà !")
    }else{
      this.compagnies.addFireVols(id as string, this.mesVols.data)
    }
  }

  /** Mettre à jour notre vol */
  updateVols(code: number | string) {
    let val = this.codeInList(code);
    if(val){
      this.compagnies.updateFireVols(code as string, this.mesVols.data);
      console.log("le vol va être mis a jour");
    }else{
      alert("Le vol à modifoer n'existe pas ")
      console.log("Le vol à modifoer n'existe pas : ", code);
    }
  }

  /** Supprimer le vol selectionner */
  deleteVols(id: string | number) {
    let val = this.codeInList(id);
    if(val){
      this.compagnies.delFireVols(id as string);
      console.log("le vol a été supprimé");
    }else{
      alert("Le vol sélectionné n'existe pas")
      console.log("Le vol sélectionné n'existe pas");
    }
  }

  /** Annuler la selection sur un Vols */
  resetVols(){
    this.mesVols =  <{id: string, data: VolI}>{};
    this.mesVols.data = <VolI>{};
  }

}
