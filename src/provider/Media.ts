import { Injectable } from '@angular/core';
import { ApiService } from './api-service';
import { Users } from './Users';
// import { calcBindingFlags } from '@angular/core/src/view/util';

@Injectable()
export class Media {
    constructor(
        private api: ApiService,
        private users: Users,
    ) {

    }

    GetMedia(action, school = null, pageNum, pageSize) {
        return new Promise((resolve, reject) => {
            this.users.token().then(token => {
                this.api.GET(`media/${action}`, { token: token, school: school, page: pageNum, size: pageSize })
                    .then(data => {
                        resolve(data);
                    })
                    .catch(error => {
                        reject(error);
                    })
            });
        });
    }

    GetMyMedia(performerID, pageNum, pageSize) {
        return new Promise((resolve, reject) => {
            this.users.token().then(token => {
                this.api.GET(`media/my_list`, { token: token, id: performerID, page: pageNum, size: pageSize })
                    .then(data => {
                        resolve(data);
                    })
                    .catch(error => {
                        reject(error);
                    })
            });
        });
    }

    GetMediaHistories(pageNum, pageSize) {
        return new Promise((resolve, reject) => {
            this.users.token().then(token => {
                this.api.GET(`media/histories`, { token: token, page: pageNum, size: pageSize })
                    .then(data => {
                        resolve(data);
                    })
                    .catch(error => {
                        reject(error);
                    })
            });
        });
    }

    CreateLike(mediaID, type: any = 'Media') {
        return new Promise((resolve, reject) => {
            this.users.token().then(token => {
                this.api.POST(`likes/create`, {
                    token: token,
                    like_id: mediaID,
                    like_type: type
                })
                    .then(data => {
                        resolve(data);
                    })
                    .catch(error => {
                        reject(error);
                    })
            });
        });
    }

    DeleteLike(mediaID, type: any = 'Media') {
        return new Promise((resolve, reject) => {
            this.users.token().then(token => {
                this.api.POST(`likes/delete`, { token: token, like_id: mediaID, like_type: type })
                    .then(data => {
                        resolve(data);
                    })
                    .catch(error => {
                        reject(error);
                    })
            });
        });
    }

    PlayMedia(mediaID) {
        return new Promise((resolve, reject) => {
            this.users.token().then(token => {
                this.api.POST(`media/play`, { token: token, id: mediaID }, '', false)
                    .then(data => {
                        resolve(data);
                    })
                    .catch(error => {
                        reject(error);
                    })
            });
        });
    }

    GetComments(commentableType, commentableID, pageNum, pageSize) {
        return new Promise((resolve, reject) => {
            this.users.token().then(token => {
                this.api.GET(`comments`, {
                    token: token,
                    comment_type: commentableType,
                    comment_id: commentableID,
                    page: pageNum,
                    size: pageSize
                })
                    .then(data => {
                        resolve(data);
                    })
                    .catch(error => {
                        reject(error);
                    })
            });
        });
    }

    CreateComment(commentableType, commentableID, content, address = null) {
        return new Promise((resolve, reject) => {
            this.users.token().then(token => {
                this.api.POST(`comments/create`, {
                    token: token,
                    comment_type: commentableType,
                    comment_id: commentableID,
                    content: content,
                    address: address
                })
                    .then(data => {
                        resolve(data);
                    })
                    .catch(error => {
                        reject(error);
                    })
            });
        });
    }

    ReplyComment(commentID, content, to_user_id, address = null) {
        return new Promise((resolve, reject) => {
            this.users.token().then(token => {
                this.api.POST(`comments/${commentID}/create_reply`, {
                    token: token,
                    to_user: to_user_id,
                    content: content,
                    address: address
                })
                    .then(data => {
                        resolve(data);
                    })
                    .catch(error => {
                        reject(error);
                    })
            });
        });
    }

    GetTopic(action, pageNum, pageSize: number = 20) {
        return new Promise((resolve, reject) => {
            this.users.token().then(token => {
                this.api.GET(`topics/${action}`, {
                    token: token,
                    page: pageNum,
                    size: pageSize
                })
                    .then(data => {
                        resolve(data);
                    })
                    .catch(error => {
                        reject(error);
                    })
            });
        });
    }

    CreateTopic(content, file_type: any = null, files: any = [], address: any = null) {
        return new Promise((resolve, reject) => {
            this.users.token().then(token => {

                let formData = new FormData();
                formData.append('token', token);
                formData.append('content', content);
                formData.append('file_type', file_type);
                files.forEach(file => {
                    formData.append('files[][file]', file);
                });

                this.api.POST2(`topics/create`, formData)
                    .then(data => {
                        resolve(data);
                    })
                    .catch(error => {
                        reject(error);
                    })
            });
        });
    }

    ViewVote(voteID) {
        return new Promise((resolve, reject) => {
            this.users.token().then(token => {
                this.api.POST(`votes/${voteID}/view`, { token: token }, null, false)
                    .then(data => {
                        resolve(data);
                    })
                    .catch(error => {
                        reject(error);
                    })
            });
        });
    }

    CommitVote(voteID, answers) {
        return new Promise((resolve, reject) => {
            this.users.token().then(token => {
                this.api.POST(`votes/${voteID}/commit`, { token: token, answers: answers })
                    .then(data => {
                        resolve(data);
                    })
                    .catch(error => {
                        reject(error);
                    })
            });
        });
    }

    GetVotes(pageNum, pageSize) {
        return new Promise((resolve, reject) => {
            this.users.token().then(token => {
                this.api.GET(`votes`, { token: token, page: pageNum, size: pageSize })
                    .then(data => {
                        resolve(data);
                    })
                    .catch(error => {
                        reject(error);
                    })
            });
        });
    }

    GetTags() {
        return new Promise((resolve, reject) => {
            this.users.token().then(token => {
                this.api.GET(`tags`, { token: token })
                    .then(data => {
                        resolve(data);
                    })
                    .catch(error => {
                        reject(error);
                    })
            });
        });
    }

    GetJobs(pageNum, pageSize) {
        return new Promise((resolve, reject) => {
            this.users.token().then(token => {
                this.api.GET(`jobs`, { token: token, page: pageNum, size: pageSize })
                    .then(data => {
                        resolve(data);
                    })
                    .catch(error => {
                        reject(error);
                    })
            });
        });
    }

    GetPerformers(type = null, tag_id = null, pageNum, pageSize) {
        return new Promise((resolve, reject) => {
            this.users.token().then(token => {
                this.api.GET(`performs`, { type: type, token: token, tag_id: tag_id, page: pageNum, size: pageSize })
                    .then(data => {
                        resolve(data);
                    })
                    .catch(error => {
                        reject(error);
                    })
            });
        });
    }

    CreatePerformer(payload, avatar, photos, callback) {
        let body = new FormData();

        body.append("payload", JSON.stringify(payload))
        this.users.token().then(token => {
            body.append("token", token);
            // console.log(avatar);
            if (avatar.length > 0) {
                // console.log(123);
                body.append("avatar", avatar[0], 'avatar.jpg');
            }

            photos = photos || [];

            for (let i = 0; i < photos.length; i++) {
                let file = photos[i];
                body.append("files[][file]", file, `image${i}.jpg`);
            }

            this.api.POST2(`performs/create`, body)
                .then(data => {
                    if (callback) {
                        // callback(null);
                        if (data['code'] == 0) {
                            callback(true, data['data']);
                        } else {
                            callback(false, data['message']);
                        }
                    }
                })
                .catch(error => {
                    if (callback) {
                        callback(false, '服务器超时，请重试');
                    }
                })
        });
    }

    GetPerformerTypes(callback) {
        this.api.GET('performs/types', null)
            .then(data => {
                if (callback) {
                    callback(data);
                }
            })
            .catch(error => {
                if (callback) {
                    callback(null);
                }
            });
    }

    Follow(action, type, followID) {
        return new Promise((resolve, reject) => {
            this.users.token().then(token => {
                this.api.POST(`follows/${action}`,
                    { token: token, follow_type: type, follow_id: followID })
                    .then(data => {
                        resolve(data);
                    })
                    .catch(error => {
                        reject(error);
                    })
            });
        });
    }

    GetFollowers(ownerType, ownerID, pageNum, pageSize) {
        return new Promise((resolve, reject) => {
            this.users.token().then(token => {
                this.api.GET(`follows/users`,
                    {
                        token: token,
                        owner_type: ownerType,
                        owner_id: ownerID,
                        page: pageNum,
                        size: pageSize
                    })
                    .then(data => {
                        resolve(data);
                    })
                    .catch(error => {
                        reject(error);
                    })
            });
        });
    }

    GetFollowings(pageNum, pageSize) {
        return new Promise((resolve, reject) => {
            this.users.token().then(token => {
                this.api.GET(`user/followings`,
                    {
                        token: token,
                        page: pageNum,
                        size: pageSize
                    })
                    .then(data => {
                        resolve(data);
                    })
                    .catch(error => {
                        reject(error);
                    })
            });
        });
    }
}