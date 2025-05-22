function updatePict(document) {
  var data = document.getElementById("inputdata").value;
  var fsm = readFSM(data);
  var mydiv = document.getElementById("picture");
  if (fsm.length == 3) {
    var dot = genDFA(fsm);
    var svg = Viz(dot, "svg");
    mydiv.innerHTML = svg;
  }
  else {
    mydiv.innerHTML = fsm[0];
  }
}

function genPict(document,data) {
  var fsm = readFSM(data);
  var mydiv = document.getElementById("picture");
  if (fsm.length == 3) {
    var dot = genDFA(fsm);
    var svg = Viz(dot, "svg");
    mydiv.innerHTML = svg;
  }
  else {
    mydiv.innerHTML = fsm[0];
  }
}

function genPictState(document,data,state) {
  var fsm = readFSM(data);
  var mydiv = document.getElementById("picture");
  if (fsm.length == 3) {
    var dot = genDFAState(fsm,state);
    var svg = Viz(dot, "svg");
    mydiv.innerHTML = svg;
  }
  else {
    mydiv.innerHTML = fsm[0];
  }
}

function checkString(document) {
  var inputstring = document.getElementById("str");
  var txt = inputstring.value;
  var data = document.getElementById("inputdata").value;
  var output = document.getElementById("result");
  var fsm = readFSM(data);
  if (fsm.length == 3) {
    var res = simulateFSMState(doc,fsm,txt);
    output.innerHTML = res;
  }
  else {
    mydiv.innerHTML = fsm[0];
  }
}

function readFSM(inp) {
          var inp = inp.trim('\n');
          var lines = inp.split("\n");
          var transitions = [];
          var hasStart = 0;
          var hasEnd = 0;
          var tsOk = 1;
          var error = 'ok'
          for (line of lines) {
              line = line.trim(' ');
              var ws = line.split(" ");
              if (ws[0] == 'start') {
                  startstate = ws[1];
                  hasStart = 1;
              }
              else if (ws[0] == 'end') {
                  endstates = ws.slice(1);
                  hasEnd = 1;
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
            return [transitions,startstate,endstates];
          else {
            if (!hasStart) error = 'specify a startstate: start state';
            else if (!hasEnd) error = 'state machine should at least has one end state';
            return [error];
          }
}

function genDFA(fsm) {
  var dot = 'digraph finite_state_machine {\n rankdir=LR; \n size="8,5"\n';
  [ts,ss,ess] = fsm;
  dot += '  node [shape = point] start;\n';
  dot += '  node [shape = doublecircle] ' + ess.join(' ') + ';\n';
  dot += '  node [shape = circle];\n';
  dot += '  start -> ' + ss + ';\n';
  for (t of ts)
      dot += '    ' + t[0] + ' -> ' + t[2] + ' [ label = "'  + t[1] + '" ];\n'
  dot += '}\n'
  alert(dot);
  return dot;
}

function genDFAState(fsm,curstate) {
  var dot = 'digraph finite_state_machine {\n rankdir=LR; \n size="8,5"\n';
  [ts,ss,ess] = fsm;
  var ness;
  if (ess.includes(curstate)) {
    dot += '  node [shape = doublecircle, color = "blue"] ' + curstate + ';\n';
    ness = ess.filter(item => item !== curstate);
  }
  else {
    dot += '  node [shape = circle, color = "blue"] ' + curstate + ';\n';
    ness = ess;
  }
  dot += '  node [shape = point,color = "black"] start;\n';
  dot += '  node [shape = doublecircle,color = "black"] ' + ness.join(' ') + ';\n';
  dot += '  node [shape = circle,color = "black"];\n';
  dot += '  start -> ' + ss + ';\n';
  for (t of ts)
      dot += '    ' + t[0] + ' -> ' + t[2] + ' [ label = "'  + t[1] + '" ];\n'
  dot += '}\n'
  alert(dot);
  return dot;
}

function simulateFSM(fsm,string) {
   [ts,ss,ess] = fsm;
   state = ss;
   for (c of string) {
        found = false;
        for (trans of ts) {
          [f,s,t] = trans;
            if (f == state && s == c) {
                found = true;
                state = t;
                break;
            }
        }
        if (!found) return false;
    }
    return ess.includes(state);
}

function simulateFSMSate(document,fsm,string) {
   [ts,ss,ess] = fsm;
   state = ss;
   for (c of string) {
        found = false;
        for (trans of ts) {
          [f,s,t] = trans;
            if (f == state && s == c) {
                found = true;
                state = t;
                break;
            }
        }
        if (!found) return false;
    }
    return ess.includes(state);
}
var curstring, curstate, curfsm, started;

function startStep(fsm,string) {
  curstring = string;
  curfsm = fsm;
  [_,curstate,_] = fsm;
  started = true;
}

function simStepFSM(fsm,string,state) {
   [ts,ss,ess] = fsm;
   if (string.length == 0)
    return ess.includes(state);
   else {
        const c = string.chatAt(0);
        const rest = string.slice(1)
        var found = false;
        for (trans of ts) {
          [f,s,t] = trans;
            if (f == state && s == c) {
                found = true;
                state = t;
                break;
            }
        }
        if (!found) return false;
    }
}

class AutoDisplay extends HTMLElement {
    constructor() {
        super();
        // Maak shadow DOM
        this.attachShadow({ mode: 'open' });

        // Voeg HTML-structuur toe
        this.shadowRoot.innerHTML = `
<div id="picture">
The result will appear here.
</div>
`;
      this.observer = new MutationObserver(mutations => {
         genPict(this.shadowRoot, this.textContent);});

    }
    connectedCallback() {
      this.observer.observe(this, { childList: true, characterData: true, subtree: true });
      genPict(this.shadowRoot, this.textContent);
    }

}

// Registreer custom element
customElements.define('auto-display', AutoDisplay);
