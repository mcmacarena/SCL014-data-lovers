// función para filtrar por tag
export const filterTag = (champions, tagValue) => {
  const arrayChampionsTag = champions.filter(champ =>
    (champ.tags[0] === tagValue || champ.tags[1] === tagValue));
  return arrayChampionsTag;
};

// función para ordenar por info
export const orderInfo = (champions, valueSelectInformation) => {
  const arrayChampionsInformation = champions.sort((a, b) => {
    if (a.info[valueSelectInformation] < b.info[valueSelectInformation]) {
      return 1;
    } else if (a.info[valueSelectInformation] === b.info[valueSelectInformation]) {
      return 0;
    } return -1;
  });
  return arrayChampionsInformation;
};

// funcion para filtrar barra de busqueda
export const filterSearch = (champions, inputValue) => {
  const arraySearchChampions = champions.filter(champ =>
    ((champ.name).toUpperCase()).slice(0, inputValue.length) === inputValue);
  return arraySearchChampions;
};
