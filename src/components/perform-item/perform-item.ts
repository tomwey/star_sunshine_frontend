import { Component, Input } from '@angular/core';
import { Media } from '../../provider/Media';
import { Tools } from '../../provider/Tools';
// import { PerformerListPage } from '../../pages/performer-list/performer-list';

/**
 * Generated class for the PerformItemComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'perform-item',
  templateUrl: 'perform-item.html'
})
export class PerformItemComponent {

  @Input() performer: any;

  constructor(private mediaServ: Media, private tools: Tools) {
    // console.log('Hello PerformItemComponent Component');
    // this.text = 'Hello World';
  }

  follow(performer, ev: Event) {
    ev.stopPropagation();
    const action = !performer.followed ? 'create' : 'delete';

    this.mediaServ.Follow(action, 'Performer', performer.id)
      .then(res => {
        if (action == 'create') {
          performer.followed = true;
        } else {
          performer.followed = false;
        }
      })
      .catch(error => {
        this.tools.showToast(error.message || '服务器出错了~');
      });
  }

}
