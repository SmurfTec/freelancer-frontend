export const trimString = (string, maxLength) => {
  // var yourString = 'The quick brown fox jumps over the lazy dog'; //replace with your string.
  var maxLength = 30; // maximum number of characters to extract

  //trim the string to the maximum length
  var trimmedString = string.substr(0, maxLength);

  //re-trim if we are in the middle of a word
  trimmedString = trimmedString.substr(
    0,
    Math.min(trimmedString.length, trimmedString.lastIndexOf(' '))
  );

  return trimmedString;
};
