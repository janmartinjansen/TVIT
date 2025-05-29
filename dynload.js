    document.addEventListener('DOMContentLoaded', initComponent());   
    
    function initComponent() {
      const urlParams = new URLSearchParams(window.location.search);
      const componentNaam = urlParams.get('component');

      if (componentNaam) {
        console.log(`Component parameter gevonden: ${componentNaam}`);
        current_model = componentNaam;
        if (componentNaam == 'turing') 
          chainLoads(['turing'],0,initTuring); 
        else if (componentNaam == 'ijvm')
          chainLoads(['ijvm'],0,initIJVM); 
        else if (componentNaam == 'automaat')
          chainLoads(['automaat'],0,initAutomaat); 
        else if (componentNaam == 'pdautomaat') 
          chainLoads(['pdautomaat'],0,initPDAutomaat); 
        else if (componentNaam == 'parser') 
          chainLoads(['skulpt.min','skulpt-stdlib','parser'],0,initParser); 
        else if (componentNaam == 'pyodideshell') 
          chainLoads(['pyodide','pyodideshell'],0,initPyodide); 
        else if (componentNaam == 'autopython') 
          chainLoads(['pyodide','autopython'],0,initPyodide); 
      }
      else {
        console.log('Geen component parameter gevonden in de URL.');
      }
    }   


    function chainLoads(compnames, index,initFunc) {
      let pyodide = 'https://cdn.jsdelivr.net/pyodide/v0.25.1/full/pyodide.js';
      if (compnames.length == index) 
        initFunc();
      else {
        const script = document.createElement('script');
        //script.src = `${compnames[index]}/${compnames[index]}.js`;
        if (compnames[index] == 'pyodide') 
          script.src = pyodide;
        else if (compnames[index] == 'autopython')
          script.src = `pyodideshell/pyodideshell.js`;
        else 
          script.src = `${current_model}/${compnames[index]}.js`;
        var bdy = document.body;
        bdy.appendChild(script);
        script.onload = () => {
          console.log(`JS voor ${compnames[index]} geladen.`);
          chainLoads(compnames,++index,initFunc);
        };
        script.onerror = () => {
          console.error(`Fout laden JS voor ${compnames[index]}.`);
        };
      }
    }


    function initIJVM() {
      console.log('ijvm geladen!');
      document.getElementById('outputOpgave').innerHTML = '<ijvm-comp></ijvm-comp>';
      //setData('bipush 3\nbipush 5\niadd\nprint\nstop');
    }

    function initTuring() {
      console.log('turing geladen!');
      document.getElementById('outputOpgave').innerHTML = '<turing-comp></turing-comp>';
      //setData(vbtm2);
    }

    function initAutomaat() {
      console.log('automaat geladen!');
      document.getElementById('outputOpgave').innerHTML = '<automaat-comp></automaat-comp>';
      //setData(vbtm2);
    }

    function initPDAutomaat() {
      console.log('pdautomaat geladen!');
      document.getElementById('outputOpgave').innerHTML = '<pdautomaat-comp></pdautomaat-comp>';
      //console.log(document.getElementById('outputOpgave'));
      //setData(vbtm2);
    }

    function initParser() {
      console.log('parser geladen!');
      document.getElementById('outputOpgave').innerHTML = '<parser-comp></parser-comp>';
      //console.log(document.getElementById('outputOpgave'));
      //setData(vbtm2);
    }

    function initPyodide() {
      console.log('pyodideshell geladen!');
      document.getElementById('outputOpgave').innerHTML = '<pyodide-shell></pyodide-shell>';
      //console.log(document.getElementById('outputOpgave'));
      //setData(vbtm2);
    }
    //    <script language="javascript" type="text/javascript" src="./turing.js"></script>
