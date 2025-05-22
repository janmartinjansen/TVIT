var stateIndex;
var simStates;
var curdoc;
var intTimer;
var fsm,tape;
var tape_out;
var stepping = false;
var data;

function initFSM(document) {
  data = document.getElementById("inputdata").value;
  setFSM(data);
}

function setData(d) {
  data = d;
  setFSM(data);
}

function setFSM(txt) {
  [fsm,tape] = readFSM(txt);
}

function updatePictState(document,state = undefined) {
  if (fsm === undefined) initFSM(document);
  var [_,start,_] = fsm;
  var mydiv = document.getElementById("picture");
  if (state === undefined) state = start;
  if (fsm.length == 3) {
    var dot = genDFAState(fsm,state);
    var svg = Viz(dot, "svg");
    mydiv.innerHTML = svg;
  }
  else {
    mydiv.innerHTML = fsm[0];
  }
}

function displayNext() {
  tape_out.innerHTML = colorLetter(tape,stateIndex);;
  updatePictState(curdoc,simStates[stateIndex++]);
  if (stateIndex == simStates.length) {
    clearInterval(intTimer);
    stepping = false;
  }
}

function stepString(document) {
  if (!stepping) checkString(document,true);
  stepping = true;
  displayNext();
}

function checkString(document,step = false) {
  if (fsm === undefined) initFSM(document);
  var output = document.getElementById("result");
  tape_out = document.getElementById("string");
  if (fsm.length == 3) {
    var [res,states] = simulateFSM(document,fsm,tape);
    simStates = states;
    output.innerHTML = 'result: ' + res + ' states: ' + states.join(' ');
    curdoc = document;
    stateIndex = 0;
    tape_out.innerHTML = colorLetter(tape,stateIndex);
    if (!step) intTimer = setInterval(displayNext,1000);
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

function readFSM(inp) {
          var inp = inp.trim('\n');
          var lines = inp.split("\n");
          var transitions = [];
          var hasStart = 0;
          var hasEnd = 0;
          var tsOk = 1;
          var error = 'ok';
          var inp = '';
          for (line of lines) {
              line = line.trim(' ');
              var ws = line.split(" ");
              if (ws.length == 0)
                a = 3;
              if (ws[0] == 'start') {
                  startstate = ws[1];
                  hasStart = 1;
              }
              else if (ws[0] == 'end') {
                  endstates = ws.slice(1);
                  hasEnd = 1;
              }
              else if (ws[0] == 'in') {
                  inp = ws[1];
              }
              else {
                  if (ws.length != 3) {
                    tsOk = 0;
                    error = 'transition: startstate symbol endstate'
                }
                  start = ws[0];
                  symbol = ws[1];
                  end = ws[2];
                  transitions.push([start,symbol,end])
                }
          }
          if (tsOk && hasStart && hasEnd)
            return [[transitions,startstate,endstates],inp];
          else {
            if (!hasStart) error = 'specify a startstate: start state';
            else if (!hasEnd) error = 'state machine should at least has one end state';
            return [error];
          }
}

function genDFAState(fsm,curstate) {
  var dot = 'digraph finite_state_machine {\n rankdir=LR; \n size="8,5"\n';
  [ts,ss,ess] = fsm;
  var ness;
  dot += '  node [shape = point,color = "black"] start;\n';
  if (ess.includes(curstate)) {
    dot += '  node [shape = doublecircle, color = "red"] ' + curstate + ';\n';
    ness = ess.filter(item => item !== curstate);
  }
  else {
    dot += '  node [shape = circle, color = "red"] ' + curstate + ';\n';
    ness = ess;
  }
  dot += '  node [shape = doublecircle,color = "black"] ' + ness.join(' ') + ';\n';
  dot += '  node [shape = circle,color = "black"];\n';
  dot += '  start -> ' + ss + ';\n';
  for (t of ts)
      dot += '    ' + t[0] + ' -> ' + t[2] + ' [ label = "'  + t[1] + '" ];\n'
  dot += '}\n'
  return dot;
}

function simulateFSM(document,fsm,string) {
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

function appendLine(doc) {
  var nn = document.createElement('div');
  nn.innerHTML = '<button type="button" id="appendLine">Append</button>'
  //var node = doc.getElementById("appendLine")
  //doc.appendChild(node.cloneNode(true))
  doc.appendChild(nn)
}

class AutoInput extends HTMLElement {
    constructor() {
        super();

        // Maak shadow DOM
        this.attachShadow({ mode: 'open' });

        // Voeg HTML-structuur toe
        this.shadowRoot.innerHTML = `
<textarea id="inputdata" rows="20" cols="80" width="100%" wrap="off">
</textarea>
<br>
<button type="button"id="gen">Generate</button>
<br>
<input type="text" id="str">
<button type="button"id="check">Check</button>
<button type="button"id="step">Step</button>
<div id="result">Result of check</div>
<br>
<hr>
<div id="picture">
The result will appear here.
</div>
<div id="string"></div>
<br>
<button type="button" id="appendLine">Append</button>
`;

    }
    connectedCallback() {
      var gen = this.shadowRoot.getElementById("gen");
      gen.addEventListener('click',() => updatePictState(this.shadowRoot));
      var check = this.shadowRoot.getElementById("check");
      var step = this.shadowRoot.getElementById("step");
      check.addEventListener('click',() => checkString(this.shadowRoot));
      step.addEventListener('click',() => stepString(this.shadowRoot));
      this.shadowRoot.getElementById("inputdata").value = this.textContent;
      this.shadowRoot.getElementById("appendLine").addEventListener('click',() => appendLine(this.shadowRoot));
      initFSM(this.shadowRoot);
    }

}

// Registreer custom element
customElements.define('auto-input', AutoInput);
