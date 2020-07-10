import { filterTag, filterSearch, orderInfo } from './data.js';
import lol from './data/lol/lol.js';

// Array que contiene los valores del data (en este caso cada uno de los champions)
const champions = Object.values(lol.data);

// imprimir en pantalla los array de champions que escoja (todos o filtrados)
const renderChampionsInScreen = (arrayOfChampions) => {
  document.getElementById('allTheChamps').innerHTML = arrayOfChampions.map(champ =>
    `<div class="containerEachChamp">
      <p>${champ.name.toUpperCase()}</p><br>
      <div id="containerProfilePic"> 
        <img id="profilePic" src="${champ.splash}">
      </div><br>
      <p> [${champ.tags}]</p><br>
      <p><img id="attack" src="img/Melee_role.png"> ${champ.info.attack}&nbsp&nbsp<img id="defense" src="img/Armor_icon.png"> ${champ.info.defense}</p>
      <p><img id="magic" src="img/Mana_regeneration_icon.png">${champ.info.magic} &nbsp&nbsp<img id="difficulty" src="img/Champion_style_abilities_active.png">${champ.info.difficulty}</p>
      <div class="containerModals">
      </div>
      </div>`).join('');
};

// imprimir todos
renderChampionsInScreen(champions);

// FILTER TAG
// seleccion todos los filtros tag
const checkbox = document.querySelector('#checkboxTags');

// función que recoge nombre del tag escogido e imprime
function valueFilterTag() {
  if (document.querySelector('#checkboxTags :checked') !== null) {
    const tagValue = document.querySelector('#checkboxTags :checked').value;
    renderChampionsInScreen(filterTag(champions, tagValue));
  }
}
checkbox.addEventListener('change', valueFilterTag);

// ORDER INFORMATION
// seleccionar filtros de informacion
const selectList = document.querySelector('#selectInformation');

// funcion que recoge el input escodigo e imprime
function valueOrderInformation() {
  if (selectList !== null) {
    const valueSelectInformation = selectList.value;
    renderChampionsInScreen(orderInfo(champions, valueSelectInformation));
  }
}
selectList.addEventListener('change', valueOrderInformation);

// FILTROS FUNCIONANDO JUNTOS (al mismo tiempo)
function mixFilterTagInformation() {
  if (document.querySelector('#checkboxTags :checked') !== null && selectList !== null) {
    const tagValue = document.querySelector('#checkboxTags :checked').value;
    const valueSelectInformation = selectList.value;
    renderChampionsInScreen(filterTag(orderInfo(champions, valueSelectInformation), tagValue));
  }
}
selectList.addEventListener('change', mixFilterTagInformation);

// SEARCHER
const inputSearch = document.getElementById('inputSearch');

// funcion que recoge input de busqueda y va filtrando automaticamente
function valueSearcher() {
  const inputValue = inputSearch.value.toUpperCase();
  renderChampionsInScreen(filterSearch(champions, inputValue));
}

inputSearch.addEventListener('keyup', valueSearcher);

//parte del modal 

const renderModalChampions = () => {
  event.target.querySelector('.containerModals').style.display='block';
  for (let i = 0; i < champions.length; i++) {
    if ((champions[i].name).toUpperCase() === event.target.firstElementChild.innerHTML){
     
  
  event.target.querySelector('.containerModals').innerHTML=`<div class="modalEachChamp">
  <span class="close">&times;</span>
  <p> ${champions[i].name.toUpperCase()}</p><br>
  <div id="containerModalPic"> 
    <img id="modaPic" src="${champions[i].splash}">
  </div><br>
  <p> ${champions[i].title}</p><br>
  <p>${champions[i].blurb}</p><br>
  <div id="containerInfoModal">
   <p>attack:${champions[i].info.attack}</p>
   <p>defense:${champions[i].info.defense}</p>
   <p>magic:${champions[i].info.magic}</p>
   <p>difficulty:${champions[i].info.difficulty}</p>
  </div>
  <div id="containerStatsModal">
   <p>hp:${champions[i].stats.hp}</p>
   <p>mp:${champions[i].stats.mp}</p>
   <p>movespeed:${champions[i].stats.movespeed}</p>
   <p>armor:${champions[i].stats.armor}</p>
   <p>attackrange:${champions[i].stats.attackrange}</p>
   <p>hpregen:${champions[i].stats.hpregen}</p>
   <p>mpregen:${champions[i].stats.mpregen}</p>
   <p>attackdamage:${champions[i].stats.attackdamage}</p>
  </div>
  </div>`
}

}
window.onclick = function(event) {
  if (event.target == document.querySelector('.containerModals')){
    document.querySelector('.containerModals').style.display = "none";
  }
}
};



document.querySelector("#allTheChamps").addEventListener('click', renderModalChampions);


// document.querySelector('.close').addEventListener('click', () => {
//   document.querySelector('.containerModals').style.display='none';
// });