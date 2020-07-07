import { filterTag } from './data.js';
import { orderInfo } from './data.js';
import lol from './data/lol/lol.js';

// Array que contiene los valores del data (en este caso cada uno de los champions)
const champions = Object.values(lol.data);
console.log(champions)

// imprimir en pantalla los array de champions que escoja (todos o filtrados)
const renderChampionsInScreen = (arrayOfChampions) => {
  document.getElementById('allTheChamps').innerHTML = arrayOfChampions.map(champ =>
    `<div class="containerEachChamp">
      <p> ${champ.name.toUpperCase()}</p><br>
      <div id="containerProfilePic"> 
        <img id="profilePic" src="${champ.splash}">
      </div><br>
      <p> [${champ.tags}]</p><br>
      <p> <i class="fas fa-gavel"></i>${champ.info.attack}&nbsp;&nbsp;&nbsp;&nbsp;<i class="fas fa-shield-alt"></i>${champ.info.defense}</p>
      <p><i class="fas fa-hand-sparkles"></i>${champ.info.magic}&nbsp;&nbsp;&nbsp;&nbsp;<i class="fas fa-exclamation-triangle"></i>${champ.info.difficulty}</p>
    </div>`).join('');
};

// imprimir todos
renderChampionsInScreen(champions);

// FILTER TAG
//seleccion todos los filtros tag
const checkbox = document.querySelector('#checkboxTags');

//función que recoge nombre del tag escogido
function valueFilterTag() {
  if (document.querySelector('#checkboxTags :checked') !== null) {
    const tagValue = document.querySelector('#checkboxTags :checked').value;
    renderChampionsInScreen(filterTag(champions, tagValue));
  }
}
checkbox.addEventListener('click', valueFilterTag);

//ORDER INFORMATION
//seleccionar filtros de informacion
const selectList = document.querySelector('#selectInformation');

function valueOrderInformation() {
  if (selectList !== null) {
    const valueSelectInformation = selectList.value;
    renderChampionsInScreen(orderInfo(champions , valueSelectInformation));
  }
}
selectList.addEventListener('change', valueOrderInformation);




