import { toast } from 'react-toastify';
import { ToastOptions } from 'react-toastify/dist/types';

const commonOptions: ToastOptions = {
  position: 'top-right',
  autoClose: false,
  hideProgressBar: true,
};

export class Notificator {
  error(message: string) {
    return toast.error(message, {
      ...commonOptions,
    });
  }

  warning(message: string, options?: ToastOptions) {
    return toast.warn(message, {
      ...commonOptions,
      ...options,
    });
  }

  success(message: string, options?: ToastOptions) {
    return toast.success(message, {
      ...commonOptions,
      autoClose: 3000,
      ...options,
    });
  }

  close = (id: string | number) => {
    toast.dismiss(id);
  };
}
