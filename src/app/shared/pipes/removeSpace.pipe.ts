import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name:'removeSpace'
})
export class RemoveSpacePipe implements PipeTransform{

    transform(value:string){
        return value.split(" ").join("");
    }

}