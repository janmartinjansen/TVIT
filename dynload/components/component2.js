console.log('component2.js actief.');
document.getElementById('component-container').innerHTML = '<button id="klikKnop">Klik</button> <span id="teller">0</span>';

function initComp() {
  console.log('comp 2 geladen!');
  const klikKnop = document.getElementById('klikKnop');
  const teller = document.getElementById('teller');
  if (klikKnop && teller) {
    let count = 0;
    klikKnop.addEventListener('click', () => {
      count++;
      teller.textContent = count;
    });
  }
}