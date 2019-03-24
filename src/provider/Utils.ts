import { Injectable } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';

@Injectable()
export class Utils 
{
  /**
   * 获取地址栏参数
   * @param name
   * @returns {any}
   */
  static getQueryString(name): string 
  {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    let r = window.location.search.substr(1).match(reg);
    if (r != null) {
      return r[2];
    }
    return '';
  }

  static getRandomString(len): string {
    len = len || 32;
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    var maxPos = $chars.length;
    var pwd = '';
    for (var i = 0; i < len; i++) {
      pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
  　return pwd;
  }

  static md5(string): string {
    return Md5.hashStr(string, false).toString();
  }

  static isWeiXin(): boolean {
    let ua = window.navigator.userAgent.toLowerCase();
    let results: RegExpMatchArray = ua.match(/MicroMessenger/i);
    if(results && results.toString() == 'micromessenger') {
      return true;
    } else {
      return false;
    }
  }
  
}