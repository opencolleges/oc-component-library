import date from '../../utilities/js/date';

const getUniformTheme = (
  season: string = date.getSeason(),
  hour: number = date.getHour()
): string => {
  let theme: string = 'light';

  if (season === 'Summer') {
    // Summer daylight hours: 0500-1900.
    if (hour < 4 || hour > 17) {
      theme = 'dark';
    }
  }

  if (season === 'Winter') {
    // Winter daylight hours: 0700-1700.
    if (hour < 6 || hour > 15) {
      theme = 'dark';
    }
  }

  if (season === 'Autumn' || season === 'Spring') {
    // Autumn and Spring daylight hours: 0600-1800.
    if (hour < 5 || hour > 16) {
      theme = 'dark';
    }
  }

  return theme;
};

export default getUniformTheme;
