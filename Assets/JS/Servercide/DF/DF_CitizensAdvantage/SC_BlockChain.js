//SC_BlockChain
////////////////////////////
var SC_BlockChain = function(root) {
  var defaultParams = {
    "peerList": [
      "127.0.0.1"
    ]
  };
  var promise = ServercideApp.call(this, root, "BlockChain", defaultParams);

  this.finishStrapping();
  return promise;
}
SC_BlockChain.prototype = Object.create(ServercideApp.prototype);
////////////////////////////
