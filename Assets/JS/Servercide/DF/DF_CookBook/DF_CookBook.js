//SC_CookBook app definition
//V1.0
////////////////////////////
var SC_CookBook = function (element) {
    var defaultParams = {};
    var promise = ServercideApp.call(
        this, element, "SC_CookBook", defaultParams,
        SC_Template.prototype.onStrap//, SC_Template.prototype.postStrap, SC_Template.prototype.discoveryComplete
    );
    return promise;
}
SC_Template.prototype = Object.create(ServercideApp.prototype);

SC_Template.prototype.onStrap = function (app) {
    return new Promise(function (fulfill, reject) {
        console.log('recipes!')
        fulfill();
    });
}

  // SC_Template.prototype.postStrap = function (app) {
  //   return new Promise(function (fulfill, reject) {
  //     fulfill();
  //   });
  // }

  // SC_Template.prototype.discoveryComplete = function (app) {
  //   return new Promise(function (fulfill, reject) {
  //     fulfill();
  //   });
  // }
  ////////////////////////////
