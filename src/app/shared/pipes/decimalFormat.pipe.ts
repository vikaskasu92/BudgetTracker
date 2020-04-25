import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name:'decimalFormat'
})
export class DecimalFormatPipe implements PipeTransform{

    transform(value:number,toDecimal: number) {
      return value.toFixed(toDecimal);
    }
    
}