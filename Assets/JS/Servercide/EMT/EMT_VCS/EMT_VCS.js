//SC_VCS
////////////////////////////
var SC_VCS = function (element) {
  var defaultParams = {};
  var promise = ServercideApp.call(
    this, element, "SC_VCS", defaultParams
  );
  return promise;
}
SC_VCS.prototype = Object.create(ServercideApp.prototype);
////////////////////////////
