import date from '../date';

const getUITheme = () => {
  let theme = 'light';

  const season = date.getSeason();
  const hour = date.getHour();

  if (season === 'summer') {
    // Summer daylight hours: 0500-1900.
    if (hour < 4 || hour > 17) {
      theme = 'dark';
    }
  }

  if (season === 'winter') {
    // Winter daylight hours: 0700-1700.
    if (hour < 6 || hour > 15) {
      theme = 'dark';
    }
  }

  if (season === 'autumn' || season === 'spring') {
    // Autumn and Spring daylight hours: 0600-1800.
    if (hour < 5 || hour > 16) {
      theme = 'dark';
    }
  }

  return theme;
};

export default getUITheme;
