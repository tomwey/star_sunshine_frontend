import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { Media } from '../../provider/Media';
import { Tools } from '../../provider/Tools';
import { ImageViewerController } from 'ionic-img-viewer';
import { App } from 'ionic-angular/components/app/app';
import { iOSFixedScrollFreeze } from '../../provider/iOSFixedScrollFreeze';

/**
 * Generated class for the OwnerZonePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-owner-zone',
  templateUrl: 'owner-zone.html',
})
export class OwnerZonePage {

  owner: any = null;
  ownerType: string = null;

  dataType: string = 'topic';

  dataTypes: any = null;

  pageNum: number = 1;
  totalPage: number = 1;
  pageSize: number = 20;

  // 加载数据
  error: any = null;
  data: any = [];

  hasMore: boolean = false;

  currentMedia: any = null;
  
  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController, 
    private media: Media,
    private tools: Tools,
    private app: App,
    private iosFixed: iOSFixedScrollFreeze,
    private imageVC: ImageViewerController,
    public navParams: NavParams) {
    this.owner = this.navParams.data.owner;
    this.ownerType = this.navParams.data.type;

    if (this.ownerType == 'user') {
      this.dataTypes = [
        {
          label: '动态',
          value: 'topic',
        },
        {
          label: '喜欢',
          value: 'like'
        },
        {
          label: '粉丝',
          value: 'follower'
        },
        {
          label: '关注',
          value: 'follow'
        }
      ];
    } else {
      this.dataTypes = [
        // {
        //   label: '动态',
        //   value: 'topic',
        // },
        {
          label: 'MV',
          value: 'mv'
        },
        {
          label: '粉丝',
          value: 'follower'
        }
      ];
    }

    this.dataType = this.navParams.data.dataType || this.dataTypes[0].value;
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad OwnerZonePage');
    this.iosFixed.fixedScrollFreeze(this.content);
    
    setTimeout(() => {
      this.loadData();
    }, 300);
  }

  openOwnerZone(owner) {
    // console.log(owner);
    this.app.getRootNavs()[0].push('OwnerZonePage', { owner: owner, type: owner.type || 'user' });
  }

  openMedia(media) {
    this.app.getRootNavs()[0].push('MediaDetailPage', media);
  }

  openTopic(topic) {
    if (topic.type == 0) {
      this.app.getRootNavs()[0].push('MediaDetailPage', topic.media);
    } else {
      this.app.getRootNavs()[0].push('TopicDetailPage', topic);
    }
  }

  follow(owner) {
    const action = !owner.followed ? 'create' : 'delete';

    let type = owner.type;
    console.log(owner);

    type = type.charAt(0).toUpperCase() + type.slice(1);

    this.media.Follow(action, type, owner.id)
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

  presentImage(ev: Event, myImage) {
    ev.stopPropagation();
    const imageViewer = this.imageVC.create(myImage);
    imageViewer.present();
  }

  segChanged() {
    this.data = [];
    this.error = null;
    this.pageNum = 1;
    this.totalPage = 1;

    this.loadData();
  }

  getAPIInterface() {
    switch (this.dataType) {
      case 'mv':
        return this.media.GetMyMedia(this.owner.id, this.pageNum, this.pageSize);
      case 'topic':
        return this.media.GetTopic('my_list', this.pageNum, this.pageSize);
      case 'like':
        return this.media.GetTopic('liked', this.pageNum, this.pageSize);
      case 'follower':
        return this.media.GetFollowers(
          this.ownerType, 
          this.owner.id, 
          this.pageNum, 
          this.pageSize);
      case 'follow':
        return  this.media.GetFollowings(this.pageNum, this.pageSize);
    
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

  loadMore(e) {
    if (this.pageNum < this.totalPage) {
      this.pageNum ++;

      this.loadData().then(() => {
        e.complete();
      });
    }
  }

}
