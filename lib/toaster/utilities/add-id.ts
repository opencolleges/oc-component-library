import _ from 'lodash';

import { ToastProps } from '../toaster';

import { NAMESPACE } from '../../utilities/ts/constants';

const addId = (initialToasts: ToastProps[]): ToastProps[] => {
  const toasts: ToastProps[] = _.cloneDeep(initialToasts);

  for (const toast of toasts) {
    if (!toast.id) {
      toast.id = _.uniqueId(`${NAMESPACE}-`);
    }
  }

  return toasts;
};

export default addId;
