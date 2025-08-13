import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterpipe',
  standalone: true
})
export class FilterpipePipe implements PipeTransform {

  transform(value:any,searchFilter:any):any {
    //return console.log(value);
    return value.filter((e:any)=>{
      return e.quote.toLowerCase().indexOf(searchFilter) > -1 || e.author.toLowerCase().indexOf(searchFilter) > -1 || e.date.toLowerCase().indexOf(searchFilter) > -1
    })
  }

}
