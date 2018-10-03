//http://www.soa-world.de/echelon/2010/09/diffie-hellman-key-exchange-in-javascript.html

function d_h()
{
  // Alice tries to send to Bob, they agree on a 256 bit prime
  var p = str2bigInt(
    "10883804965994030335610375728683210724614077" + 
    "5791152305372594007835539736018383", 10, 80); 
  var g = str2bigInt("2", 10, 80);       // and on a generator
  
  // Alice chooses her secret randomly
  var a = str2bigInt(
    "3103830701216420526524336327874353922197141754" + 
    "5159778383387464250", 10, 80);

  // Bob chooses his secret randomly
  var b = str2bigInt(
    "26264611999731746945409581849451656136966431" + 
    "516270225144913718599547", 10, 80);

  // calculate the public key
  var A = powMod(g,a,p); var B = powMod(g,b,p);

  // A and B are exchanged publicly
  // Alice and Bob can compute the same key from A and B
  var a_sec = powMod(B, a, p);
  var b_sec = powMod(A, b, p);

  alert(bigInt2str(a_sec, 10) + '\n ' + bigInt2str(b_sec, 10));
}