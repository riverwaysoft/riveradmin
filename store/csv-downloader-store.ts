import {action, makeAutoObservable} from 'mobx';
import {AxiosResponse} from "axios";

export class CsvDownloaderStore {
  isLoading = false;

  constructor(public response: { fetch: () => Promise<AxiosResponse>}) {
    makeAutoObservable(this, {
      response: false,
      download: false,
    });
  }

  download() {
    this.isLoading = true;
    this.response
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
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(response.data);
    if (response.headers['content-type'] === 'text/csv') {
      link.download = `report_${new Date().getTime()}.csv`;
    } else {
      link.download = `report_${new Date().getTime()}.xlsx`;
    }
    link.click();
  };

}
