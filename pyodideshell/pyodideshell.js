  function setData(code) {
    document.querySelector("pyodide-shell").setDatam(code);
  }

  class PyodideShell extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
        <style>
          #output {
            white-space: pre-wrap;
            background: #f0f0f0;
            padding: 10px;
            border: 1px solid #ccc;
            height: 500px;
            overflow-y: auto;
            font-family: monospace;
          }
          #shell-input {
            width: 100%;
            font-family: monospace;
            padding: 0.5em;
            margin-top: 10px;
          }
        </style>
        <input id="shell-input" placeholder=">>> Typ een expressie of statement" autocomplete="off" />
        <div id="output"></div>
      `;
      this.outputDiv = null;
      this.inputField = null;
      this.history = [];
      this.historyIndex = -1;
      this.pyodide = null;
    }

    async connectedCallback() {
      this.outputDiv = this.shadowRoot.getElementById("output");
      this.inputField = this.shadowRoot.getElementById("shell-input");

      this.inputField.addEventListener("keydown", async (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          const input = this.inputField.value.trim();
          if (input === "") return;
          this.appendToShell(">>> " + input);
          this.history.push(input);
          this.historyIndex = this.history.length;
          this.inputField.value = "";
          try {
            try {
              await this.pyodide.runPythonAsync(`__shell_result = (${input})`);
              await this.pyodide.runPythonAsync("print(__shell_result)");
              await this.pyodide.runPythonAsync("del __shell_result");
            } catch {
              await this.pyodide.runPythonAsync(input);
            }
          } catch (err) {
            this.appendToShell("Fout:\n" + this.filterError(err.toString()));
          }
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          if (this.history.length > 0 && this.historyIndex > 0) {
            this.historyIndex--;
            this.inputField.value = this.history[this.historyIndex];
          }
        } else if (e.key === "ArrowDown") {
          e.preventDefault();
          if (this.historyIndex < this.history.length - 1) {
            this.historyIndex++;
            this.inputField.value = this.history[this.historyIndex];
          } else {
            this.historyIndex = this.history.length;
            this.inputField.value = "";
          }
        }
      });

      this.pyodide = await loadPyodide();
      const outputCatcher = {
        write: (s) => { this.outputDiv.textContent += s; },
        flush: () => {}
      };
      this.pyodide.globals.set("stdout", outputCatcher);
      this.pyodide.globals.set("stderr", outputCatcher);
      await this.pyodide.runPythonAsync(`
import sys
sys.stdout = stdout
sys.stderr = stderr
del stdout, stderr
`);
    }

    async setDatam(code) {
      this.outputDiv.textContent = "";
      try {
        await this.pyodide.runPythonAsync(code);
      } catch (err) {
        this.appendToShell("Fout:\n" + this.filterError(err.toString()));
      }
    }

    appendToShell(text) {
      this.outputDiv.textContent += text + "\n";
      this.outputDiv.scrollTop = this.outputDiv.scrollHeight;
    }

    filterError(e) {
      while (e.includes('^^^')) e = e.match(/\^+(.*)/s)[1];
      return e;
    }
  }

  customElements.define('pyodide-shell', PyodideShell);

  let example = 
`import math

def isPrime(n):
    wn = math.sqrt(n)
    wn = math.trunc(wn)
    for k in range(2,wn+1):
        if n % k == 0:
            return False
    return True

def goldbach_bounded(b):
    # every even number is the sum of 2 primes
    # program
    n = 4
    while n < b:
        if not isSum2Primes(n):
            return False
        n += 2
    return True

def goldbach():
    # every even number is the sum of 2 primes
    # program
    n = 4
    while True:
        if not isSum2Primes(n):
            return False
        n += 2
    return True

def isSum2Primes(n):
    for k in range(2,n//2+1):
        if isPrime(k) and isPrime(n-k):
            return True
    return False
print(goldbach_bounded(10000))

def som(n):
  if n == 0: 
    return 0;
  else:
    return n + som(n-1)
`


