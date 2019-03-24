import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { ApiService } from '../../provider/api-service';
import { DomSanitizer } from '@angular/platform-browser';
import { iOSFixedScrollFreeze } from '../../provider/iOSFixedScrollFreeze';

/**
 * Generated class for the BrowserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-browser',
  templateUrl: 'browser.html',
})
export class BrowserPage {

  page: any = null;
  body: any = null;

  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController, 
    private api: ApiService,
    private san: DomSanitizer,
    private iosFixed: iOSFixedScrollFreeze,
    public navParams: NavParams) {
    this.page = this.navParams.data;
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad BrowserPage');
    this.iosFixed.fixedScrollFreeze(this.content);

    setTimeout(() => {
      this.loadPage();
    }, 200);
  }

  loadPage() {
    this.api.GET(`p/${this.page.slug}`, null)
      .then(result => {
        // console.log(res);
        let data = result['data'];

        if (data && data.body) {
          this.body = this.san.bypassSecurityTrustHtml(data.body);
        }
      })
      .catch(error => {
        // console.log(error);
      });
  }

}
