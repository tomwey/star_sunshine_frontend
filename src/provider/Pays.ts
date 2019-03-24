import {Injectable } from "@angular/core";
// import { Storage } from '@ionic/storage';
import { ApiService } from "./api-service";
import { Users } from "./Users";

@Injectable()
export class Pays {

    constructor(
        private users: Users,
        private api: ApiService,
    ) {

    }
    
    GetChargeList() {
        return new Promise((resolve, reject) => {
            this.users.token().then(token => {
                this.api.GET('pay/charge_list', { token: token })
                    .then(res => resolve(res))
                    .catch(error => reject(error));
            });
        });
    }

    GetWithdrawList() {
        return new Promise((resolve, reject) => {
            this.users.token().then(token => {
                this.api.GET('pay/withdraw_list', { token: token })
                    .then(res => resolve(res))
                    .catch(error => reject(error));
            });
        });
    }

    ApplyCharge(money, type) {
        return new Promise((resolve, reject) => {
            this.users.token().then(token => {
                this.api.POST('pay/charge', { token: token, money: money, type: type })
                    .then(res => resolve(res))
                    .catch(error => reject(error));
            });
        });
    }

    ApplyWithdraw(params) {
        return new Promise((resolve, reject) => {
            this.users.token().then(token => {
                params['token'] = token;
                this.api.POST('pay/withdraw', params)
                    .then(res => resolve(res))
                    .catch(error => reject(error));
            });
        });
    }
}