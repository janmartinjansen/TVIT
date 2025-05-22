    document.addEventListener('DOMContentLoaded', initComponent());   
    
    function initComponent() {
      const urlParams = new URLSearchParams(window.location.search);
      const componentNaam = urlParams.get('component');

      if (componentNaam) {
        console.log(`Component parameter gevonden: ${componentNaam}`);
        if (componentNaam == 'turing') 
          chainLoads(['viz','turing'],0,initTuring); 
        else if (componentNaam == 'ijvm')
          chainLoads(['ijvm'],0,initIJVM); 
      } else {
        console.log('Geen component parameter gevonden in de URL.');
      }
    }   


    function chainLoads(compnames, index,initFunc) {
      if (compnames.length == index) 
        initFunc();
      else {
        const script = document.createElement('script');
        script.src = `components/${compnames[index]}.js`;
        var bdy = document.body;
        console.log(bdy);
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
      setData('bipush 3\nbipush 5\niadd\nprint\nstop');
    }

    function initTuring() {
      console.log('turing geladen!');
      document.getElementById('outputOpgave').innerHTML = '<turing-comp></turing-comp>';
      setData(vbtm2);
    }