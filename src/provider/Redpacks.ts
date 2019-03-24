import {Injectable } from "@angular/core";
import { ApiService } from "./api-service";
import { Users } from "./Users";

@Injectable()
export class Redpacks {

    constructor(
        private api: ApiService,
        private users: Users,
    ) {

    }

    GetRedback(id) {
        return new Promise((resolve, reject) => {
            this.users.token().then(token => {
                this.api.GET('redpack/detail', { token: token, id: id })
                    .then(data => {
                        resolve(data);
                    })
                    .catch(error => {
                        reject(error);
                    });
            })
        });
        
    }

    ScanRedback(uid) {
        return new Promise((resolve, reject) => {
            this.users.token().then(token => {
                this.api.GET('redpack/scan', { token: token, owner_id: uid })
                    .then(data => {
                        resolve(data);
                    })
                    .catch(error => {
                        reject(error);
                    });
            })
        });
    }

    OpenRedpack(id, answer) {
        // console.log(answer);
        return new Promise((resolve, reject) => {
            this.users.token().then(token => {
                this.api.POST('redpack/take', { token: token, id: id, sign_val: answer })
                    .then(data => {
                        resolve(data);
                    })
                    .catch(error => {
                        reject(error);
                    });
            })
        });
    }

    GetCatalogs() {
        return new Promise((resolve, reject) => {
            this.users.token().then(token => {
                this.api.GET('catalogs', { token: token })
                    .then(data => {
                        resolve(data);
                    })
                    .catch(error => {
                        reject(error);
                    });
            })
        });
    }

    GetRedpackThemes(cid) {
        return new Promise((resolve, reject) => {
            this.users.token().then(token => {
                this.api.GET('themes', { cid: cid, token: token })
                    .then(data => {
                        resolve(data);
                    })
                    .catch(error => {
                        reject(error);
                    });
            })
        });
    }

    GetRedpackAudios(cid) {
        return new Promise((resolve, reject) => {
            this.users.token().then(token => {
                this.api.GET('audios', { cid: cid, token: token })
                    .then(data => {
                        resolve(data);
                    })
                    .catch(error => {
                        reject(error);
                    });
            })
        });
    }

    CreateRedpack(params) {
        return new Promise((resolve, reject) => {
            this.users.token().then(token => {
                params['token'] = token;
                this.api.POST('redpack/create', params)
                    .then(data => {
                        resolve(data);
                    })
                    .catch(error => {
                        reject(error);
                    });
            })
        });
    }

    GetMyRedpacks(action, year = null) {
        return new Promise((resolve, reject) => {
            this.users.token().then(token => {
                this.api.GET(`user/${action}/redpacks`, 
            {
                token: token,
                year: year
            })
                    .then(data => {
                        resolve(data);
                    })
                    .catch(error => {
                        reject(error);
                    });
            })
        });
    }

    OperateRedpack(action, id) {
        return new Promise((resolve, reject) => {
            this.users.token().then(token => {
                // params['token'] = token;
                this.api.POST(`redpack/${action}`, { token: token, id: id })
                    .then(data => {
                        resolve(data);
                    })
                    .catch(error => {
                        reject(error);
                    });
            })
        });
    }

    UpdateRedpack(id, params) {
        return new Promise((resolve, reject) => {
            this.users.token().then(token => {
                params['token'] = token;
                params['id'] = id;
                this.api.POST(`redpack/update`, params)
                    .then(data => {
                        resolve(data);
                    })
                    .catch(error => {
                        reject(error);
                    });
            })
        });
    }

    GetRedpackResults(id) {
        return new Promise((resolve, reject) => {
            this.users.token().then(token => {
                this.api.GET(`redpack/results`, 
            {
                token: token,
                id: id
            })
                    .then(data => {
                        resolve(data);
                    })
                    .catch(error => {
                        reject(error);
                    });
            })
        });
    }

    PreviewRedpack(subject, theme_id, audio_id) {
        return new Promise((resolve, reject) => {
            this.users.token().then(token => {
                this.api.POST(`redpack/preview`, {
                    token: token,
                    subject: subject,
                    theme_id: theme_id,
                    audio_id: audio_id,
                })
                    .then(data => {
                        resolve(data);
                    })
                    .catch(error => {
                        reject(error);
                    });
            })
        });
    }

    PreviewRedpackUse(id) {
        return new Promise((resolve, reject) => {
            this.users.token().then(token => {
                this.api.POST(`redpack/preview/use`, {
                    token: token,
                    id: id,
                })
                    .then(data => {
                        resolve(data);
                    })
                    .catch(error => {
                        reject(error);
                    });
            })
        });
    }

    GetRedpackConsumes(action) {
        return new Promise((resolve, reject) => {
            this.users.token().then(token => {
                this.api.GET(`user/${action}/hb_consumes`, {
                    token: token
                })
                    .then(data => {
                        resolve(data);
                    })
                    .catch(error => {
                        reject(error);
                    });
            })
        }); 
    }

    ConfirmConsumeRedpack(rrid) {
        return new Promise((resolve, reject) => {
            this.users.token().then(token => {
                this.api.POST(`redpack/consume`, {
                    token: token,
                    rrid: rrid,
                })
                    .then(data => {
                        resolve(data);
                    })
                    .catch(error => {
                        reject(error);
                    });
            })
        });
    }
}