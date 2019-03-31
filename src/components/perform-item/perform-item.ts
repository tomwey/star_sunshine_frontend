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

  format3Size(performer) {
    let chest_size = performer.chest_size > 0 ? performer.chest_size : '未知';
    let waist_size = performer.waist_size > 0 ? performer.waist_size : '未知';
    let hip_size = performer.hip_size > 0 ? performer.hip_size : '未知';
    // {{performer.chest_size}},{{performer.waist_size}},{{performer.hip_size}}
    return `胸围:${chest_size}, 腰围:${waist_size}, 臀围:${hip_size}`
  }

}
