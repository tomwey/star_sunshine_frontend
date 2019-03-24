import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, Content } from 'ionic-angular';
import { Pays } from '../../provider/Pays';
import { Tools } from '../../provider/Tools';
import { iOSFixedScrollFreeze } from '../../provider/iOSFixedScrollFreeze';

/**
 * Generated class for the WithdrawPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-withdraw',
  templateUrl: 'withdraw.html',
})
export class WithdrawPage {

  user: any = null;
  type: number = null;
  title: string = null;
  namePlaceholder: string = null;

  moneyOptions: any = [];
  money: number = 10;

  account: any = { no: '', name: '' };

  withdrawData: any = null;
 
  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private pays: Pays,
              private events: Events,
              private iosFixed: iOSFixedScrollFreeze,
              private tools: Tools,
            ) {
    // this.user = this.navParams.data.user;
    this.type = this.navParams.data.type;

    this.title = this.type === 2 ? '支付宝提现' : '微信提现';
    this.namePlaceholder = this.type === 2 ? '支付宝实名认证的姓名' : '微信绑定的银行卡真实姓名';
  }

  ionViewDidLoad() {
    this.iosFixed.fixedScrollFreeze(this.content);
  }

  ionViewWillEnter(): void {
    // this.tool.showLoading('拼命加载中...');
    this.pays.GetWithdrawList()
      .then(data => {
        // this.tool.hideLoading();
        let res = data['data'];

        this.money = parseInt(res.items[0]);
        
        let arr = [];
        res.items.forEach(item => {
          arr.push({
            label: `${item}元`,
            value: item,
          })
        });

        this.moneyOptions = arr;

        this.withdrawData = data;
      })
      .catch(error => {
      });
  }

  commit(): void {
    let money   = parseInt(this.money.toString());
    let accNo   = this.type === 2 ? this.account.no : this.account.name;
    let accName = this.account.name;
    let note    = this.type === 2 ? '支付宝提现' : '微信提现';

    if (!accNo) {
      this.tools.showToast('提现账号不能为空');
      return;
    }

    if (!accName) {
      this.tools.showToast('提现姓名不能为空');
      return;
    }

    this.tools.showLoading('提交中...');

    this.pays.ApplyWithdraw({ money: money, 
                              account_no: accNo, 
                              account_name: accName, 
                              type: this.type, 
                              note: note})
      .then(data => {
        // this.tool.hideLoading();
        
        // let res = data['data'];
        // this.user.balance = res.balance;

        // setTimeout(() => {
          // this.tool.showToast('提现申请成功');
          // if (this.type == 2) {
            this.tools.showToast('提现成功');
          // } else {
          //   this.tools.showToast('提现成功，请到支付宝账户查看');
          // }
          
          
          this.events.publish('user:reload');

          this.navCtrl.pop();
        // }, 200);
      })
      .catch(error => {

      });
  }

}
