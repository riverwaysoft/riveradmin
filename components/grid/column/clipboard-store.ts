import { makeAutoObservable } from 'mobx';

export class ClipboardStore {
  isCopied = false;

  constructor() {
    makeAutoObservable(this);
  }

  copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
    this.isCopied = true;
  }

  forgetCopied = () => {
    this.isCopied = false;
  };
}
