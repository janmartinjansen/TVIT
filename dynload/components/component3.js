console.log('ijvm.js actief.');
document.getElementById('component-container').innerHTML = '<ijvm-comp></ijvm-comp>';

function initComp() {
  console.log('ijvm geladen!');

  setData('bipush 3\nbipush 5\niadd\nprint\nstop');
}