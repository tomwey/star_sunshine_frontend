import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Users } from '../../provider/Users';
import { Tools } from '../../provider/Tools';

/**
 * Generated class for the NewApplyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-apply',
  templateUrl: 'new-apply.html',
})
export class NewApplyPage {

  apply: any = {
    name: '',
    phone: '',
    address: ''
  };
  constructor(public navCtrl: NavController,
    private users: Users,
    private tools: Tools,
    private viewCtrl: ViewController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad NewApplyPage');
  }

  commit() {
    if (!this.apply.name || !this.apply.name.trim()) {
      this.tools.showToast('姓名不能为空');
      return;
    }

    if (!this.apply.phone || !this.apply.phone.trim()) {
      this.tools.showToast('电话不能为空');
      return;
    }

    this.users.ApplyJob(this.navParams.data.job.id, this.apply)
      .then(() => {
        this.viewCtrl.dismiss('1');
      })
      .catch(error => {
        this.tools.showToast(error.message || '服务器超时，请重试');
      })
  }

  close() {
    this.viewCtrl.dismiss();
  }

}
