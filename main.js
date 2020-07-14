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
      <p> [${champ.tags.join(' ')}]</p><br>
      <p><img id="attack" src="img/Melee_role.png"> ${champ.info.attack}&nbsp&nbsp<img id="defense" src="img/Armor_icon.png"> ${champ.info.defense}</p>
      <p><img id="magic" src="img/Mana_regeneration_icon.png">${champ.info.magic} &nbsp&nbsp<img id="difficulty" src="img/Champion_style_abilities_active.png">${champ.info.difficulty}</p>
      <div class="containerModal">
      </div>
      </div>`).join('');
};
// imprimir todos
renderChampionsInScreen(champions);

// FILTER TAG
// seleccion todos los filtros tag
const checkbox = document.querySelector('#checkboxTags');
// función que recoge nombre del tag escogido y luego imprime con renderChampionsInScreen
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
// funcion que recoge el input escogido y luego imprime con renderChampionsInScreen
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
// funcion que recoge input de busqueda y va filtrando automaticamente y luego imprime con renderChampionsInScreen
function valueSearcher() {
  const inputValue = inputSearch.value.toUpperCase();
  renderChampionsInScreen(filterSearch(champions, inputValue));
}
inputSearch.addEventListener('keyup', valueSearcher);

// MODAL
const showModalChampion = () => {
  const actualModal = event.target.querySelector('.containerModal');
  actualModal.style.display = 'block';
  for (let i = 0; i < champions.length; i++) {
    if ((champions[i].name).toUpperCase() === event.target.firstElementChild.innerHTML) {
      // lo que contiene el contenedor containerModal
      actualModal.innerHTML = 
      `<div class="modalEachChamp">
        <span class="close">&times;</span>
        <div class="containerModalName">
          <p> ${champions[i].name.toUpperCase()}</p><br><br>
        </div>
      <div id="containerPhotoAndStats">
        <div id="containerModalPic"> 
          <img id="modalPic" src="${champions[i].splash}">
        </div><br>
        <div id="containerStatsModal">
          <div id="subcontainerStats">
            <div id="healthInfo">
              <p>Health: </p><br>
              <p>hp: ${champions[i].stats.hp}</p>
              <p>hpregen: ${champions[i].stats.hpregen}</p>
            </div>
            <div id="attackInfo">
              <p>Attack: </p><br>
              <p>attackrange: ${champions[i].stats.attackrange}</p>
              <p>attackdamage: ${champions[i].stats.attackdamage}</p>
            </div>
            <div id="manaInfo">
              <p>Mana: </p><br>
              <p>mp: ${champions[i].stats.mp}</p>
              <p>mpregen: ${champions[i].stats.mpregen}</p>
            </div>
            
            <div id="otherInfo">
              <p>Others: </p><br>
              <p>movespeed: ${champions[i].stats.movespeed}</p>
              <p>armor: ${champions[i].stats.armor}</p>
            </div>
          </div>
        </div>
     </div>
      <br>
      <p class="titleChamp"> ${champions[i].title}</p><br>
      <p class="infoBlurb">${champions[i].blurb}</p><br>
    </div>`;
    }
  }
  // para cerrar el modal al hacer click afuera
  window.onclick = (event) => {
    if (event.target === actualModal) {
      actualModal.style.display = 'none';
    }
  };
  // para cerrar el modal al hacer click en el boton cerrar
  event.target.querySelector('.close').onclick = () => {
    actualModal.style.display = 'none';
  };
};
document.querySelector('#allTheChamps').addEventListener('click', showModalChampion);
