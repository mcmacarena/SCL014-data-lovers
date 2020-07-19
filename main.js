import { filterTag, filterSearch, orderInfo } from './data.js';
import lol from './data/lol/lol.js';

// Array que contiene los valores del data (en este caso cada uno de los champions)
const champions = Object.values(lol.data);

// imprimir en pantalla los array de champions que escoja (todos o filtrados)
const renderChampionsInScreen = (arrayOfChampions) => {
  document.getElementById('allTheChamps').innerHTML = arrayOfChampions.map(champ =>
    `<div class='containerEachChamp'>
      <p>${champ.name.toUpperCase()}</p><br>
      <div id='containerProfilePic'> 
        <img id='profilePic' src="${champ.splash}">
      </div><br>
      <p> [${champ.tags}]</p><br>
      <p> ⚔️${champ.info.attack} &nbsp&nbsp 🛡️${champ.info.defense}</p>
      <p> 🔮${champ.info.magic} &nbsp&nbsp ⚠️${champ.info.difficulty}</p>
      <div class='containerModal'>
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
// funcion que recoge input de search, filtra automaticamente e imprime con renderChampionsInScreen
function valueSearcher() {
  const inputValue = inputSearch.value.toUpperCase();
  renderChampionsInScreen(filterSearch(champions, inputValue));
}
inputSearch.addEventListener('keyup', valueSearcher);

// BOTON PARA LIMPIAR FILTROS
const btnClear = document.querySelector('.btnClear');
function clearFilter() {
  location.reload(true);
}
btnClear.addEventListener('click', clearFilter);
// al hacer click en el logo se refresca la página
document.querySelector('.log_img').addEventListener('click',clearFilter);

// Aside desplegable
const btnToggle = document.querySelector('.toggle');
btnToggle.addEventListener('click', () => {
  document.getElementById('filter').classList.toggle('active');
});

// MODAL
const showModalChampion = () => {
  const actualModal = document.querySelector('.containerModal');
  let eventClickCapture;
  // para evitar que arroje un error para el event target
  if (event.target.src !== undefined) {
    eventClickCapture = event.target.src; // click en la foto
  } else {
    eventClickCapture = event.target.querySelector('#profilePic').src; // click en la tarjeta
  }
  for (let i = 0; i < champions.length; i++) {
    if (champions[i].splash === eventClickCapture) {
      actualModal.style.display = 'block';
      // lo que contiene el contenedor containerModal
      actualModal.innerHTML =
      `<div class='modalEachChamp'>
      <div id="close">
       <span class='close'>&times;</span>
      </div>
        <div class='containerModalName'>
          <p> ${champions[i].name.toUpperCase()}</p><br>
          <p class='titleChamp'> ${champions[i].title}</p><br>
        </div>
        <div id='containerPhotoAndText'>
          <div id='containerModalPic'> 
            <img id='modalPic' src="${champions[i].splash}">
          </div><br>
          <div id='textContainer'>
          <p class='infoBlurb'>${champions[i].blurb}</p><br>
          </div>
        </div>
        <div id='containerStatsModal'>
          <div id='containerHealthAttack'>
            <div id='healthInfo'>
              <p>❤️Health: </p><br>
              <p>Heal Points: ${champions[i].stats.hp}</p>
              <p>Heal Regeneration: ${champions[i].stats.hpregen}</p>
            </div>
            <div id='attackInfo'>
              <p>⚔️Attack: </p><br>
              <p>Attack Range: ${champions[i].stats.attackrange}</p>
              <p>Attack Damage: ${champions[i].stats.attackdamage}</p>
            </div>  
          </div>
          <div id='containerManaOther'>
            <div id="manaInfo">
              <p>💙Mana: </p><br>
              <p>Mana Points: ${champions[i].stats.mp}</p>
              <p>Mana Regeneration: ${champions[i].stats.mpregen}</p>
            </div>      
            <div id='otherInfo'>
              <p>➕Others: </p><br>
              <p>Move Speed: ${champions[i].stats.movespeed}</p>
              <p>Armor: ${champions[i].stats.armor}</p>
            </div>
          </div>
        </div>
      </div>
      <br>
    </div>`;
      // para cerrar el modal al hacer click afuera
      window.onclick = (event) => {
        if (event.target === actualModal) {
          actualModal.style.display = 'none';
        }
      };
      // para cerrar el modal al hacer click en el boton cerrar
      document.querySelector('.close').onclick = () => {
        actualModal.style.display = 'none';
      };
    }
  }   
};
// funcion que recorre cada uno de los contenedores de las cartas
const clickOnTheCards = () => {
  const allTheChamps = document.querySelectorAll('.containerEachChamp');
  for (let i = 0; i < allTheChamps.length; i++) {
    allTheChamps[i].addEventListener('click', showModalChampion);
  }
};
// evento click del contenedor de todas las cartas
document.querySelector('#allTheChamps').addEventListener('mouseover', clickOnTheCards);


