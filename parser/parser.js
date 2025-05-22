var program;
var output;
var grammar;
var inputs;
var finputs;
var input;
var curinput;
var voorbeeld;

function next() {
  curinput = (curinput+1) % inputs.length;
  runit();
}

function setData(data) {
    grammar = data;
    readGram();
    runit();
}

function outf(text) {
    var svg = Viz(text, "svg");
    output.innerHTML = svg;
}

function builtinRead(x) {
    if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][x] === undefined)
            throw "File not found: '" + x + "'";
    return Sk.builtinFiles["files"][x];
}

function readGram() {
  finputs = [];
  inputs = [];
  curinput = 0;
  var fgrammar = '';
  var finput = '';
  var first = true;
  for (var line of grammar.split('\n')) {
       if (line.length != 0) {
           if (line.startsWith('----')) {
             first = false;
             if (finput != '') {
               finputs.push(finput);
               finput = '';
             }
           }
           else if (first)   fgrammar += line + '\n';
           else finput += line + '\n';
       }
  }
  if (finput != '') finputs.push(finput);
  inputs     = finputs.map(makeStr);
  grammar    = makeStr(fgrammar);
}

function runit() {
   input      = inputs[curinput];
   voorbeeld.innerHTML = finputs[curinput];
   pcode = 'print(genAST(' + grammar +',' + input + '))';

   var myprog = program + pcode
   //console.log(myprog);
   output.innerHTML = '';
   Sk.pre = "output";
   Sk.configure({output:outf, read:builtinRead});

   var myPromise = Sk.misceval.asyncToPromise(function() {
       return Sk.importMainWithBody("<stdin>", false, myprog, true);
   });
   myPromise.then(function(mod) {
       console.log('success');
   },
       function(err) {
       console.log(err.toString());
   }); 
 }

function makeStr(txt) {
  res = "'"
  for (var t of txt) {
    if (t == '\n') {
      res += "\\n"
    }
    else if (t == '\'') {
      res += "\\'"
    }
    else res += t
  }
  res += "'"
  return res
}


class ParserComp extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' }); // Gebruik shadow DOM voor inkapseling
    }
  
    connectedCallback() {
      console.log('init ParserComponent');
        this.loadExternal('parser/parseview.html');
    }
  
    async loadExternal(url) {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Fout bij het laden van ${url}: ${response.status}`);
        }
        const html = await response.text();
        this.shadowRoot.innerHTML = html; // Plaats de inhoud in de shadow DOM
        program = this.shadowRoot.getElementById("yourcode").value;
        output = this.shadowRoot.getElementById("output");
        voorbeeld = this.shadowRoot.getElementById("voorbeeld");

      } catch (error) {
        console.error('Kon externe inhoud niet laden:', error);
        this.shadowRoot.innerHTML = '<p>Fout bij het laden van de inhoud.</p>';
      }
    }

    
  }
  
  customElements.define('parser-comp', ParserComp);
