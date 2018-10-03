SC_src = {
  "SC_FlexGrid": {
    "const": SC_FlexGrid.toString(),
  }
};
for (var pfunc in SC_FlexGrid.prototype){
  if (pfunc != "__proto__"){
    SC_src["SC_FlexGrid"][pfunc] = SC_FlexGrid.prototype[pfunc].toString();
  }
};

for (var a in SC_src){
  eval("var " + a + " = new Function('return ' + '" + SC_src["const"] + "')();");
  for (var f in SC_src[a]){
    eval(a + ".prototype." + f + " = new Function('return ' + '" + SC_src[f] + "')();");
  }
}
