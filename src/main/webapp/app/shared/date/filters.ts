import Vue from 'vue';
import dayjs from 'dayjs';

export const DATE_FORMAT = 'YYYY-MM-DD';
export const DATE_TIME_FORMAT = 'DD/MM/YYYY HH:mm';

export const DATE_TIME_LONG_FORMAT = 'YYYY-MM-DDTHH:mm';

export function initFilters() {
  Vue.filter('formatDate', value => {
    if (value) {
      return dayjs(value).format(DATE_TIME_FORMAT);
    }
    return '';
  });
  Vue.filter('formatMillis', value => {
    if (value) {
      return dayjs(value).format(DATE_TIME_FORMAT);
    }
    return '';
  });
  Vue.filter('duration', value => {
    if (value) {
      const formatted = dayjs.duration(value).humanize();
      if (formatted) {
        return formatted;
      }
      return value;
    }
    return '';
  });
}
