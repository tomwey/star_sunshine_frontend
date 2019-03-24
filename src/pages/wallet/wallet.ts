import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, App, Events, Content } from 'ionic-angular';
import { Users } from '../../provider/Users';
import { iOSFixedScrollFreeze } from '../../provider/iOSFixedScrollFreeze';

/**
 * Generated class for the WalletPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wallet',
  templateUrl: 'wallet.html',
})
export class WalletPage {

  user: any = null;
  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController, 
    private users: Users,
    private app: App,
    private events: Events,
    private iosFixed: iOSFixedScrollFreeze,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.iosFixed.fixedScrollFreeze(this.content);
    
    this.events.subscribe('user:reload', () => {
      this.loadUserProfile();
    });
    // console.log('ionViewDidLoad WalletPage');
    setTimeout(() => {
      this.loadUserProfile();
    }, 100);
  }

  loadUserProfile(): void {
    this.users.GetUserProfile()
      .then(res => {
        this.user = res['data'];
      })
      .catch(error => {

      });
  }

  gotoTradeList() {
    this.app.getRootNavs()[0].push('TradeListPage');
  }

  gotoWithdraw(type) {
    this.app.getRootNavs()[0].push('WithdrawPage', { type: type });
  }

}
