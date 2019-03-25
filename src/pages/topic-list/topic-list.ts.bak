import { Component, ViewChild } from '@angular/core';
import { /*IonicPage, */NavController, NavParams, ModalController, App, Content } from 'ionic-angular';
import { Media } from '../../provider/Media';
import { Tools } from '../../provider/Tools';
import { VgAPI } from 'videogular2/core';
import { ImageViewerController } from 'ionic-img-viewer';
import { iOSFixedScrollFreeze } from '../../provider/iOSFixedScrollFreeze';

/**
 * Generated class for the TopicListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-topic-list',
  templateUrl: 'topic-list.html',
})
export class TopicListPage {

  // 分页
  pageNum: number = 1;
  totalPage: number = 1;
  pageSize: number = 20;
  
  // 加载数据
  error: any = null;
  topics: any = [];
  
  hasMore: boolean = false;

  dataType: string = 'latest';

  currentMedia: any = null;
  currentMedia2: any = null;

  @ViewChild(Content) content: Content;
  
  audioPlayer: any = null;

  currentAudio: any = null;

  constructor(public navCtrl: NavController, 
    private media: Media,
    private tools: Tools,
    private app: App,
    private iosFixed: iOSFixedScrollFreeze,
    private imageVC: ImageViewerController,
    private modalCtrl: ModalController,
    public navParams: NavParams) {
    this.audioPlayer = new Audio();
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad TopicListPage');
    this.iosFixed.fixedScrollFreeze(this.content);

    setTimeout(() => {
      this.loadData();
    }, 20);
  }

  playAudio(ev:Event, audio) {
    ev.stopPropagation();

    if (this.currentAudio == audio) {
      audio.playing = !audio.playing;
      if (audio.playing) {
        this.audioPlayer.play();
      } else {
        this.audioPlayer.pause();
      }
    } else {
      if (!this.currentAudio) {
      } else {
        this.currentAudio.playing = false;
      }

      this.audioPlayer.src = audio.url;
      this.audioPlayer.play();

      audio.playing = true;
      this.currentAudio = audio;
    }
  }

  presentImage(ev: Event, myImage) {
    ev.stopPropagation();
    const imageViewer = this.imageVC.create(myImage);
    imageViewer.present();
  }

  openZone(ev, owner) {
    ev.stopPropagation();
    this.app.getRootNavs()[0].push('OwnerZonePage', { owner: owner, type: owner.type })
  }

  selectItem(type) {
    this.dataType = type;

    this.error = null;
    this.topics = [];

    this.pageNum = 1;
    this.totalPage = 1;
    this.hasMore = false;

    this.loadData();
  }

  openTopic(topic) {
    if (topic.type == 0) {
      this.app.getRootNavs()[0].push('MediaDetailPage', topic.media);
    } else {
      this.app.getRootNavs()[0].push('TopicDetailPage', topic);
    }
  }

  loadData() {
    return new Promise((resolve) => {
      this.media.GetTopic(this.dataType, this.pageNum, this.pageSize)
        .then(res => {
          const data = res['data'];
          const total = res['total'];

          if (this.pageNum === 1) {
            this.topics = data;
            if (this.topics.length == 0) {
              this.error = "暂无动态";
            } else {
              this.error = null;
            }
          } else {
            let temp = this.topics || [];
            this.topics = temp.concat(data);
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

  like(ev:Event, topic) {
    // console.log(ev);
    ev.stopPropagation();
    // console.log(media);
    if (topic.liked) {
      // 取消喜欢
      this.media.DeleteLike(topic.id, 'Topic')
        .then(res => {
          topic.liked = false;
          let likesCount = topic.likes_count;
          likesCount -= 1;
          if (likesCount < 0) {
            likesCount = 0;
          }
          topic.likes_count = likesCount;
          // topic.liked_users.splice(0,1);
        })
        .catch(error => {
          this.tools.showToast(error.message || '服务器出错');
          
        });
    } else {
      // 添加喜欢
      this.media.CreateLike(topic.id, 'Topic')
        .then(res => {
          topic.liked = true;
          topic.likes_count += 1;
          topic.liked_users.unshift(res['data']['user']);
        })
        .catch(error => {
          this.tools.showToast(error.message || '服务器出错');
        });
    }
  }

  newTopic() {
    let modal = this.modalCtrl.create('NewTopicPage');
    modal.onDidDismiss((data) => {
      if (data) {
        this.selectItem(this.dataType);
      }
    });
    modal.present();
  }

  loadMore(e) {
    if (this.pageNum < this.totalPage) {
      this.pageNum ++;

      this.loadData().then(() => {
        e.complete();
      });
    }
  }

  onPlayerReady(api: VgAPI) {
    api.getDefaultMedia().subscriptions.play.subscribe(
      () => {
        // console.log('开始播放');
        let srcMedia = this.currentMedia && this.currentMedia.srcMedia;
        this.media.PlayMedia(srcMedia.id).catch(error => console.log(error));
      }
    )

    api.getDefaultMedia().subscriptions.ended.subscribe(
      () => {
          // Set the video to the beginning
          api.getDefaultMedia().currentTime = 0;
      }
    );
  }

}
