import _ from 'lodash';
import { NAMESPACE } from '../../utilities/ts/constants';
import { ToastProps } from '../toaster';

const addId = (initialToasts: ToastProps[]): ToastProps[] => {
  const toasts: ToastProps[] = _.cloneDeep(initialToasts);

  for (const toast of toasts) {
    if (!toast.id) {
      toast.id = _.uniqueId(`${NAMESPACE}-`);
    }
  }

  return toasts;
};

export { addId as default };
