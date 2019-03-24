import { Component, Input } from '@angular/core';

/**
 * Generated class for the JobItemComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'job-item',
  templateUrl: 'job-item.html'
})
export class JobItemComponent {

  // text: string;

  @Input() job: any;

  constructor() {
    // console.log('Hello JobItemComponent Component');
    // this.text = 'Hello World';
  }

}
