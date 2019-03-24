import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Content } from 'ionic-angular';
import { Media } from '../../provider/Media';
import { Tools } from '../../provider/Tools';
import { iOSFixedScrollFreeze } from '../../provider/iOSFixedScrollFreeze';
import { App } from 'ionic-angular/components/app/app';

/**
 * Generated class for the VoteDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-vote-detail',
  templateUrl: 'vote-detail.html',
})
export class VoteDetailPage {

  vote: any = null;
  voteBody: any = null;
  currentMedia: any = null;

  error: any = null;
  comments: any = [];

  pageNum: number = 1;
  totalPage: number = 1;
  pageSize: number = 20;

  hasMore: boolean = false;

  sendType: number = 0; // 默认发评论模式

  replyComment: any = null;
  to_user: any = null;

  @ViewChild(Content) content: Content;
  
  constructor(public navCtrl: NavController, 
    private mediaServ: Media,
    private tools: Tools,
    private app: App,
    private iosFixed: iOSFixedScrollFreeze,
    private alertCtrl: AlertController,
    public navParams: NavParams) {
      this.vote = this.navParams.data;
  }

  ionViewDidLoad() {
    this.iosFixed.fixedScrollFreeze(this.content);

    setTimeout(() => {
      this.mediaServ.ViewVote(this.vote.id)
        .then(res => {
          // console.log(res);
          // this.vote.view_count += 1;
          if (res && res['data']) {
            this.vote = res['data'];
          }
        })
        .catch(err => {});
    }, 200);

    setTimeout(() => {
      this.loadComments();
    }, 300);
  }

  loadComments() {
    
    return new Promise((resolve) => {
      this.mediaServ.GetComments('Vote', this.vote.id, this.pageNum, this.pageSize)
      .then(res => {
          const data = res['data'];
          const total = res['total'];

          if (this.pageNum === 1) {
            this.comments = data;
            if (this.comments.length == 0) {
              this.error = "暂无评论，快抢沙发~";
            } else {
              this.error = null;
            }
          } else {
            let temp = this.comments || [];
            this.comments = temp.concat(data);
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

  openZone(perform) {
    this.app.getRootNavs()[0].push('OwnerZonePage', { owner: perform, type: 'performer' });
  }

  selectItem(item) {
    if (this.vote.type === 1) {
      // 单选
      // 取消选中所有的
      this.vote.vote_items.map( (inItem) => {
        if (inItem !== item) {
          inItem.selected = false;
        }
      });
    } else if (this.vote.type === 2) {
      // 多选
    }

    item.selected = !item.selected;
  }

  loadMore(ev) {
    if (this.pageNum < this.totalPage) {
      this.pageNum ++;

      this.loadComments().then(() => {
        ev.complete();
      });
    }
  }

  sendVote(item) {
    if (item.voted) return;

    this.mediaServ.CommitVote(this.vote.id, item.id)
    .then(res => {
      if (res && res['data']) {
        this.vote = res['data'];
      }
      item.voted = true;
    })
    .catch(error => {
      this.tools.showToast(error.message || '投票出错了~');
    });
  }

  commit() {
    let voteItems = this.vote.vote_items || [];

    let answers: any = [];
    voteItems.forEach(element => {
      if (element.selected) {
        answers.push(element.id);
      }
    });
    if (answers.length === 0) {
      this.tools.showToast('必须选择一个投票选项');
      return;
    }

    this.mediaServ.CommitVote(this.vote.id, answers.join(','))
      .then(res => {
        if (res && res['data']) {
          this.vote = res['data'];
        }
      })
      .catch(error => {
        this.tools.showToast(error.message || '投票出错了~');
      });

  }

  writeComment() {
    this.sendType = 0;

    this.showInput('写评论');
  }

  showInput(title) {
    let alert = this.alertCtrl.create();
    alert.setTitle(title);

    alert.addInput({
      type: 'text',
      placeholder: '说点什么'
    });

    alert.addButton('取消');
    alert.addButton({
      text: '发送',
      handler: data => {
        this.send(data[0]);
      }
    });
    alert.present();
  }

  like(ev:Event, vote) {
    // console.log(ev);
    ev.stopPropagation();
    // console.log(media);
    if (vote.liked) {
      // 取消喜欢
      this.mediaServ.DeleteLike(vote.id, 'Vote')
        .then(res => {
          vote.liked = false;
          let likesCount = vote.likes_count;
          likesCount -= 1;
          if (likesCount < 0) {
            likesCount = 0;
          }
          vote.likes_count = likesCount;
        })
        .catch(error => {
          this.tools.showToast(error.message || '服务器出错');
          
        });
    } else {
      // 添加喜欢
      this.mediaServ.CreateLike(vote.id, 'Vote')
        .then(res => {
          vote.liked = true;
          vote.likes_count += 1;
        })
        .catch(error => {
          this.tools.showToast(error.message || '服务器出错');
        });
    }
  }

  send(text) {
    console.log(text);

    if (this.sendType == 1) {
      this.doReply(text);
      return;
    }
    this.mediaServ.CreateComment('Vote', this.vote.id, text)
      .then(res => {
        let comment = res['data'];
        
        if (comment) {
          this.vote.comments_count += 1;
          this.comments.unshift(comment);
        }

        if (this.comments.length > 0) {
          this.error = null;
        } else {
          this.error = '暂无评论，快抢沙发~';
        }

      })
      .catch(error => {
        this.tools.showToast(error.message || '发评论失败~');
      });
  }

  doReply(text) {
    this.mediaServ.ReplyComment(this.replyComment.id, text, this.to_user)
      .then(res => {
        this.tools.showToast('发送成功！');
        if (res && res['data']) {
          let replies = this.replyComment.replies || [];
          replies.push(res['data']);
          this.replyComment.replies = replies;
        }
      })
      .catch(error => {
        this.tools.showToast(error.message || '提交失败');
      });
  }

  reply(comment, to_user = null) {
    this.sendType = 1;
    this.replyComment = comment;
    this.to_user = to_user;
    this.showInput('回复评论');

    // this.input.setFocus();
    // if (to_user) {
    //   this.input.setValue('回复@' + to_user.nickname + ': ');
    // }
    
  }

}
