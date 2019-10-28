import moment from 'moment';

// ! Confirm this can be depracted, then remove.
const namespace = `uds`;

const now = moment().format(`YYYY-MM-DD`);

export { namespace, now };
