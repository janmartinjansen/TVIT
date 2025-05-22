var data;
var instructions;
var prog,progPos,progLines;
var pc = 0;
var stepping = false, simReady = true, newSim = true;
var curState = undefined;
var progOK;
var intTimer;
var reset;
var simSpeed = 10;
const maxmem = 1000;
const stack = new Array(1000).fill(0);
const mem  = new Array(maxmem).fill(0);
var sp = -1, hp = 0, lv = 0;
var labels;
var curdoc;
var codeview;
var statusview;
var stackview;
var speedchoices = [100,10,5,1];
var speedindex = 0;
var speedfield;


var BIPUSH=0,DUP=1,GOTO=2,IADD=3,IMULT=4,IDIV=5,IAND=6,IFEQ=7,IFLT=8,IF_ICMPEQ=9,IINC=10,ILOAD=11,CALL=12,
    IOR=13, IRETURN=14 , ISTORE=15, ISUB=16, LDC_W=17, NOP=18,POP=19, SWAP=20, WIDE=21,PRINT=22,PRINTSTACK=23,PRINTMEM=24, NEW=25, 
    FREE=26, IASTORE=27, IALOAD=28, MEMDUMP=29, STOP=30;

var names = ["BIPUSH","DUP","GOTO","IADD","IMULT","IDIV","IAND","IFEQ","IFLT","IF_ICMPEQ","IINC","ILOAD","CALL",
             "IOR","IRETURN","ISTORE","ISUB","LDC_W","NOP","POP","SWAP","WIDE","PRINT","PRINTSTACK","PRINTMEM","NEW",
             "FREE","IASTORE","IALOAD","MEMDUMP","STOP"];

var instrs = names.map((n) => n.toLowerCase());

const expandTabs = (str) => str.replace(/\t/g, ' '); // replace tabs by spaces

function findOpcode(name) {
  for (var i=0;i<instrs.length;i++) {
    if (name.toLowerCase() == instrs[i]) return i;
  }
  return -1;
}

function instrLength(opcode) {
  switch(opcode) {
    case DUP :  case IADD : case IMULT : case IDIV: case IAND : case IOR : case IRETURN :  case ISUB :
    case NOP : case POP : case SWAP : case WIDE : case PRINT: case PRINTSTACK: case PRINTMEM: case NEW: case FREE:
    case IASTORE : case IALOAD : case STOP:
      return 1;
    case BIPUSH: case GOTO: case IFEQ: case IFLT: case IF_ICMPEQ:  case  ILOAD: case ISTORE: case LDC_W:
      return 2;
    case  IINC: case MEMDUMP:
      return 3;
    case CALL:
      return 4;
    default:
      console.log('invalid instruction');
      return -1;
  }
}

function replaceLabels(prog) {
  var i = 0;
  for (var ins of prog) {
    switch (ins[0]) {
      case GOTO: case IFEQ: case IFLT: case IF_ICMPEQ:
        if (findLabel(ins[1]) < 0) console.log('unknown label');
        else ins[1] = findLabel(ins[1]) - i;
        break;
      case CALL: 
        if (findLabel(ins[3]) < 0)console.log('unknown label');
        else ins[3] = findLabel(ins[3]);
        break;
    }
    i++;
  }}

function findLabel(k) {
  for(var i = 0; i < labels.length;i++) if(labels[i] == k) return i;
  return -1;
}

function isLabel(n) {
  return  !isNaN(n);
}

function setData(d) {
  data = d
  var res = readProg(d)
  progOK = res[0]
  instructions = res[1]
  prog = instructions
  newSim = true;
  pc = 0;
  sp = -1;
  lv = 0;
  hp = 0;
  codeview.textContent = formatIntoColumns(markLineInProg(progLines,pc));
  stackview.textContent = '';
  replaceLabels(instructions);
}

function readProg(txt) {
  txt = txt.trim('\n');
  var lines = txt.split('\n')
  return readLines(lines)
}

function markLineInProgOld(plines,n) {
  res = [];
  for (let k=0;k < plines.length;k++ ) {
    var line = plines[k];
    if (k!=n) res.push('   ' + line);
    else      res.push('>> ' + line);
  }
  return res;
}

function markLineInProg(plines,n) {
  res = [];
  for (let k=0;k < plines.length;k++ ) {
    var line = plines[k];
    res.push(formatLine(line,k==n));
  }
  return res;
}

function readLines(lines) {
  var ins = [];
  labels = [];
  progLines = []
  var k = 0;
    for (var line of lines) {
        line = expandTabs(line);
        line = line.trim(' ');
        if (line[0] == '#') {k++;continue;}
        var ws = line.split(' ').filter((a) => a != '');
        if (ws.length == 0) {k++;continue;}
        progLines.push(line);
        if (isLabel(ws[0])) {
          labels.push(parseInt(ws[0]));
          ws.shift();
        }
        else labels.push(-1);
        var opcode = findOpcode(ws[0]);
        if (opcode < 0) { //alert('invalid ' + ws);
          return [false,'invalid instruction in line: ' + k];
        }
        else {
          ws[0] = opcode;
          var len = instrLength(opcode);
          if (len != ws.length) {console.log('arg error');return [false,'missing args in line ' + (k+1)];}
          for (var i = 1; i<len;i++) ws[i] = parseInt(ws[i]);
          ins.push(ws);
        }
        k++;
    }
  return [true,ins]
}


function showStatus() {
  const pad = (n) => n.toString().padStart(3, ' ');
  var st = '';
  for (var i = 0; i <= sp; i++) st += stack[i] + ' ';
  var m = memPrint(0,hp);
  statusview.textContent = 'pc = ' + pad(pc) + '  lv = ' + pad(lv) + '  hp = ' + pad(hp) + ' \nstack [' + st + ']\n' + m;
}

function stepProg() {
  //console.log('step')
  if (newSim && prog != undefined) {
    newSim = false;
    simReady = false;
    pc = 0;
    sp = -1;
    lv = 0;
    hp = 0;
    showStatus();
    codeview.textContent = formatIntoColumns(markLineInProg(progLines,pc));
  }
  else if (!simReady){
    step();
    showStatus()
    codeview.textContent = formatIntoColumns(markLineInProg(progLines,pc));
  }
}

function runProg() {
  reset.disabled = false
  intTimer = setInterval(stepProg,simSpeed);
}

function resetSim() {
  clearInterval(intTimer);
  pc = 0;
  sp = -1;
  lv = 0;
  hp = 0;
  newSim = true;
  simReady = true;
  reset.disabled = true;
  //stackview.textContent = '';
}

function printLine(n) {
  var ins = prog[n];
  var res = names[ins[0]];
  var len = instrLength(ins[0]);
  for (var i=0;i<len;i++) res += ' ' + ins[i];
  return res;
}

function printStack() {
  var res = 'Stack:';
  for (var i=0;i<=sp;i++) res += ' ' + stack[i];
  updateStackView(res);
  return res;
}

function newMem(size) {
  if (hp + size + 1 < maxmem) {
    mem[hp] = size;
    var p = hp+1;
    hp += size + 1;
    return p;
  }
  else {
    updateStackView('Out of memory');
    resetSim();
    return -1;
  }
}

function freeMem(p) {
  updateStackView('Freemem not implemented!');
}

function memDump(from,to) {
  var res = '[';
  for (var i=from;i < to;i++) res += mem[i] + ' ';
  res += ']';
  updateStackView(res);
}

function memPrint(from,to) {
  var res = 'mem   [';
  for (var i=from;i < to;i++) res += mem[i] + ' ';
  res += ']';
  return res;
}

function step() {
  var aux;
  var current = prog[pc++];
  switch (current[0]) {
    case BIPUSH:
      stack[++sp] = current[1];
      break;
    case DUP:
      stack[sp+1] = stack[sp];
      sp++;
      break;
    case GOTO:
      pc = pc + current[1] - 1;
      break;
    case IADD:
      stack[sp-1] = stack[sp-1] + stack[sp];
      sp--;
      break;
    case IMULT:
      stack[sp-1] = stack[sp-1] * stack[sp];
      sp--;
      break;
    case IDIV:
      stack[sp-1] = stack[sp-1] / stack[sp];
      sp--;
      break;
    case IAND:
      stack[sp-1] = stack[sp-1] & stack[sp];
      sp--;
      break;
    case IFEQ:
      if (stack[sp--]==0) {
        pc = pc + current[1] - 1;
      }
      break;
    case IFLT:
      if (stack[sp--]<0) {
        pc = pc + current[1] - 1;
      }
      break;
    case IF_ICMPEQ:
      if (stack[sp-1]==stack[sp]) {
        pc = pc + current[1] - 1;
      }
      sp -=2;
      break;
    case IINC:
      stack[lv+current[1]] += current[2];
      break;
    case MEMDUMP:
      memDump(current[1],current[2]);
      break;
    case ILOAD:
      stack[++sp] = stack[lv+current[1]];
      break;
    case CALL:
      aux = lv;
      lv = sp - current[1] + 1;
      sp = sp + current[2];
      stack[++sp] = pc;
      stack[++sp] = aux;
      pc = current[3];
      break;
    case IOR:
      stack[sp-1] = stack[sp-1] | stack[sp];
      sp--;
      break;
    case IRETURN:
      aux = lv; 
      lv = stack[sp-1];
      pc = stack[sp-2];
      stack[aux] = stack[sp];
      sp = aux;
      break;
    case ISTORE:
      stack[lv+current[1]] = stack[sp--];
      break;
    case ISUB:
      stack[sp-1] = stack[sp-1] - stack[sp];
      sp--;
      break;
    case LDC_W:
      stack[++sp] = constant_pool[current[1]];
      break;
    case NOP:
      break;
    case POP:
      --sp;
      break;
    case SWAP:
      aux = stack[sp];
      stack[sp] = stack[sp-1];
      stack[sp-1] = aux;
      break;
    case WIDE:
      break;
    case PRINT:
      updateStackView('Print: ' + stack[sp--]);
      break;
    case PRINTSTACK:
      printStack();
      break;
    case PRINTMEM:
      var st = stack[sp--];
      var end = st + mem[st-1];
      memDump(st,end);
      break;     
    case NEW:
      stack[sp] = newMem(stack[sp]);
      break;
    case FREE:
      freeMem(stack[sp--]);
      break;
    case IALOAD: // offset pointer
      stack[sp-1] = mem[stack[sp-1] + stack[sp]];
      sp--;
      break;
    case IASTORE: // value offset pointer
      mem[stack[sp] + stack[sp-1]] = stack[sp-2];
      sp -= 3;
      break;
    case STOP:
      resetSim();
      break;

  }
}

function clearStackview(){
  stackview.textContent = '';
}

function updateStackView(line) {
  stackview.textContent += line + "\n"; 
}

function toggleSpeed(){
  speedindex = (speedindex + 1) % speedchoices.length;
  simSpeed = 1000 / speedchoices[speedindex];
  speedfield.textContent = 'Simulation speed (click to change): ' + speedchoices[speedindex];
  if (!simReady) {
    clearInterval(intTimer);
    intTimer = setInterval(stepProg,simSpeed);
  }
}


class IjvmComp extends HTMLElement {
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


  button {
    margin: 0.3em;
    padding: 0.5em 1em;
    font-size: 1em;
    border: none;
    border-radius: 4px;
    background-color: #1976d2;
    color: white;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  button:hover {
    background-color: #1565c0;
  }

  button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }

  #speedfield {
    margin-top: 0.5em;
    font-size: 0.95em;
    cursor: pointer;
    color: #1976d2;
  }

</style>     
      <pre id="codeview"></pre>
      <br>
      <button type="button"id="check">Run</button>
      <button type="button"id="step">Step</button>
      <button type="button"id="reset"disabled="true">Reset</button>
      <button type="button"id="clear">Clear</button>
      <pre id="speedfield" onclick="toggleSpeed()" >Simulation speed (click to change): 100 </pre>
      <pre id="statusview"></pre>
      <pre id="stackview"></pre>
`;

  }
  connectedCallback() {
    curdoc    = this.shadowRoot;
    var check = curdoc.getElementById("check");
    var step  = curdoc.getElementById("step");
    reset  = curdoc.getElementById("reset");
    var clear = curdoc.getElementById("clear");
    speedfield = curdoc.getElementById("speedfield");
    check.addEventListener('click',() => runProg());
    step.addEventListener('click', () => stepProg());
    reset.addEventListener('click',() => resetSim());
    clear.addEventListener('click',() => clearStackview());
    stackview   = curdoc.getElementById("stackview");
    statusview  = curdoc.getElementById("statusview");
    codeview    = curdoc.getElementById("codeview");
    
  }

}

// Registreer custom element
customElements.define('ijvm-comp', IjvmComp);

function formatLine(line,cursor = false) {
  var ws = line.split(' ').filter((a) => a != '');
  if (isLabel(ws[0])) 
    if (cursor) return '>> ' + ws[0].padEnd(4,' ') + ws.slice(1).join(' ');
    else        return '   ' + ws[0].padEnd(4,' ') + ws.slice(1).join(' ');
  else if (cursor) 
    return '>>     ' + ws.join(' ');
  else
    return '       ' + ws.join(' ');
}

function formatIntoColumns(lines,maxh = 21) {
  var len = lines.length;
  lines = lines.map(line => line.padEnd(20,' '));
  if (len < maxh) return lines.join('\n');
  var nrcol =  Math.ceil(len / maxh); 
  for (var col = 1; col < nrcol;col++) {
    for (var k=0;k < maxh;k++) {
      if (col*maxh+k < len) {
        lines[k] += lines[col*maxh+k];
      }
    }
  } 
  lines = lines.slice(0,maxh);
  return lines.join('\n');
}

function formatIntoColumnsOld(strings, maxColumns = 4, maxRows = 20) {
  const numStrings = strings.length;
  const idealColumns = Math.min(maxColumns, Math.ceil(numStrings / Math.ceil(numStrings / maxRows)));
  const numRows = Math.ceil(numStrings / idealColumns);
  const columns = Array(idealColumns).fill([]);
  const maxLengths = Array(idealColumns).fill(0);
  let columnIndex = 0;

  // Verdeel de strings over de kolommen en bepaal de maximale lengte per kolom
  var formStrings = strings; //.map(printInstr);
  for (const str of formStrings) {
    columns[columnIndex] = [...columns[columnIndex], str];
    maxLengths[columnIndex] = Math.max(maxLengths[columnIndex], str.length);
    columnIndex = (columnIndex + 1) % idealColumns;
  }

  let output = "";
  for (let i = 0; i < numRows; i++) {
    let row = "";
    for (let j = 0; j < idealColumns; j++) {
      const str = columns[j][i] || ""; // Gebruik een lege string als de rij korter is
      const paddedStr = str.padEnd(maxLengths[j], ' ');
      row += paddedStr;
      if (j < idealColumns - 1) {
        row += "  "; // Twee spaties als witruimte tussen kolommen
      }
    }
    output += row + "\n";
  }

  return output;
}

