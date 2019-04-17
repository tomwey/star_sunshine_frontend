import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Content } from 'ionic-angular';
import { iOSFixedScrollFreeze } from '../../provider/iOSFixedScrollFreeze';

/**
 * Generated class for the CommSelectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comm-select',
  templateUrl: 'comm-select.html',
})
export class CommSelectPage {

  data: any = [];
  error: any = null;
  title: any = '请选择';
  selectedItems: any = [];

  keyword: any = '';
  originData: any = [];

  isSingle: any = 1;

  currentItem: any = null;

  @ViewChild(Content) content: Content;

  constructor(public navCtrl: NavController,
    private viewCtrl: ViewController,
    private iosFixed: iOSFixedScrollFreeze,
    public navParams: NavParams) {
    this.data = this.navParams.data.data;
    this.title = this.navParams.data.title;
    this.selectedItems = this.navParams.data.selectedItems || [];
    console.log(this.selectedItems);
    if (this.data.length == 0) {
      this.error = '暂无数据';
    }

    if (this.navParams.data.isSingle) {
      this.isSingle = this.navParams.data.isSingle;
    }

    this.data.forEach(item => {
      for (let i = 0; i < this.selectedItems.length; i++) {
        const obj = this.selectedItems[i];
        if (obj.label == item.label && obj.value == item.value) {
          item.checked = true;
          if (this.isSingle === 1) {
            this.currentItem = item;
          }
          break;
        }
      }
    });

    this.originData = this.data;


  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad CommSelectPage');
    this.iosFixed.fixedScrollFreeze(this.content);
  }

  startSearch(kw) {
    if (kw.trim() == '') {
      this.data = this.originData;
      return;
    }

    this.data = this.originData.filter(item => {
      const string = item.label;
      return string.indexOf(kw.trim().toLowerCase()) > -1;
    });
  }

  close() {
    this.viewCtrl.dismiss().catch();
  }

  done() {
    this.viewCtrl.dismiss(this.selectedItems);
  }

  selectItem(item) {

    if (this.isSingle === 1) {
      // 单选
      if (this.currentItem) {
        this.currentItem.checked = false;
      }

      item.checked = true;
      this.currentItem = item;

      this.selectedItems = [item];
    } else {
      // 多选
      item.checked = !item.checked;

      if (item.checked) {

        this.selectedItems.push(item);
      } else {
        let index = -1;
        for (let i = 0; i < this.selectedItems.length; i++) {
          if (item.label === this.selectedItems[i].label && item.value == this.selectedItems[i].value) {
            index = i;
            break;
          }
        }

        if (index !== -1) {
          this.selectedItems.splice(index, 1);
        }
      }
    }
  }

}
