export type NotificationId = string | number;

export type NetworkStatusNotificator = {
  warnOffline: () => NotificationId;
  closeWarning: (notificationId: NotificationId) => void;
};
