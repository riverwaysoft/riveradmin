import { action, makeAutoObservable } from 'mobx';
import { AxiosResponse } from 'axios';

type CsvApi = {
  fetch: () => Promise<AxiosResponse>;
};

export class CsvDownloaderStore {
  isLoading = false;

  constructor(public csvApi: CsvApi) {
    makeAutoObservable(this, {
      csvApi: false,
    });
  }

  download() {
    this.isLoading = true;
    this.csvApi
      .fetch()
      .then(
        action((response) => {
          this.downloadBlob(response);
        })
      )
      .finally(
        action(() => {
          this.isLoading = false;
        })
      );
  }

  private downloadBlob = (response: AxiosResponse) => {
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(response.data);
    const extension = response.headers['content-type'] === 'text/csv' ? 'csv' : 'xlsx';
    link.download = `report_${new Date().getTime()}.${extension}`;
    link.click();
  };
}
