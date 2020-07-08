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
      <p><img id="attack" src="img/Melee_role.png"> ${champ.info.attack}&nbsp&nbsp<img id="defense" src="img/Armor_icon.png"> ${champ.info.defense}</p>
      <p><img id="magic" src="img/Mana_regeneration_icon.png">${champ.info.magic} &nbsp&nbsp<img id="difficulty" src="img/Champion_style_abilities_active.png">${champ.info.difficulty}</p>
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
checkbox.addEventListener('change', valueFilterTag);

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




