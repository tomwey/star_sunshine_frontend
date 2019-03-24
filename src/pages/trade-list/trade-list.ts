import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { Users } from '../../provider/Users';
import { iOSFixedScrollFreeze } from '../../provider/iOSFixedScrollFreeze';

/**
 * Generated class for the TradeListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-trade-list',
  templateUrl: 'trade-list.html',
})
export class TradeListPage {

  trades: any = [];
  hasMore: boolean = false;
  pageNo: number = 1;
  totalPage: number = 1;
  pageSize: number = 30;

  needsShowEmptyResult: boolean = false;

  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private users: Users,
              private iosFixed: iOSFixedScrollFreeze,
              ) {
  
    // this.loadTrades();
  }

  loadTrades(): Promise<any> {
    return new Promise((resolve) => {      
      this.users.GetTrades(this.pageNo, this.pageSize).then(data => {
        let res: any[] = data && data['data'];
        if (this.pageNo === 1) {
          this.trades = res['data'] || res;

          this.needsShowEmptyResult = this.trades.length === 0;
          
        } else {
          let temp = this.trades || [];
          this.trades = temp.concat(res['data']);
        }

        this.totalPage = Math.floor((res['total'] + this.pageSize - 1) / this.pageSize);

        this.hasMore = this.totalPage > this.pageNo;

        resolve();
      }).catch(error => {
        resolve();
      });
    });
    
  }

  doInfinite(e): void {
    if (this.pageNo < this.totalPage) {
      this.pageNo ++;

      this.loadTrades().then(() => {
        e.complete();
      });
    }
  }

  ionViewDidLoad() {
    this.iosFixed.fixedScrollFreeze(this.content);
    // console.log('ionViewDidLoad TradeList');
  }

  ionViewDidEnter() {
    this.loadTrades();
  }

}
