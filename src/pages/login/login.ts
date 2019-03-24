import { Component, ViewChild } from '@angular/core';
import { /*IonicPage,*/ NavController, NavParams, Content, App } from 'ionic-angular';
// import { ApiService } from '../../provider/api-service';
// import { DomSanitizer } from '@angular/platform-browser';
import { Users } from '../../provider/Users';
import { Tools } from '../../provider/Tools';
import { iOSFixedScrollFreeze } from '../../provider/iOSFixedScrollFreeze';
import { Utils } from '../../provider/Utils';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  // body: any = null;
  isWeiXin: boolean = false;

  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    // private api: ApiService,
    // private san: DomSanitizer,
    private app: App,
    private users: Users,
    private iosFixed: iOSFixedScrollFreeze,
    private tools: Tools,
  ) {
    this.isWeiXin = Utils.isWeiXin();
  }

  ionViewDidLoad() {
    this.iosFixed.fixedScrollFreeze(this.content);
    // console.log('ionViewDidLoad LoginPage');
    // this.loadUserAgreement();
  }

  // loadUserAgreement() {
  //   this.api.GET('p/user_agreement', null)
  //     .then(result => {
  //       // console.log(res);
  //       let data = result['data'];

  //       if (data && data.body) {
  //         this.body = this.san.bypassSecurityTrustHtml(data.body);
  //       }
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // }

  doLogin() {
    this.users.GetAuthUrl(window.location.href)
      .then(data => {
        // console.log(data.data);
        if (data && data.data) {
          // console.log(window.location.href);
          window.location.href = data.data.url;
        } else {
          this.tools.showToast('获取授权登录失败');
        }
      })
      .catch(error => {
        // console.log(error);
        this.tools.showToast('获取认证登录地址失败');
      });
  }

  openPage() {
    this.app.getRootNavs()[0].push('BrowserPage', {
      title: '用户协议',
      slug: 'user_agreement'
    });
  }

}
