import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'avions'
})
export class AvionsPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
