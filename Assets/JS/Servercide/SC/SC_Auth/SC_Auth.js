//SC_Auth
////////////////////////////
var SC_Auth = function (element) {
  var defaultParams = {};
  var promise = ServercideApp.call(this, element, "SC_Auth", defaultParams);
  return promise;
}
SC_Auth.prototype = Object.create(ServercideApp.prototype);
////////////////////////////
