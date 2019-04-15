import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CreatePerformerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-performer',
  templateUrl: 'create-performer.html',
})
export class CreatePerformerPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad CreatePerformerPage');
  }

  controls: any = [
    {
      id: 'name',
      name: "名字",
      type: 2,
      required: true,
    },
    {
      id: 'avatar',
      name: '头像',
      type: 22
    },
    {
      id: 'photos',
      name: '照片',
      type: 22,
      multiple: true,
    },
  ];

}
