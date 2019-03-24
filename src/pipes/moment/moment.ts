import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/zh-cn';

/**
 * Generated class for the MomentPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'moment',
})
export class MomentPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(date, format) {
    console.log(moment.locale())
    // moment.locale('zh');
    return moment(date).format(format);
  }
}
