module.exports = (() => {
  /**
   * Takes a post title, returns the processed title.
   *
   * DONE: Replace texts surrounded by [] and 【】 and () and （） with boxed-span texts
   * E.g.: "Text[233]Item(s)" =>
   *   [{text: "Text", box: false}, {text: "233", box: "solid"}, {text: "Item", box: false}, {text: "s", box: "dashed"}]
   *
   * @param title
   */
  let parsePostTitle = (title) => {
    title = title.trim();
    let result = [];
    while (stringNotEmpty(title)) {
      let pairs = getCompleteBracketPairs(title), temp;
      if (pairs) {
        if (stringNotEmpty(temp = title.substring(0, pairs[0]).trim())) result.push({text: temp, box: false});
        if (stringNotEmpty(temp = title.substring(pairs[0] + 1, pairs[1]).trim())) {
          result.push({text: temp, box: pairs[2]});
        } else {
          result.push({text: ' ', box: pairs[2]});
        }
        title = title.substring(pairs[1] + 1).trim();
      } else {
        result.push({text: title.trim(), box: false});
        title = "";
      }
    }
    return result;
  };
  
  /**
   * Tests if a string has at least one complete bracket pairs.
   *
   * If yes, return the indexes of bracket pairs, followed by bracket types. If no, return false.
   *
   * @param str
   */
  let getCompleteBracketPairs = (str) => {
    let start, end;
    if ((start = str.indexOf('[')) > -1 && ((end = str.indexOf(']')) > -1)) {
      return [start, end, "solid"];
    } else if ((start = str.indexOf('【')) > -1 && ((end = str.indexOf('】')) > -1)) {
      return [start, end, "solid"];
    } else if ((start = str.indexOf('(')) > -1 && ((end = str.indexOf(')')) > -1)) {
      return [start, end, "dashed"];
    } else if ((start = str.indexOf('（')) > -1 && ((end = str.indexOf('）')) > -1)) {
      return [start, end, "dashed"];
    }
    return false;
  };
  
  /**
   * Tests if a string is not empty.
   * The following values will give false: null, undefined, "", "    ", etc.
   *
   * @param str
   * @returns {boolean}
   */
  let stringNotEmpty = (str) => {
    return !!(str && str.trim());
  };
  
  return {
    parsePostTitle: parsePostTitle,
    getCompleteBracketPairs: getCompleteBracketPairs,
    stringNotEmpty: stringNotEmpty
  };
})();