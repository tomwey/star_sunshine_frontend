import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, TextInput, Content } from 'ionic-angular';
import { Media } from '../../provider/Media';
import { Tools } from '../../provider/Tools';
import { iOSFixedScrollFreeze } from '../../provider/iOSFixedScrollFreeze';

/**
 * Generated class for the TopicDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-topic-detail',
  templateUrl: 'topic-detail.html',
})
export class TopicDetailPage {

  topic: any = null;

  error: any = null;
  comments: any = [];

  pageNum: number = 1;
  totalPage: number = 1;
  pageSize: number = 20;

  hasMore: boolean = false;

  // 评论内容
  content: string = null;

  sendType: number = 0; // 默认发评论模式

  replyComment: any = null;
  to_user: any = null;

  @ViewChild('input') input: TextInput;
  
  @ViewChild(Content) contentEle: Content;

  constructor(public navCtrl: NavController, 
    private mediaServ: Media,
    private tools: Tools,
    private iosFixed: iOSFixedScrollFreeze,
    public navParams: NavParams) {
      this.topic = this.navParams.data;
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad MediaDetailPage');
    this.iosFixed.fixedScrollFreeze(this.contentEle);

    setTimeout(() => {
      this.loadComments();
    }, 100);
  }

  loadComments() {
    
    return new Promise((resolve) => {
      this.mediaServ.GetComments('Topic', this.topic.id, 
      this.pageNum, this.pageSize)
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

  loadMore(ev) {
    if (this.pageNum < this.totalPage) {
      this.pageNum ++;

      this.loadComments().then(() => {
        ev.complete();
      });
    }
  }

  follow(owner) {
    const action = !owner.followed ? 'create' : 'delete';

    let type = owner.type;
    type = type.charAt(0).toUpperCase() + type.slice(1);

    this.mediaServ.Follow(action, type, owner.id)
      .then(res => {
        if (action == 'create') {
          owner.followed = true;
        } else {
          owner.followed = false;
        }
      })
      .catch(error => {
        this.tools.showToast(error.message || '服务器出错了~');
      });
  }

  send() {
    if (this.sendType == 1) {
      this.doReply();
      return;
    }
    this.mediaServ.CreateComment('Topic', this.topic.id, this.content)
      .then(res => {
        let comment = res['data'];
        
        if (comment) {
          this.topic.comments_count += 1;
          this.comments.unshift(comment);
        }

        if (this.comments.length > 0) {
          this.error = null;
        } else {
          this.error = '暂无评论，快抢沙发~';
        }

        this.content = '';
      })
      .catch(error => {
        this.tools.showToast(error.message || '发评论失败~');
        this.content = '';
      });
  }

  doReply() {
    this.mediaServ.ReplyComment(this.replyComment.id, this.content, this.to_user)
      .then(res => {
        this.content = '';
        this.tools.showToast('发送成功！');
        if (res && res['data']) {
          let replies = this.replyComment.replies || [];
          replies.push(res['data']);
          this.replyComment.replies = replies;
        }
        this.sendType = 0; // 切换回发评论模式
      })
      .catch(error => {
        this.sendType = 0;
        this.content = '';
        this.tools.showToast(error.message || '提交失败');
      });
  }

  reply(comment, to_user = null) {
    this.sendType = 1;
    this.replyComment = comment;
    this.to_user = to_user;
    this.input.setFocus();
  }

  like(ev, topic_) {
    if (topic_.liked) {
      // 取消喜欢
      this.mediaServ.DeleteLike(topic_.id, 'Topic')
        .then(res => {
          topic_.liked = false;
          let likesCount = topic_.likes_count;
          likesCount -= 1;
          if (likesCount < 0) {
            likesCount = 0;
          }
          topic_.likes_count = likesCount;
        })
        .catch(error => {
          this.tools.showToast(error.message || '服务器出错');
          
        });
    } else {
      // 添加喜欢
      this.mediaServ.CreateLike(topic_.id, 'Topic')
        .then(res => {
          topic_.liked = true;
          topic_.likes_count += 1;
        })
        .catch(error => {
          this.tools.showToast(error.message || '服务器出错');
        });
    }
  }

}
