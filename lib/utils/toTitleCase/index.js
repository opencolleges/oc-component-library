const toTitleCase = title => {
  if (typeof title === 'string') {
    return title.charAt(0).toUpperCase() + title.slice(1);
  } else if (Array.isArray(title)) {
    const newTitles = [];

    title.forEach((string, index) => {
      const newTitle =
        index === 0
          ? string.charAt(0).toUpperCase() + string.slice(1)
          : index === title.length - 1
          ? ` and ${string.charAt(0).toUpperCase() + string.slice(1)}`
          : `, ${string.charAt(0).toUpperCase() + string.slice(1)}`;

      newTitles.push(newTitle);
    });

    return newTitles;
  } else {
    return '';
  }
};

export default toTitleCase;
