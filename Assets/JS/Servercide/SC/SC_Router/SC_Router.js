//SC_Router
////////
var SC_Router = function (element) {
  var defaultParams = {};
  var URLParams = window.location.search.substring(window.location.search.indexOf("/?/") + 3).split("/");
  URLParams.forEach(function (URLParam, idx) {
    URLParam = decodeURIComponent(URLParam);
    defaultParams["g:" + URLParam.split(":")[0]] = URLParam.split(":")[1];
  });
  var promise = new ServercideApp(this, element, "SC_Router", defaultParams);
  return promise;
}
////////
