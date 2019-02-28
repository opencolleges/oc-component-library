// * Determine if a character is a vowel and return true or false

const isVowel = character => {
  return ['a', 'e', 'i', 'o', 'u'].indexOf(character.toLowerCase()) !== -1;
};

export default isVowel;
