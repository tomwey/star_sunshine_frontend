import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the Num2strPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'num2str',
})
export class Num2strPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(num) {
    num = parseInt(num);
    if (num <= 0) {
      return '';
    }

    if (num < 1000) {
      return num.toString();
    }

    if (num < 10000) {
      return `${(num / 1000.00).toFixed(1)}K`;
    }

    return `${(num / 10000.00).toFixed(1)}W`;
  }
}
