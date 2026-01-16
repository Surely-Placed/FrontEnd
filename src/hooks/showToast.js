// toastService.js
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const showToast = (message, type = 'success') => {
  const commonOptions = {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    className: 'custom-toast',
  };

  if (type === 'error') {
    toast.error(message, commonOptions);
  } else {
    toast.success(message, commonOptions);
  }
};

