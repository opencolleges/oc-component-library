import detectIt from 'detect-it';
import dateTime from '../../utilities/ts/date-time';

interface Uniform {
  getMode: () => string;
  hasMouse: () => boolean;
}

const uniform: Uniform = {
  getMode(): string {
    const SEASON: string = dateTime.getSeasonName();
    const HOUR: number = dateTime.getHour();

    let theme: string = `light`;

    if (SEASON === `Summer`) {
      // Summer daylight hours: 0500-1900.
      if (HOUR < 4 || HOUR > 17) {
        theme = `dark`;
      }
    }

    if (SEASON === `Winter`) {
      // Winter daylight hours: 0700-1700.
      if (HOUR < 6 || HOUR > 15) {
        theme = `dark`;
      }
    }

    if (SEASON === `Autumn` || SEASON === `Spring`) {
      // Autumn and Spring daylight hours: 0600-1800.
      if (HOUR < 5 || HOUR > 16) {
        theme = `dark`;
      }
    }

    return theme;
  },

  hasMouse(): boolean {
    return detectIt.hasMouse;
  }
};

export { uniform as default };
