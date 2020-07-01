//import { example } from './data.js';
import lol from './data/lol/lol.js';

//Array que contiene los valores del data (en este caso cada uno de los champions)
let champions=Object.values(lol.data);

document.getElementById('allTheChamps').innerHTML = champions.map(champ => 
      `<div class="containerEachChamp">
      <p> ${champ.name.toUpperCase()}</p>
      <div id="containerProfilePic"> 
        <img id="profilePic" src="${champ.splash}"> 
      </div>
      <p> "${champ.title}"</p>
      <p> [${champ.tags}]</p>
    </div>`

).join('');

// document.querySelector('div#allTheChamps > div').classList.add("EachChampContainer");

