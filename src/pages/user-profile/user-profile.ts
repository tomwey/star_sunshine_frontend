import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Content } from 'ionic-angular';
import { iOSFixedScrollFreeze } from '../../provider/iOSFixedScrollFreeze';
import { jsClipboard } from '../../provider/jsClipboard';

/**
 * Generated class for the UserProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage {

  user: any = null;
  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController, 
    private toastCtrl: ToastController,
    private iosFixed: iOSFixedScrollFreeze,
    private jsCopy: jsClipboard,
    public navParams: NavParams) {
    this.user = this.navParams.data;
  }

  ionViewDidLoad() {
    this.iosFixed.fixedScrollFreeze(this.content);
    // console.log('ionViewDidLoad UserProfilePage');
  }

  copy() {
    this.jsCopy.copy(this.user.portal_url);

    let toast = this.toastCtrl.create({
      message: '复制成功！',
      duration: 1000
    });
    toast.present();
  }
}
