import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';

@Injectable()
export class jsClipboard {

    constructor(private platform: Platform) {

    }

    copy(text: string){
        let textArea = this._createTextArea(text);
        this._selectText(textArea);
        this._copyToClipboard(textArea);
    }

    private _createTextArea(text) {
        let textArea: HTMLTextAreaElement = document.createElement('textArea') as HTMLTextAreaElement;
        textArea.value = text;
        document.body.appendChild(textArea);
        return textArea;
    }

    private _selectText(textArea) {
        var range,
            selection;

        if (this.platform.is('ios')) {
            range = document.createRange();
            range.selectNodeContents(textArea);
            selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
            textArea.setSelectionRange(0, 999999);
        } else {
            textArea.select();
        }
    }

    private _copyToClipboard(textArea) {
        document.execCommand('copy');
        document.body.removeChild(textArea);
    }

}