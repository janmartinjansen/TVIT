//"use strict"
var stateIndex;
var simStates;
var curdoc;
var intTimer;
var inputdfm,fsm,tape;
var tape_out,result;
var stepping = false;
var data;
var tapes;
var tapeIndex = 0;
var okInput, fsmOK;
var ndfadiv,dfadiv,picdiv;
var isRegExp;

function setData(d) {
  data = d;
  fsmOK = false;
  [fsm,tape] = readFSM(d);
  if (!fsmOK) return;
  if (isDFA(fsm) && !isRegExp) {
    picdiv = dfadiv;
    ndfadiv.innerHTML = '';
    updatePict();
  }
  else {
    picdiv = ndfadiv;
    updatePict();
    fsm = genDFSM(fsm);
    picdiv = dfadiv;
    updatePict();
  }
  stateIndex = 0;
  stepping = false;
  if (tape !== undefined)
    tape_out.innerHTML = tape;
  else {
    tape_out.innerHTML = '';
  }
  result.innerHTML = '---';
}


function updatePict(state = undefined) {
  var [_,start,_] = fsm;
  if (state === undefined) state = start;
  if (fsm.length == 3) {
    var dot = genDFA(fsm,state);
    var svg = Viz(dot, "svg");
    console.log(svg)
    picdiv.innerHTML = svg;
  }
  else {
    picdiv.innerHTML = fsm[0];
  }
}

function displayNext() {
  tape_out.innerHTML = colorLetter(tape,stateIndex);
  updatePict(simStates[stateIndex++]);
  if (stateIndex == simStates.length) {
    result.innerHTML = okInput;
    clearInterval(intTimer);
    stepping = false;
  }
}

function stepString() {
  if (!stepping) checkString(true);
  stepping = true;
  displayNext();
}

function checkString(step = false) {
  if (fsm.length == 3) {
    [okInput,states] = simulateFSM(fsm,tape);
    simStates = states;
    stateIndex = 0;
    tape_out.innerHTML = colorLetter(tape,stateIndex);
    result.innerHTML = '---';
    if (!step) {
      intTimer = setInterval(displayNext,10);
    }
  }
  else {
    mydiv.innerHTML = fsm[0];
  }
}

function addState(states,state) {
  if (!states.includes(state)) {
    states.push(state);
  }
}

function nextTape() {
  tapeIndex = (tapeIndex + 1) % tapes.length;
  tape = tapes[tapeIndex];
  tape_out.innerHTML = tape;
  result.innerHTML = '---'
  stateIndex = 0;
  updatePict();
}

function readFSM(inp) {
          tapes = [];
          tapeIndex = 0;
          isRegExp = false;
          var REfsm;
          var curtape;
          var inp = inp.trim('\n');
          var lines = inp.split("\n");
          var transitions = [];
          var hasStart = 0;
          var hasEnd = 0;
          var tsOk = 1;
          var error = 'ok';
          var inp = '';
          var linenr = 0;
          for (var line of lines) {
              linenr++;
              line = line.trim(' ');
              if (line[0] == '#') continue;
              var ws = line.split(" ");
              if (ws.length == 1) {
                //alert('maybe RE: ' + ws[0])
                //console.log(ws[0]); //alert('skip line: ' + ws[0].length)
                var e = ws[0];
                if (e.length >= 1 && isRE(e)) {
                  REfsm = readRE(e);
                  //alert([REfsm,isDFA(REfsm)])
                  isRegExp = true;
                }
              }
              else if (ws[0] == 'start') {
                  var startstate = ws[1];
                  hasStart = 1;
              }
              else if (ws[0] == 'end') {
                  var endstates = ws.slice(1);
                  hasEnd = 1;
              }
              else if (ws[0] == 'tape') {
                  curtape = ws[1];
                  tapes.push(curtape);
              }
              else {
                  if (ws.length != 3) {
                    tsOk = 0;
                //    alert('line = ' + line + ws.length)
                //    alert(ws[0].charCodeAt(0))
                    error = ['error in line ' + linenr + '. Transition shoud be: startstate symbol endstate'];
                }
                  var start  = ws[0];
                  var symbol = ws[1];
                  var end    = ws[2];
                  transitions.push([start,symbol,end])
                }
          }
          if (tapes.length > 0)
            tape = tapes[0];
          else
            tape = undefined;
          if (isRegExp) {
            fsmOK = true;
            return [REfsm,tape];
          }
          else if (tsOk && hasStart && hasEnd) {
            fsmOK = true;
            return [[transitions,startstate,endstates],tape];
          }
          else {
            if (!hasStart) error    = ['specify a startstate: start state'];
            else if (!hasEnd) error = ['state machine should at least has one end state'];
            return [error];
          }
}

function genDFA(fsm,curstate = undefined) {
  var dot = 'digraph finite_state_machine {\n rankdir=LR; \n size="8,5"\n';
  [ts,ss,ess] = fsm;
  var ness;
  var states = allStates(fsm);
  dot += '  node [shape = point,color = "black"] start;\n';
  for (var state of states) {
    if (state == curstate) {
      if (ess.includes(state))
        dot += '  node [shape = doublecircle, color = "red"] ' + state + ';\n';
      else
        dot += '  node [shape = circle, color = "red"] ' + state + ';\n';
    }
    else {
      if (ess.includes(state))
        dot += '  node [shape = doublecircle, color = "black"] ' + state + ';\n';
      else
        dot += '  node [shape = circle, color = "black"] ' + state + ';\n';
    }
  }
  dot += '  start -> ' + ss + ';\n';
  for (t of ts)
      dot += '    ' + t[0] + ' -> ' + t[2] + ' [ label = "'  + t[1] + '" ];\n'
  dot += '}\n'
  return dot;
}

function allStates(fsm) {
  var res = [];
  var [ts,_,_] = fsm;
  for (var [f,_,t] of ts) {
    if (!res.includes(f)) res.push(f);
    if (!res.includes(t)) res.push(t);
  }
  return res;
}

function simulateFSM(fsm,string) {
   [ts,ss,ess] = fsm;
   states = [ss];
   state = ss;
   for (c of string) {
        found = false;
        for (trans of ts) {
          [f,s,t] = trans;
            if (f == state && s == c) {
                found = true;
                state = t;
                states.push(state);
                break;
            }
        }
        if (!found) return [false,states];
    }
    return [ess.includes(state),states];
}

function colorLetter(text,index) {
  let newText = "";
  for (let i = 0; i < text.length; i++) {
      if (i === index) { // Index van de letter die je wilt inkleuren
          newText += "<span style='color: red;'>" + text[i] + "</span>";
      } else {
          newText += text[i];
      }
  }
  return newText;
}

function appendLine() {
  var nn = curdoc.createElement('div');
  nn.innerHTML = '<button type="button" id="appendLine">Append</button>'
  //var node = doc.getElementById("appendLine")
  //doc.appendChild(node.cloneNode(true))
  doc.appendChild(nn)
}

function isRE(es) {
  for (e of es) {
    if (!'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789()[]+*|-.'.includes(e)) return false;
  }
  return true;
}

function isDFA(fsm) {
  const mymap = {};
  [ts,_,_] = fsm;
  for (var [f,s,t] of ts) {
    //console.log([mymap,f,s,Object.keys(mymap)])
    if (Object.keys(mymap).includes(f)) {
      //console.log('testing')
      if (mymap[f].includes(s)) {
        return false;
      }
      else {
        mymap[f].push(s)
      }
    } else {
      mymap[f] = [s];
    }
  }
  //console.log(mymap)
  return true;
}

class AutoInput extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
<div id="ndpicture"></div>
<div id="picture"></div>
<br>
<pre id="string"></pre><div id="result"></div>
<br>
<button type="button"id="check">Check Input</button>
<button type="button"id="step">Step Input</button>
<br>
<button type="button"id="next">Next Example Input</button>

`;

    }
    connectedCallback() {
      var check = this.shadowRoot.getElementById("check");
      var step = this.shadowRoot.getElementById("step");
      var next = this.shadowRoot.getElementById("next");
      check.addEventListener('click',() => checkString());
      step.addEventListener('click',() => stepString());
      next.addEventListener('click',() => nextTape());
      curdoc   = this.shadowRoot;
      tape_out = curdoc.getElementById("string");
      result   = curdoc.getElementById("result");
      dfadiv   = curdoc.getElementById("picture");
      ndfadiv  = curdoc.getElementById("ndpicture");

    }

}

// Registreer custom element
customElements.define('auto-input', AutoInput);


function genDFSM(fsm) {
    var [ts,ss,ess] = fsm
    var dfm = makeDFSM(fsm)
    var startset = extendEpsRec(fsm,[ss])
    var start = flatout(startset)
    var dts = []
    for ([f,s,t] of dfm)
      dts.push([flatout(f),s,flatout(t)])
    var dess = []
    if (hasIntersect(startset,ess))
      dess.push(flatout(startset))
    for (var [f,s,t] of dfm)
        if (hasIntersect(t,ess) &&   !dess.includes(flatout(t)))
            dess.push(flatout(t))
    return [dts,start,dess]
}

function makeDFSM(fsm) {
    var transitions = [];
    var [ts,ss,ess] = fsm;
    var start = extendEpsRec(fsm,[ss]);
    var toBeHandled = [start];
    //console.log(toBeHandled)
    var handled = [];
    var count = 1
    while (toBeHandled.length > 0) {
      var stateset = toBeHandled.pop();
      //console.log(toBeHandled)
      if (!listInListset(stateset,handled))
          handled.push(stateset)
      var syms = symsAtStates(fsm,stateset)
      //console.log(syms)
      for (var s of syms) {
          var target = reachableStates(fsm,stateset,s)
          //console.log(target)
          if (!listInListset(target,handled) && !listInListset(target,toBeHandled))
              toBeHandled.push(target)
          if (!checkTransition([stateset,s,target],transitions))
              transitions.push([stateset,s,target])
      }
      //console.log(transitions)
      count++
    }
    return transitions
}

function symsAtStates(fsm,states) {
    var res = []
    var [ts,ss,ess] = fsm
    for (var [f,s,t] of ts)
        if (states.includes(f) && s != 'eps' && !res.includes(s))
            res.push(s)
//console.log(['sis',states,res])
    return res
}

function reachableStates(fsm,states,symbol) {
    var [ts,ss,ess] = fsm
    var res = []
    for (var [f,s,t] of ts)
      if (states.includes(f) && s == symbol && !res.includes(t))
        res.push(t)
    var extres = extendEpsRec(fsm,res)
    extres.sort()
    return extres
}

function extendEpsRec(fsm,states) {
    var [ts,ss,ess] = fsm
    var res    = states
    var extres = extendEps(fsm,states,res)
    while (extres.length > 0) {
        unionlist(res,extres)
        //console.log(res)
        extres = extendEps(fsm,extres,res)
    }
    return res
}

function unionlist(ls,bs) {
    for (var b of bs)
        if (!ls.includes(b))
            ls.push(b)
    return ls
}

function extendEps(fsm,stateset,excluded) {
    var [ts,ss,ess] = fsm
    var res = []
    for (var [f,s,t] of ts)
      if (stateset.includes(f) && s == 'eps' && !excluded.includes(t) && !res.includes(t))
        res.push(t)
    return res
}

function flatout(s) {
    return s.join('')
}

function listInListset(ls,lss) {
  for (var bs of lss)
    if (eqList(ls,bs)) return true
  return false
}

function hasIntersect(ls,bs) {
    for (var b of bs)
        if (ls.includes(b))
            return true
    return false
}

function eqList(ls,bs) {
  for (var e of ls)
    if (!bs.includes(e)) return false
    for (var e of bs)
      if (!ls.includes(e)) return false
  return true
}

function checkTransition(ts,tss) {
  for (var ns of tss)
    if(eqListorder(ts,ns)) return true
  else return false
}

function eqListorder(ls,bs) {
  if (ls.length != bs.length) return false
  for (var i = 0; i < bs.length;i++)
    if (ls[i] != bs[i]) return false
  return true
}

// regexpr
var pos
var inp
var curtok
var inplength

function readRE(txt) {
  var res = start(txt)
  return re2ndfa(res)
}

function re2NDFA(txt) {
  var txt = document.getElementById("redata").value
  var res = start(txt)
//  console.log(res)
  var fsm = re2ndfa(res)
  dfsm = genDFSM(fsm)
  fsmRead = true
  var mydiv1 = document.getElementById("picture");
  var mydiv2 = document.getElementById("dfmpic");
  var dot1 = genDFA(fsm);
  var dot2 = genDFA(dfsm);
  dfmCreated = true
  var svg1 = Viz(dot1, "svg");
  var svg2 = Viz(dot2, "svg");
  mydiv1.innerHTML = svg1;
  mydiv2.innerHTML = svg2;
//  console.log(dfsm)
}

function resettok() {
  pos = -1
}

function nexttok() {
  pos++
  if (pos == inp.length) {
    curtok = -1
    return -1
}
  while (inp[pos] == ' ') pos++
  curtok = inp[pos]
//  console.log(curtok)
  return curtok
}

function start(str){
  inp = str
  resettok()
  nexttok()
  return re()
}

function re() {
  var res = te()
  while (curtok == '|') {
    nexttok()
    res = ['Or',res,te()]
  }
  return res
}

function te() {
  var res = fe()
  while (isSym(curtok) || curtok == '[' || curtok == '(')
    res = ['@',res,te()]
  return res
}

function fe() {
  var res
  if (isSym(curtok)) {
    res = ['Sym',curtok]
    nexttok()
    if (curtok == '*') {
      nexttok()
      res = ['Many',res]
    }
    else if (curtok == '+') {
      nexttok()
      res = ['@',res,['Many',res]]
    }
    return res
  }
  else if (curtok == '[') {
    nexttok()
    res = re()
    if (curtok != ']')
      console.log('missing ]')
    nexttok()
    return ['Option',res]
  }
  else if (curtok == '(') {
    nexttok()
    res = re()
    if (curtok != ')')
      console.log('missing )')
    nexttok()
    if (curtok == '*') {
      nexttok()
      res = ['Many',res]
    }
    else if (curtok == '+') {
      nexttok()
      res = ['@',res,['Many',res]]
    }
    return res
  }
  else {
    alert('unexpected token: ' + curtok)
    nexttok()
  }
}

function isSym(c) {
  return c != -1 && (c >= 'a' && c <= 'z' ||
         c >= '0' && c <= '9' ||
         c >= 'A' && c <= 'Z' ||
         c == '.' || c == ',' || c == '_' || c == '-')
}

function re2ndfa(re) {
  var [ts,sn] = re2ndfas(re,1)
  return [ts,1,[sn]]
}

function re2ndfas(re,sn) {
  if (re[0] == 'Sym') return [[[sn,re[1],sn+1]],sn+1]
  else if (re[0] == '@') {
    var [lts,lsn] = re2ndfas(re[1],sn)
    var [rts,rsn] = re2ndfas(re[2],lsn)
    return [lts.concat(rts),rsn]
  }
  else if (re[0] == 'Option') {
    var [lts,lsn] = re2ndfas(re[1],sn)
    return [lts.concat([[sn,'eps',lsn]]),lsn]
  }
  else if (re[0] == 'Many') {
    var [lts,lsn] = re2ndfas(re[1],sn)
    return [lts.concat([[sn,'eps',lsn],[lsn,'eps',sn]]),lsn]
  }
  else if (re[0] == 'Or') {
    var [lts,lsn] = re2ndfas(re[1],sn+1)
    var [rts,rsn] = re2ndfas(re[2],lsn+1)
    var extra = [[sn,'eps',sn+1],[sn,'eps',lsn+1],[lsn,'eps',rsn+1],[rsn,'eps',rsn+1]]
    return [lts.concat(rts).concat(extra),rsn+1]
  }
}
