import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Content } from 'ionic-angular';
import { Pays } from '../../provider/Pays';
import { Wechat } from '../../provider/Wechat';
import { iOSFixedScrollFreeze } from '../../provider/iOSFixedScrollFreeze';

/**
 * Generated class for the ChargePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-charge',
  templateUrl: 'charge.html',
})
export class ChargePage {

  charge: any = { money: 0 };
  // customMoney: number = null;

  @ViewChild(Content) content: Content;

  chargeList: any = [];
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private viewController: ViewController,
              private pays: Pays,
              private wechat: Wechat,
              private iosFixed: iOSFixedScrollFreeze,
            ) {
  }

  ionViewDidLoad() {
    this.iosFixed.fixedScrollFreeze(this.content);
  }

  ionViewDidEnter() {
    // console.log('ionViewDidLoad ChargePage');
    // this.tool.showLoading('加载中...');

    this.pays.GetChargeList().then(data => {
      // console.log('moneys: ' + data);
      // this.chargeList = data;
      this.chargeList = data['data'];

      // this.charge.money = parseInt(this.chargeList[0]);
      // this.tool.hideLoading();
    })
    .catch(error => {
      // console.log(error);
      // this.tool.hideLoading();

      // this.chargeList = [10, 20, 50, 100, 200];
    })
  }

  changeMoney(money): void {
    this.charge.money = money;
    // this.customMoney  = null;
  }

  doCharge(): void {
    // console.log(this.charge.money);

    this.pays.ApplyCharge(this.charge.money, 1)
      .then(res => {
        let data = res['data'];
        if (data) {
          if (data['pay_url']) {
            // # H5微信支付
            window.location.href = data['pay_url'];
          } else {
            // 微信公众号支付，在微信客户端调用
            this.wechat.pay(data)
              .then(res => {
                // this.close();
                this.viewController.dismiss(1)
                .then(data => {
                  // console.log(data);
                })
                .catch(error=>{
                  // console.log(error);
                })
              })
              .catch(error => {

              });
          }
          
        }
      })
      .catch(error => {

      });
  }

  close(): void {
    this.viewController.dismiss()
      .then(data => {
        // console.log(data);
      })
      .catch(error=>{
        // console.log(error);
      })
  }

}
