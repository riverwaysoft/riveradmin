import { NetworkStatusNotificator, NotificationId } from './network-status-notificator';

export class NetworkStatusService {
  warningId?: NotificationId;

  constructor(private notificator: NetworkStatusNotificator) {}

  subscribe() {
    window.addEventListener('online', this.updateOnlineStatus);
    window.addEventListener('offline', this.updateOnlineStatus);
  }

  private updateOnlineStatus = () => {
    const isOnline = window.navigator.onLine;
    if (!isOnline) {
      this.warningId = this.notificator.warnOffline();
    } else if (this.warningId) {
      this.notificator.closeWarning(this.warningId);
      this.warningId = undefined;
    }
  };
}
