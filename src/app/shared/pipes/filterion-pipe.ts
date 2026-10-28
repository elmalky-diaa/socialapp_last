import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterion',
})
export class FilterionPipe implements PipeTransform {
  transform(arr: any[], searchItem: string[]): any {
    return arr.filter((item) => {
      return searchItem.some((search) => {
        return Object.values(item).some((value) => {
          if (typeof value === 'string') {
            return value.toLowerCase().includes(search.toLowerCase());
          }
          return false;
        });
      });
    });
  }
}
