//"use strict"
var stringIndex;
var simStates;
var curdoc;
var intTimer;
var inputdfm,fsm,tape;
var tape_out,result;
var stepping = false,  newSim = true;
var data;
var tapes;
var tapeIndex = 0;
var okInput;
var picdiv;
var stack = [];
var curState;
var fsmOK;

function setData(d) {
  data = d;
  fsmOK = false;
  stringIndex = 0;
  curState = undefined;
  [fsm,tape] = readPDA(d);
  //console.log(fsm);
  newSim = true;
  updatePict();
  if (tape !== undefined) tape_out.innerHTML = tape;
  result.innerHTML = '';
}


function updatePict() {
  if (fsm.length == 3) {
    fsmOK = true;
    var [_,start,_] = fsm;
    //if (curState === undefined) curState = start;
    var dot = genDFA(fsm,curState);
    var svg = Viz(dot, "svg");
    picdiv.innerHTML = svg;
  }
  else {
    picdiv.innerHTML = fsm[0];
  }
}


function stepString() {
  //console.log('step')
  if (newSim && tape != undefined) {
    newSim = false;
    stringIndex = 0;
    okInput = false;
    var [_,ss,_] = fsm;
    curState = ss;
    result.innerHTML = 'Simulate, stack = ' + printStack(stack);
    //step();
    updatePict();
    tape_out.innerHTML = colorLetter(tape,stringIndex);
  }
  else {
    step();
    tape_out.innerHTML = colorLetter(tape,stringIndex);
    if (!newSim) result.innerHTML = 'Simulate, stack = ' + printStack(stack);
  }
}

function checkString() {
  //console.log('checking');
  result.innerHTML = 'Simulate';
  intTimer = setInterval(stepString,10);
}

function step() {
  var [ts,ss,ess] = fsm;
  if (fsmOK) { // zoek naar de juiste regel
    for (var [f,s,sb,sa,t] of ts) {
      if (curState == f && (s == '-' || (stringIndex < tape.length && tape[stringIndex] == s)) && doStack(stack,sb,sa)) {
          curState = t;
          if (s !='-') stringIndex++;
          updatePict();
          if (stringIndex == tape.length && stack.length == 0 && ess.includes(curState)) { // end reached
            clearInterval(intTimer);
            okInput = true;
            result.innerHTML = '<span style="color: green;">Accept</span>';
            newSim = true;
          }
          return true
      }
    }
    clearInterval(intTimer);
    okInput = false;
    result.innerHTML = '<span style="color: red;">Reject</span>';
    newSim = true;
    stack = [];
    return false;
  }
}

function printStack(st) {
  var res = '';
  for (var s of st) {
    res = s + ' ' + res;
  }
  return res + '|';
}

function doStack(stack,sb,sa) {
    if (sb == '-' && sa == '-')
        return true
    else if (sb == '-') {
        stack.push(sa)
        return true
    }
    else if (!stack.length == 0 && stack[stack.length-1] == sb) {
        stack.pop();
        if (sa != '-')
            stack.push(sa);
        return true;
    }
    else
        return false;
}

function nextTape() {
  tapeIndex = (tapeIndex + 1) % tapes.length;
  tape = tapes[tapeIndex];
  tape_out.innerHTML = tape;
  stringIndex = 0;
  curState = undefined;
  updatePict();
}

function readPDA(inp) {
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

                //console.log(ws[0]); //alert('skip line: ' + ws[0].length)
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
                  if (ws.length != 4) {
                    tsOk = 0;
                //    alert('line = ' + line + ws.length)
                //    alert(ws[0].charCodeAt(0))
                    error = ['error in line ' + linenr + '. Transition shoud be: startstate symbol endstate'];
                }
                  var start  = ws[0];
                  var symbol = ws[1];
                  var ss     = ws[2];
                  var [b,a]  = ss.split('/');
                  var end    = ws[3];
                  transitions.push([start,symbol,b,a,end])
                }
          }
          tape = tapes[0];
          if (tsOk && hasStart && hasEnd)
            return [[transitions,startstate,endstates],tape];
          else {
            if (!hasStart) error    = ['specify a startstate: start state'];
            else if (!hasEnd) error = ['state machine should at least has one end state'];
            return [error];
          }
}

function genDFA(fsm,curState = undefined) {
  var dot = 'digraph finite_state_machine {\n rankdir=LR; \n size="8,5"\n';
  [ts,ss,ess] = fsm;
  var ness;
  var states = allStates(fsm);
  dot += '  node [shape = point,color = "black"] start;\n';
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
  dot += '  start -> ' + ss + ';\n';
  for ([f,s,sb,sa,t] of ts)
      dot += '    ' + f + ' -> ' + t + ' [ label = "'  + s + ' ' + sb + '/' + sa + '" ];\n';
  dot += '}\n'
  //console.log(dot);
  return dot;
}

function allStates(fsm) {
  var res = [];
  var [ts,_,_] = fsm;
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


class PDAutoInput extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
 <style>
 :host {
    box-sizing: border-box;
    display: block;
    font-family: 'Segoe UI', sans-serif;
    width: 100%;
    max-width: 100%;
    margin: 1em auto;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 1em;
    box-shadow: 2px 2px 10px rgba(0,0,0,0.1);
    background-color: #fafafa;
  }

  #picture {
    text-align: center;
    margin-bottom: 0.5em;
  }

  #string {
    font-family: 'Courier New', monospace;
    font-size: 1.2em;
    background: #f0f0f0;
    padding: 0.5em;
    border-radius: 4px;
    overflow-x: auto;
    text-align: center;
    white-space: pre-wrap;
    word-break: break-word;
    margin-bottom: 0.2em;
  }

  #result {
    font-weight: bold;
    margin-top: 0.5em;
    min-height: 1.5em;
  }

  button {
            padding: 10px 20px;
            margin-right: 5px;
            cursor: pointer;
            background-color: #007acc;
            color: white;
            border: none;
            border-radius: 4px;
            transition: background-color 0.3s;
  }

  button:hover {
    background-color: #1565c0;
  }

  button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }

  #controls {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5em;
    margin-bottom: 0.2em;
  }
</style>
<div id="picture"></div>
<pre id="string"></pre>
<div id="controls">
<button type="button"id="check">Check Input</button>
<button type="button"id="step">Step Input</button>
<div id="result"></div>
</div>
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
      picdiv   = curdoc.getElementById("picture");

    }

}

// Registreer custom element
customElements.define('pdautomaat-comp', PDAutoInput);
