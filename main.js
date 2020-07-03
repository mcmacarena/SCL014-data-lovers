import { filterTag} from './data.js';
import lol from './data/lol/lol.js';

//Array que contiene los valores del data (en este caso cada uno de los champions)
let champions=Object.values(lol.data);

//imprimir en pantalla los array de champions que escoja (todos o filtrados)
let renderChampionsInScreen=(arrayOfChampions)=>{
  document.getElementById('allTheChamps').innerHTML = arrayOfChampions.map(champ => 
    `<div class="containerEachChamp">
      <p> ${champ.name.toUpperCase()}</p>
      <div id="containerProfilePic"> 
        <img id="profilePic" src="${champ.splash}">
      </div>
      <p> "${champ.title}"</p>
      <p> [${champ.tags}]</p>
    </div>`
  ).join('');
};

//imprimir todos 
// renderChampionsInScreen(champions);


let checkbox=document.getElementById("checkboxTags");
let tagValue;

let checked= () =>{
  if(checkbox.checked=true)
  tagValue=checkbox.value;
  return tagValue
}

checkbox.addEventListener("click",checked);






console.log(checkbox);

// filterTag(champions);


// document.getElementById("checkboxTags").addEventListener(click,validate)
// function validate(){
//   var selectChoose = document.getElementById('checkboxTags');
//   var maxOptions = 2;
//   var optionCount = 0;
//   for (var i = 0; i < selectChoose.length; i++) {
//     if (selectChoose[i].selected) {
//       optionCount++;
//       if (optionCount > maxOptions) {
//         alert("validation failed, not submitting")
//         return false;
//       }
//     }
//   }
//   return true;
// };


//probando
// console.log(filterTag(champions));



