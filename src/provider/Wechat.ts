import {Injectable } from "@angular/core";
import { ApiService } from "./api-service";
import { Tools } from "./Tools";

declare var wx;

@Injectable()
export class Wechat {
    constructor(private api: ApiService, private tools: Tools) {}

    GetConfig(url: string) {
        return new Promise((resolve, reject) => {
            this.api.GET('util/wx_config', { url: url })
                .then(data => {
                    let res = data['data'];
                    wx.config(res);
                    wx.ready(() => {
                        resolve(true);
                    });
                    wx.error(error => {
                        reject(error);
                    })
                })
                .catch(error => reject(error));
        });
    }

    pay(data) {
        return new Promise((resolve, reject) => {
            wx.chooseWXPay({
                timestamp: data.timeStamp,
                nonceStr: data.nonceStr,
                package: data.package,
                signType: data.signType,
                paySign: data.paySign,
                success: (res) => {
                    resolve(res);
                },
                fail: (error) => { 
                    // alert(JSON.stringify(error));
                    this.tools.showToast('支付失败，请重试');
                    reject(error);
                },
                cancel: () => {
                    this.tools.showToast('支付未完成，请尽快支付');
                    resolve();
                }
            });
        });
        
    }
}

