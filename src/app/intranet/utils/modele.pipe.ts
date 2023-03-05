import { Pipe, PipeTransform } from '@angular/core';
import { AvionI } from '../modeles/compagnie-i';

@Pipe({
  name: 'modele'
})
export class ModelePipe implements PipeTransform {

  transform(modele: Array<AvionI>, filtre?:string): Array<AvionI> {
    if(!filtre || filtre.length == 0) return modele;
    if(modele.length == 0) return [];

    return modele.filter(m => m.modele.toLowerCase().indexOf(filtre.toLowerCase()) != -1);
  }

}
