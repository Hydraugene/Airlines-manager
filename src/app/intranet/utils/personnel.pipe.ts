import { Pipe, PipeTransform } from '@angular/core';
import { PersonnelI } from '../modeles/compagnie-i';

@Pipe({
  name: 'personnel'
})
export class PersonnelPipe implements PipeTransform {

  transform(personnel: Array<{ id: string, data: PersonnelI }>, filtre?:string): Array<{ id: string, data: PersonnelI }> {
    if (!filtre || filtre.length == 0) return personnel;
    if (personnel.length == 0) return [];
    return personnel.filter(p => p.id.toLowerCase().indexOf(filtre.toLowerCase()) != -1);
  }

}
