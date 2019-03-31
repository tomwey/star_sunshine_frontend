import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

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
  constructor(public navCtrl: NavController,
    // private users: Users,
    // private tools: Tools,
    private modalCtrl: ModalController,
    public navParams: NavParams) {
    this.job = Object.assign({}, this.navParams.data.job);
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad JobDetailPage');
  }

  apply() {
    let modal = this.modalCtrl.create("NewApplyPage", { job: this.job });
    modal.onDidDismiss((data) => {
      if (data === '1') {
        this.job.has_apply = true;
        this.navParams.data.job.has_apply = true;
      }
    })
    modal.present();
  }

}
