import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content, App } from 'ionic-angular';
import { iOSFixedScrollFreeze } from '../../provider/iOSFixedScrollFreeze';
import { Media } from '../../provider/Media';
import { Tools } from '../../provider/Tools';

/**
 * Generated class for the PerformerDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-performer-detail',
  templateUrl: 'performer-detail.html',
})
export class PerformerDetailPage {

  performer: any;
  dataType: string = 'info';
  dataTypes = [
    {
      label: '基本信息',
      value: 'info'
    },
    {
      label: '作品',
      value: 'mv'
    },
    {
      label: '粉丝',
      value: 'follower'
    }
  ];

  error: any = null;
  data: any = [];

  pageNum: number = 1;
  totalPage: number = 1;
  pageSize: number = 20;

  hasMore: boolean = false;

  @ViewChild(Content) content: Content;
  constructor(public navCtrl: NavController,
    private iosFixed: iOSFixedScrollFreeze,
    private media: Media,
    private tools: Tools,
    private app: App,
    public navParams: NavParams) {
    this.performer = this.navParams.data.performer;
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad PerformerDetailPage');
    this.iosFixed.fixedScrollFreeze(this.content);

    setTimeout(() => {
      this.loadData();
    }, 300);
  }

  getAPIInterface() {
    switch (this.dataType) {
      case 'mv':
        return this.media.GetMyMedia(this.performer.id, this.pageNum, this.pageSize);
      case 'topic':
        return this.media.GetTopic('my_list', this.pageNum, this.pageSize);
      case 'like':
        return this.media.GetTopic('liked', this.pageNum, this.pageSize);
      case 'follower':
        return this.media.GetFollowers(
          'performer',
          this.performer.id,
          this.pageNum,
          this.pageSize);
      case 'follow':
        return this.media.GetFollowings(this.pageNum, this.pageSize);

      default:
        break;
    }

    return null;
  }

  loadData() {
    return new Promise((resolve) => {
      let promise = this.getAPIInterface();
      if (promise) {
        promise.then(res => {
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
      }

    });
  }

  segChanged() {
    this.error = null;
    if (this.dataType != 'info') {
      this.data = [];
      this.pageNum = 1;
      this.totalPage = 1;

      this.loadData();
    }
  }

  openMedia(media) {
    this.app.getRootNavs()[0].push('MediaDetailPage', media);
  }

  openOwnerZone(owner) {
    // console.log(owner);
    this.app.getRootNavs()[0].push('OwnerZonePage', { owner: owner, type: owner.type || 'user' });
  }

  follow(owner) {
    const action = !owner.followed ? 'create' : 'delete';

    this.media.Follow(action, 'Performer', owner.id)
      .then(res => {
        if (action == 'create') {
          owner.followed = true;
          owner.follows_count += 1;

        } else {
          owner.followed = false;
          owner.follows_count -= 1;
          if (owner.follows_count < 0) {
            owner.follows_count = 0;
          }
        }
      })
      .catch(error => {
        this.tools.showToast(error.message || '服务器出错了~');
      });
  }

}
