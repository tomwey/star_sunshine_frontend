import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Media } from '../../provider/Media';
import { Users } from '../../provider/Users';
import { Tools } from '../../provider/Tools';

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

  needCreate: boolean = false;

  performer: any = null;
  constructor(public navCtrl: NavController,
    private media: Media,
    private users: Users,
    private tools: Tools,
    private modalCtrl: ModalController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad CreatePerformerPage');
    setTimeout(() => {
      this.loadPerformer();
    }, 300);
  }

  loadPerformer() {
    this.users.GetPerformer((res) => {
      // console.log(res);
      if (!res) {
        this.needCreate = true;
      } else {
        this.performer = res;
      }
    });
  }

  commit() {
    // console.log(this.controls);
    let obj = {};
    for (let i = 0; i < this.controls.length; i++) {
      let control = this.controls[i];
      if (control.required && !control.value) {
        this.tools.showToast(`${control.name}不能为空`);
        return;
      }

      if (control.type != 22) {
        if (control.id == 'tags') {
          let arr = control.value || [];
          let temp = [];
          arr.forEach(ele => {
            temp.push(ele.value);
          });
          obj['tags'] = temp.join(',');
        } else {
          if (control.type == 41) {
            obj[control.id] = (control.value || {}).value || "";
          } else {
            obj[control.id] = control.value || "";
          }
        }

      }
    }

    this.media.CreatePerformer(obj, this.controls[1].value, this.controls[2].value, (succeed, res) => {
      if (succeed) {
        this.performer = res;
      } else {
        this.tools.showToast(res);
      }
    });
  }

  controlSelected(control) {
    if (control.id == 'tags') {
      this.media.GetPerformerTypes((res) => {
        // console.log(res);
        const arr = res.data;
        let temp = [];
        arr.forEach(element => {
          temp.push({ label: `${element.name}`, value: element.id });
        });

        let modal = this.modalCtrl.create('CommSelectPage', {
          selectedItems: control.value || [],
          title: '选择分类', data: temp, isSingle: '0'
        });
        modal.onDidDismiss((res) => {
          // console.log(res);
          if (!res) return;

          // this.selectedItems = res;
          control.value = res;
        });
        modal.present();
      });
    }
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
      type: 22,
      required: true,
    },
    {
      id: 'photos',
      name: '照片',
      type: 22,
      multiple: true,
    },
    {
      id: 'tags',
      name: '艺人类型',
      type: 6,
      required: true
    },
    {
      id: 'phone',
      name: '联系方式',
      type: 2,
      required: true,
      subtype: 'tel'
    },
    {
      id: 'nickname',
      name: '艺名',
      type: 2,
      required: true
    },
    {
      id: 'sex',
      name: '性别',
      type: 41,
      required: true,
      options: [
        {
          label: '男',
          value: '男'
        },
        {
          label: '女',
          value: '女'
        }
      ]
    },
    {
      id: 'age',
      name: '年龄',
      type: 2,
      required: true,
      subtype: 'tel'
    },
    {
      id: 'nation',
      name: '籍贯',
      type: 2,
      required: false
    },
    {
      id: 'edu_level',
      name: '学历',
      type: 41,
      required: false,
      options: [
        {
          label: '本科',
          value: '本科'
        },
        {
          label: '大专',
          value: '大专'
        },
        {
          label: '中专',
          value: '中专'
        },
        {
          label: '硕士',
          value: '硕士'
        },
        {
          label: '博士',
          value: '博士'
        },
        {
          label: '其它',
          value: '其它'
        },
      ]
    },
    {
      id: 'speciality',
      name: '专业',
      type: 2,
    },
    {
      id: 'marry_type',
      name: '婚姻状况',
      type: 41,
      required: false,
      options: [
        {
          label: '未婚',
          value: 0
        },
        {
          label: '已婚',
          value: 1
        },
        {
          label: '离异',
          value: 2
        },
      ]
    },
    {
      id: 'now_job',
      name: '现职业',
      type: 2,
    },
    {
      id: 'interest',
      name: '爱好',
      type: 2,
    },
    {
      id: 'source',
      name: '信息来源',
      type: 41,
      required: false,
      options: [
        {
          label: '网络',
          value: '网络'
        },
        {
          label: '报纸',
          value: '报纸'
        },
        {
          label: '朋友介绍',
          value: '朋友介绍'
        },
        {
          label: '助理介绍',
          value: '助理介绍'
        },
      ]
    },
    {
      id: 'height',
      name: '身高(cm)',
      type: 2,
      subtype: 'tel'
    },
    {
      id: 'weight',
      name: '体重(kg)',
      type: 2,
      subtype: 'tel'
    },
    {
      id: 'body_size',
      name: '体型',
      type: 2
    },
    {
      id: 'chest_size',
      name: '胸围',
      type: 2,
      subtype: 'tel'
    },
    {
      id: 'waist_size',
      name: '腰围',
      type: 2,
      subtype: 'tel'
    },
    {
      id: 'hip_size',
      name: '臀围',
      type: 2,
      subtype: 'tel'
    },
    {
      id: 'vision',
      name: '视力',
      type: 2,
      subtype: 'number'
    },
    {
      id: 'hair_type',
      name: '发型',
      type: 41,
      options: [
        {
          label: '长发',
          value: '长发'
        },
        {
          label: '短发',
          value: '短发'
        },
      ]
    },
    {
      id: 'hair_color',
      name: '头发颜色',
      type: 2
    },
    {
      id: 'footcode',
      name: '鞋码',
      type: 2,
      subtype: 'tel'
    },
    {
      id: 'skills',
      name: '个人才艺',
      type: 31
    },
    {
      id: 'trainings',
      name: '培训经历',
      type: 31
    },
    {
      id: 'bio',
      name: '工作/演出经历',
      type: 31,
      required: true
    }
  ];

}
