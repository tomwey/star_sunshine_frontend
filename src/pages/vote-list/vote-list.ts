import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, App, Content } from 'ionic-angular';
import { Tools } from '../../provider/Tools';
import { Media } from '../../provider/Media';
import { iOSFixedScrollFreeze } from '../../provider/iOSFixedScrollFreeze';

/**
 * Generated class for the VoteListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-vote-list',
  templateUrl: 'vote-list.html',
})
export class VoteListPage {

  // 分页
  pageNum: number = 1;
  totalPage: number = 1;
  pageSize: number = 20;

  // 加载数据
  error: any = null;
  data: any = [];

  hasMore: boolean = false;

  @ViewChild(Content) content: Content;
  
  constructor(public navCtrl: NavController, 
    private tools: Tools,
    private media: Media,
    private app: App,
    private iosFixed: iOSFixedScrollFreeze,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad VoteListPage');
    this.iosFixed.fixedScrollFreeze(this.content);

    setTimeout(() => {
      this.loadData();
    }, 300);
  }

  gotoDetail(vote) {
    this.app.getRootNavs()[0].push('VoteDetailPage', vote);
  }

  loadData() {
    return new Promise((resolve) => {
      this.media.GetVotes(this.pageNum, this.pageSize)
        .then(res => {
          const data = res['data'];
          const total = res['total'];

          if (this.pageNum === 1) {
            this.data = data;
            if (this.data.length == 0) {
              this.error = "暂无数据";
            } else {
              this.error = null;
            }
          } else {
            let temp = this.data || [];
            this.data = temp.concat(data);
            this.error = null;
          }

          this.totalPage = (total + this.pageSize - 1) / this.pageSize;
          
          // this.totalPage = Math.floor((data.total + this.pageSize - 1) / this.pageSize); 
          this.hasMore = this.totalPage > this.pageNum;

          resolve(true);
        })
        .catch(error => {
          if (this.pageNum == 1) {
            this.error = error.message;
          } else {
            this.error = null;
            this.tools.showToast(error.message || error);
          }
          resolve(false);
        });
    });
  }

  loadMore(e) {
    if (this.pageNum < this.totalPage) {
      this.pageNum ++;

      this.loadData().then(() => {
        e.complete();
      });
    }
  }

}
