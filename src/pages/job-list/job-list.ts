import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { Tools } from '../../provider/Tools';
import { Media } from '../../provider/Media';

/**
 * Generated class for the JobListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-job-list',
  templateUrl: 'job-list.html',
})
export class JobListPage {

  jobs: any = [];
  error: any = null;

  // 分页
  pageNum: number = 1;
  totalPage: number = 1;
  pageSize: number = 20;

  hasMore: boolean = false;

  constructor(public navCtrl: NavController,
    private tools: Tools,
    private media: Media,
    private app: App,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad JobListPage');
    setTimeout(() => {
      this.loadData();
    }, 200);
  }

  loadData() {
    return new Promise((resolve) => {
      this.media.GetJobs(this.pageNum, this.pageSize)
        .then(res => {
          const data = res['data'];
          const total = res['total'];

          if (this.pageNum === 1) {
            this.jobs = data;
            if (this.jobs.length == 0) {
              this.error = "暂无数据";
            } else {
              this.error = null;
            }
          } else {
            let temp = this.jobs || [];
            this.jobs = temp.concat(data);
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

  openJob(job) {
    this.app.getRootNavs()[0].push('JobDetailPage', { job: job });
  }

  loadMore(e) {
    if (this.pageNum < this.totalPage) {
      this.pageNum++;

      this.loadData().then(() => {
        e.complete();
      });
    }
  }

}
