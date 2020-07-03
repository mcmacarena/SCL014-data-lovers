//función para filtrar por tag
export const filterTag = (champions) =>{
let arrayChampionstag=champions.filter(oli=>(oli.tags[0]=="Tank"||oli.tags[1]=="Tank"));
return arrayChampionstag;
};

// export const anotherExample = () => 'OMG';
