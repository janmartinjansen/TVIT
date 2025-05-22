function updatePict(document) {
  var data = document.getElementById("inputdata").value;
  //var fsm = readFSM(data);
  //var [_,start,_] = fsm;
  var mydiv = document.getElementById("picture");
  //if (fsm.length == 3) {
    //var dot = genDFAState(fsm,"q2");
    var svg = Viz(data, "svg");
    mydiv.innerHTML = svg;
  //}
  //else {
  //  mydiv.innerHTML = fsm[0];
  //}
}

function updatePictState(document,state) {
  var data = document.getElementById("inputdata").value;
  //var fsm = readFSM(data);
  var mydiv = document.getElementById("picture");
  if (fsm.length == 3) {
    //var dot = genDFAState(fsm,state);
    var svg = Viz(data, "svg");
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
    var res = simulateFSM(document,fsm,txt);
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
            else if (!hasEnd) error = 'state mahine should at least has one end state';
            return [error];
          }
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
  return dot;
}

function pause(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

function simulateFSM(document,fsm,string) {
   [ts,ss,ess] = fsm;
   state = ss;
   for (c of string) {
        found = false;
        for (trans of ts) {
          [f,s,t] = trans;
            if (f == state && s == c) {
                found = true;
                state = t;
                //updatePictState(document,state);

                break;
            }
        }
        if (!found) return false;
    }
    return ess.includes(state);
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
<div id="result">Result of check</div>
<br>
<hr>
<div id="picture">
The result will appear here.
</div>
`;

    }
    connectedCallback() {
      var gen = this.shadowRoot.getElementById("gen");
      gen.addEventListener('click',() => updatePict(this.shadowRoot));
      var check = this.shadowRoot.getElementById("check");
      check.addEventListener('click',() => checkString(this.shadowRoot));
      this.shadowRoot.getElementById("inputdata").value = this.textContent;
    }

}

// Registreer custom element
customElements.define('auto-input', AutoInput);
