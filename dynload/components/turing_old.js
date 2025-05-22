var data;
var tm;
var curdoc,tapeout,picdiv,result;
var tapes = [],tape,tapePos;
var tapeIndex = 0;
var okInput;
var picdiv,tapeOut;
var stepping = false, simReady = true, newSim = true;
var curState = undefined;
var TMok;
var intTimer;
var tapeArray;
var reset;
var simSpeed = 10;
var speedchoices = [100,10,5,1];
var speedindex = 0;
var speedfield;


function setData(d) {
  data = d
  var res = readTMText(d)
  TMok = res[0]
  tm = res[1]
  newSim = true;
  updatePict();
  if (tape !== undefined) tapeOut.innerHTML = tape;
  result.innerHTML = ''
}

function readTMText(txt) {
    lines = txt.split('\n')
    return readTMLines(lines)
}

function updatePict() {
  if (TMok) {
    var [_,start,_,_] = tm;
    var dot = genDot(tm,curState);
    var svg = Viz(dot, "svg");
    picdiv.innerHTML = svg;
  }
  else {
    picdiv.innerHTML = tm[0];
  }
}

function nextTape() {
  tapeIndex = (tapeIndex + 1) % tapes.length;
  tape = tapes[tapeIndex];
  tapeOut.innerHTML = tape;
  tapePos = 0;
  curState = undefined;
  newSim = true;
  updatePict();
}

function readTMLines(lines) {
    var transitions = []
    var k = 1
    var rstates = []
    tapes = []
    for (var line of lines) {
        line = line.trim(' ');
        if (line[0] == '#') continue;
        var ws = line.split(" ");
        if (ws.length == 1) {
          //console.log(ws[0]); //alert('skip line: ' + ws[0].length)
        }
        else if (ws.length > 0 && ws[0] == 'start') {
            if (ws.length != 2) return [false,"error in line " + k + " start: start state"]
            startstate = ws[1]
        }
        else if (ws.length > 0 && ws[0] == 'accept') {
            if (ws.length < 2) return [false,"error in line " + k + " accept: accept states (at least one)"]
            endstates = ws.slice(1)
        }
        else if (ws.length > 0 && ws[0] == 'reject') {
            if (ws.length < 2) return [false,"error in line " + k + " reject: reject states (at least one)"]
            rstates = ws.slice(1)
        }
        else if (ws[0] == 'tape') {
          tapes.push(ws[1])
        }
        else if (ws[0] == 'speed') {
          if (ws[1] == 'slow') simSpeed = 10
          //alert('slow' + simSpeed)
        }
        else if (ws.length == 5) {
            start = ws[0]
            sym   = ws[1]
            wsym  = ws[2]
            lr    = ws[3]
            end   = ws[4]
            transitions.push([start,sym,wsym,lr,end])
        }
        else if (ws.length > 0) {
          return [false,"error in line " + k + " transition: fromstate readsym writesim L/R tostate"]
        }
        k += 1
  }
  if (tapes.length > 0) tape = tapes[0];
  return [true,[transitions,startstate,endstates,rstates]]
}

function genDot(tm,curState = undefined) {
  //console.log(curState)
  var dot = 'digraph finite_state_machine {\n rankdir=LR; \n size="8,5"\n';
  var [ts,ss,ess,_] = tm
  var states = allStates(tm);
  dot += '  node [fontsize=10, fontname="Monospace",shape = point] start;\n';
  for (var state of states) {
    if (state == curState) {
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
  dot += '  edge[fontsize=11, fontname="Monospace"];\n'
  dot += '  start -> ' + ss + ';\n';
  for ([f,s,ws,lr,t] of ts)
      dot += '    ' + f + ' -> ' + t + ' [ label = "'  + (s == ws? s  : s +  '|' + ws) + ' ' + lr + '" ];\n';
  dot += '}\n'
  return dot;
}
  
function stepString() {
  //console.log('step')
  if (newSim && tape != undefined) {
    newSim = false;
    simReady = false;
    tapePos = 0;
    okInput = false;
    tapeArray = tape.split('')
    var [_,ss,_,_] = tm;
    curState = ss;
    result.innerHTML = 'simulate';
    updatePict();
    tapeOut.innerHTML = colorLetter(tapeArray.join(''),tapePos);
  }
  else if (!simReady){
    stepTuring();
    tapeOut.innerHTML = colorLetter(tapeArray.join(''),tapePos);
    updatePict();
    //if (!newSim) result.innerHTML = 'simulate';
  }
}

function checkString() {
  //console.log('checking');
  reset.disabled = false
  intTimer = setInterval(stepString,simSpeed);
}

function resetSim() {
  clearInterval(intTimer);
  tape = tapes[tapeIndex];
  //tapeOut.innerHTML = tape;
  tapePos = 0;
  curState = undefined;
  newSim = true;
  simReady = true;
  reset.disabled = true;
}

function stepTuring() {
    var [ts,start,ess,rss] = tm
    if (!ess.includes(curState) && !rss.includes(curState )) {
        var sym = tapeArray[tapePos]
        var res = ts . filter(([q,readsym,a,b,c]) => (curState == q && sym == readsym)) . map(([a,b,wsym,d,qe]) => [wsym,d,qe] )
        if (res.length == 0) {
          resetSim()
          result.innerHTML = 'Reject'
          console.log('unexpected stop of TM')
          return false
        }
        else {
            var [wsym,d,newstate] = res[0]
            curState = newstate
            tapeArray[tapePos] = wsym
            if (d == 'R') tapePos++; else tapePos--;
            if (tapePos >= tapeArray.length) tapeArray.push('_')
        }
    }
    if (ess.includes(curState)) {
      resetSim()
      result.innerHTML = 'Accept'
      return true
    }
    else if (rss.includes(curState)){
      resetSim()
      result.innerHTML = 'Reject'
      return false
    }
}

function allStates(tm) {
  var res = [];
  var [ts,_,_,_] = tm;
  for (var [f,_,_,_,t] of ts) {
    if (!res.includes(f)) res.push(f);
    if (!res.includes(t)) res.push(t);
  }
  return res;
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

function toggleSpeed(){ 
  speedindex = (speedindex + 1) % speedchoices.length;
  simSpeed = 1000 / speedchoices[speedindex];
  speedfield.textContent = 'Simulation speed (click to change): ' + speedchoices[speedindex];
  if (!simReady) {
    clearInterval(intTimer);
    intTimer = setInterval(stepString,simSpeed);
  }
}

class TuringComp extends HTMLElement {
  constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
<div id="picture"></div>
<br>
<pre id="string"></pre><div id="result"></div>
<br>
<button type="button"id="check">Run</button>
<button type="button"id="step">Step</button>
<button type="button"id="reset"disabled="true">Reset</button>
<pre id="speedfield" onclick="toggleSpeed()" >Simulation speed (click to change): 100 </pre>
<button type="button"id="next">Next Example Tape</button>

`;

  }
  connectedCallback() {
    console.log('connected');
    var check = this.shadowRoot.getElementById("check");
    var step  = this.shadowRoot.getElementById("step");
    var next  = this.shadowRoot.getElementById("next");
    reset  = this.shadowRoot.getElementById("reset");
    check.addEventListener('click',() => checkString());
    speedfield = this.shadowRoot.getElementById("speedfield");
    step.addEventListener('click',() => stepString());
    next.addEventListener('click',() => nextTape());
    reset.addEventListener('click',() => resetSim());
    curdoc   = this.shadowRoot;
    tapeOut = curdoc.getElementById("string");
    result   = curdoc.getElementById("result");
    picdiv   = curdoc.getElementById("picture");

  }

}

// Registreer custom element
customElements.define('turing-comp', TuringComp);

// tvb1.txt: whwb met w (0|1)*, dus voor en na h zelfde string, b afsluitsynbool
// tvb2: 0 * 2^n  b afsluitsynbool: aantal nullen is macht van 2

var vbtm2 =
`q1 0 _ R q2
q2 _ _ R qe
q2 x x R q2
q2 0 x R q3
q3 x x R q3
q3 0 0 R q4
q3 _ _ L q5
q4 x x R q4
q4 0 x R q3
q5 0 0 L q5
q5 x x L q5
q5 _ _ R q2
start q1
accept qe

tape 0000000000000000000000000000000000000000000000000000000000000000
`

