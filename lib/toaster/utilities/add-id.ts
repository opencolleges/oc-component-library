import _ from 'lodash';
import getId from '../../utilities/ts/get-id';
import { ToastProps } from '../toaster';

const addId = (initialToasts: ToastProps[]): ToastProps[] => {
  const toasts: ToastProps[] = _.cloneDeep(initialToasts);

  for (const toast of toasts) {
    if (!toast.id) {
      toast.id = getId();
    }
  }

  return toasts;
};

export { addId as default };
