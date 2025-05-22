function padRight(str, n) {
  const padLength = n - str.length;
  if (padLength > 0) {
    return str + ' '.repeat(padLength);
  }
  return str;
}

function frameW(pic,width) {
  var res = [];
  for (var line of pic) {
    res.push(padRight(line,width));
  }
  return res;
}

function frameWH(pic,width,heigth) {
  var res = [];
  for (var line of pic) {
    res.push(padRight(line,width));
  }
  for (var i=0;i<height-pic.length;i++)
    res.push(' '.repeat(width));
  return res;
}

function besides(left,right) {
  var wleft  = left[0].length;
  var wright = right[0].length;
  var res = [];
  var d = right.length - left.length;
  if (d <= 0) {
    for(var i=0;i<left.length+d;i++)    res.push(left[i] + right[i]);
    for(var i=left.length+d;i<left.length;i++) res.push(left[i] + ' '.repeat(wright));
  }
  else {
    for(var i=0;i<left.length;i++) res.push(left[i] + right[i]);
    for(var i=right.length+d;i<left.length;i++) res.push(left[i] + ' '.repeat(wright));
  }
}