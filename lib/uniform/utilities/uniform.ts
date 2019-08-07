import detectIt from 'detect-it';

import date from '../../utilities/js/date';

const uniform = {
  getMode(): string {
    let theme: string = 'light';

    const SEASON: string = date.getSeason();
    const HOUR: number = date.getHour();

    if (SEASON === 'summer') {
      // Summer daylight hours: 0500-1900.
      if (HOUR < 4 || HOUR > 17) {
        theme = 'dark';
      }
    }

    if (SEASON === 'winter') {
      // Winter daylight hours: 0700-1700.
      if (HOUR < 6 || HOUR > 15) {
        theme = 'dark';
      }
    }

    if (SEASON === 'autumn' || SEASON === 'spring') {
      // Autumn and Spring daylight hours: 0600-1800.
      if (HOUR < 5 || HOUR > 16) {
        theme = 'dark';
      }
    }

    return theme;
  },

  hasMouse(): boolean {
    return detectIt.hasMouse;
  }
};

export default uniform;
