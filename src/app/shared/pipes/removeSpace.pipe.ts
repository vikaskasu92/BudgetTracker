import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name:'removeSpace'
})
export class RemoveSpace implements PipeTransform{

    transform(value:string){
        return value.split(" ").join("");
    }

}