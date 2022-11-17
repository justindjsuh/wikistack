function makeSlug(title) {
  let wordsArray = title.split(" ");
  var regexPattern = /[^A-Za-z0-9]/g;
  // for each element of wordsArray, apply this crazy regex thing.
  return wordsArray.map((word) => word.replace(regexPattern, "")).join("_"); // this step wiped out the non-alphanums
}

console.log(makeSlug("These aren't the droids we are seeking, dangit!!!"));

// apparently this code below filters alphanums? even removes spaces.
// var str = "linux is the #### best";
// var regexPattern = /[^A-Za-z0-9]/g;
// var ans = str.replace(regexPattern, "");
// console.log(ans) --> linuxisthebest
