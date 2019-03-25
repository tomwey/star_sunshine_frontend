import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the JobDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-job-detail',
  templateUrl: 'job-detail.html',
})
export class JobDetailPage {

  job: any = {};
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.job = Object.assign({}, this.navParams.data.job);
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad JobDetailPage');
  }

}
