import {Injectable } from "@angular/core";
import { Storage } from '@ionic/storage';
import { ApiService } from "./api-service";

@Injectable()
export class Users {

    constructor(
        private storage: Storage,
        private api: ApiService,
    ) {

    }
    /**
     * 获取用户的登录TOKEN
     */
    token(): Promise<any> {
        return new Promise((resolve) => {
            this.storage.get('token').then( val => {
                // resolve('5f4391a432ed415396a73b10bdc5137f'); // 后台wmarshx用户的Token aed672e8bbe94206995a78dc6cd6ed1b
                // resolve('d4437223dd024b599ebbee94a2b027f6'); // 本地测试
                resolve(val);
            } );
        });
    }

    /**
     * 保存用户登录TOKEN
     * @param token 
     */
    saveToken(token: string): Promise<any> {
        return this.storage.set('token', token);
    }

    bindAuth(code: string, provider: string, rid): Promise<any> {
        return this.api.POST('u/auth_bind', { code: code, provider: provider, rid });
    }

    GetAuthUrl(url): Promise<any> {
        return this.api.GET('u/auth', { url: url });
    }

    GetUserProfile() {
        return new Promise((resolve, reject) => {
            this.token().then(token => {
                this.api.GET('user/me', { token: token })
                    .then(res => {
                        resolve(res);
                    })
                    .catch(error => {
                        reject(error);
                    })
            })
            .catch(error => {});
            // 
        });
    }

    logout(): Promise<any> {
        return this.storage.remove('token');
    }

    GetTrades(pageNo: number, pageSize: number = 20) {
        return new Promise((resolve, reject) => {
            this.token().then(token => {
                const flag = pageNo === 1;
                this.api.GET('user/trades', { token: token, page: pageNo, size: pageSize }, '正在加载', flag)
                    .then(res => {
                        resolve(res);
                    })
                    .catch(error => {
                        reject(error);
                    })
            })
            .catch(error => {});
            // 
        });
    }
}