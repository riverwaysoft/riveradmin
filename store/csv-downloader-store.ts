import { action, makeAutoObservable } from 'mobx';

export class CsvDownloaderStore {
  isLoading = false;

  constructor(public csvFetcher: { fetch: () => Promise<string> }) {
    makeAutoObservable(this, {
      csvFetcher: false,
      download: false,
    });
  }

  download() {
    this.isLoading = true;
    this.csvFetcher
      .fetch()
      .then(
        action((file) => {
          this.downloadBlob(new Blob([file], { type: 'text/plain' }));
        })
      )
      .finally(
        action(() => {
          this.isLoading = false;
        })
      );
  }

  private downloadBlob = (blob: Blob, filename = 'report.csv') => {
    let anchor = window.document.createElement('a');
    anchor.href = window.URL.createObjectURL(blob);
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    window.URL.revokeObjectURL(anchor.href);
  };
}
