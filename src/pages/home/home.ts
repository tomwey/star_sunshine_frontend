import { Component, ViewChild } from '@angular/core';
import { /*IonicPage, */NavController, NavParams, Slides, App, Content, AlertController } from 'ionic-angular';
import { ApiService } from '../../provider/api-service';
import { iOSFixedScrollFreeze } from '../../provider/iOSFixedScrollFreeze';
import { Users } from '../../provider/Users';
import { MediaListPage } from '../media-list/media-list';
import { Media } from '../../provider/Media';
import { Tools } from '../../provider/Tools';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  entryData: any = null;
  error: any = null;

  @ViewChild('slides') slides: Slides;
  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController, 
    private api: ApiService,
    private app: App,
    private mediaServ: Media,
    private users: Users,
    private tools: Tools,
    private alertCtrl: AlertController,
    private iosFixed: iOSFixedScrollFreeze,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad HomePage');
    this.iosFixed.fixedScrollFreeze(this.content);

    this.loadData();
  }

  loadData() {
    this.users.token().then(token => {
      this.api.GET('entry', {token: token}, '正在加载')
      .then(data => {
        if (data && data['data']) {
          this.entryData = data['data'];

          if (this.slides) {
            this.slides.autoplayDisableOnInteraction = false;

            this.slides.ngOnDestroy();
            this.slides.initialSlide = 0;
            this.slides.update();
            this.slides.ngAfterContentInit();
          }
        }
      })
      .catch(error => {
        this.error = error;
      });
    });
    
  }

  openMoreMV() {
    this.app.getRootNavs()[0].push(MediaListPage);
  }

  openMXJJ() {
    this.alertCtrl.create({
      title: '筹备中',
      subTitle: '即将上线...',
      buttons: [
        {
          text: '确定'
        }
      ]
    }).present();
  }

  openVotes() {
    this.app.getRootNavs()[0].push('VoteListPage');
  }

  openPerformers() {
    this.app.getRootNavs()[0].push('PerformerListPage');
  }

  ionViewDidEnter() {
    // console.log(this.slides);
    if (this.slides) {
      // console.log('123');
      this.slides.startAutoplay();
    }
  }

  ionViewDidLeave() {   
    // console.log(this.slides);
    if (this.slides) {
      this.slides.stopAutoplay();  
    }
  }

  follow(performer) {
    const action = !performer.followed ? 'create' : 'delete';

    this.mediaServ.Follow(action, 'Performer', performer.id)
      .then(res => {
        if (action == 'create') {
          performer.followed = true;
        } else {
          performer.followed = false;
        }
      })
      .catch(error => {
        this.tools.showToast(error.message || '服务器出错了~');
      });
  }

  openZone(perform) {
    this.app.getRootNavs()[0].push('OwnerZonePage', { owner: perform, type: 'performer' });
  }

  vote() {
    this.app.getRootNavs()[0].push('VoteDetailPage', this.entryData.vote);
  }

  autoPlay() {
    if (this.entryData && this.entryData.banners.length > 1 && this.slides) {
      this.slides.startAutoplay();
    }

  }

  openMedia(media) {
    this.app.getRootNavs()[0].push('MediaDetailPage', media);
  }

  openBanner(banner) {
    // this.app.getRootNavs()[0].push('CloudZoneDetailPage', banner);
    // this.app.getRootNavs()[0].push('ArticlePage', { id: banner.ContentID });
    console.log(banner);
    if (banner.link) {
      window.open(banner.link);
    } else if (banner.vote) {
      this.app.getRootNavs()[0].push('VoteDetailPage', banner.vote);
    } else if (banner.media) {
      this.openMedia(banner.media);
    }
  }

}
