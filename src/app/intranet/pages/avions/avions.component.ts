import { Component, OnInit } from '@angular/core';
import { AvionI } from '../../modeles/compagnie-i';
import { CompagnieService } from '../../service/compagnie.service';

@Component({
  selector: 'app-avions',
  templateUrl: './avions.component.html',
  styleUrls: ['./avions.component.css']
})
export class AvionsComponent implements OnInit {
  avion:AvionI = <AvionI>{};

  filtreModeleAvions:string = '';
  constructor(public compagnies:CompagnieService) { }

  ngOnInit(): void {
    this.compagnies.getFireAvs()    
  }

  selectAvion(code:string | number):void {
    this.avion = this.compagnies.avions.find(av => av.code === code)!;
  }

  codeInListAvion(code:string | number): boolean {
    let val: boolean = false;
    this.compagnies.avions.forEach( element => code == element.code ? val = true : console.log("not in array", element))
    return val;
  }

  addAvion(code:string | number){
    let val = this.codeInListAvion(code);
    if(val){
      console.log("L'avion existe déjà : ", code);
      alert("L'avion existe déjà !")
    }else{
      this.compagnies.addFireAvions(code as string, this.avion)
    }
  }

  // Mettre à jour notre avion 
  updateAvion(code: number | string) {
    let val = this.codeInListAvion(code);
    if(val){
      this.compagnies.updateFireAvions(code as string, this.avion);
      console.log("l'avion va être mis a jour");
    }else{
      alert("L'avion à modifier n'existe pas ")
      console.log("L'avion à modifier n'existe pas : ", code);
    }
    
  }

  // Supprimer l'avion selectionner
  deleteAvion(code: string | number) {
    let val = this.codeInListAvion(code);
    if(val){
      this.compagnies.delFireAvions(code as string);
      console.log("l'avion a été supprimé");
    }else{
      alert("L'avion sélectionné n'existe pas")
      console.log("L'avion sélectionné n'existe pas");
    }
  }

  // Annuler la selection sur un avion
  resetAvion(){
    this.avion = <AvionI>{};
  }
}
