import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nullToZero'
})
export class NullToZeroPipe implements PipeTransform {

  transform(value: number):number {
    if(value == null){
      return 0;
    }
    return value;
  }

}
