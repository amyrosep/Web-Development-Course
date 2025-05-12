
exports.getDate = function getDate() {
  let today = new Date();
  let dayString = today.toLocaleDateString('en-us', {weekday: 'long', day: "numeric", month: "long"});
  return dayString;
}

exports.getDay = function getDay() {
  let today = new Date();
  let dayString = today.toLocaleDateString('en-us', {weekday: 'long'});
  return dayString;
}
