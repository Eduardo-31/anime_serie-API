const uuid = require('uuid')

const programsDB = [
  {
    id: "88ebed0b-8095-4190-adde-d1165ca48815",
    title: "Boku no hero academia",
    description:
      "Las personas no nacen igual. El protagonista de esta historia es uno de esos casos raros que nacen sin superpoderes, pero esto no le impedirá perseguir su sueño: ser un gran héroe como el legendario All-Might. Para convertirse en el héroe que quiere ser, se apuntará a una de las academias de héroes más prestigiosas del país: Yueiko. Con la ayuda de su ídolo, All-Might, ¿podrá convertirse en un verdadero héroe?",
    seasons: 4,
    //cover: "localhost:8000/uploads/animes/bnha-cover.jpg",
    cover: "localhost:8000/api/v1/uploads/serie/cover-img/1662438341182-bnha-cover-1.jpg",
    categories: ["Accion", "Comedia", "Escolares", "Shounen", "Superpoderes"],
  }
  /*,{
    id: "2",
    title: "prueba",
    description:
      "Las personas no nacen igual. El protagonista de esta historia es uno de esos casos raros que nacen sin superpoderes, pero esto no le impedirá perseguir su sueño: ser un gran héroe como el legendario All-Might. Para convertirse en el héroe que quiere ser, se apuntará a una de las academias de héroes más prestigiosas del país: Yueiko. Con la ayuda de su ídolo, All-Might, ¿podrá convertirse en un verdadero héroe?",
    seasons: 4,
    cover: "localhost:8000/uploads/animes/bnha-cover.jpg",
    categories: ["Accion", "Comedia", "Escolares", "Shounen", "Superpoderes"],
  },*/
];

const getAllPrograms = () => {
  return programsDB;
};

const getProgramById = (id) => {
  const data = programsDB.filter((program) => program.id === id);
  return data.length ? data[0] : false;
};

const createProgram = (data, url) => {
  const newProgram = {
    id: uuid.v4(),
    title: data.title,
    description: data.description,
    seasons: data.seasons,
    cover: '',      // tambien lo pude haber creado como null ya que para subir una imagen lo estoy manejando con otro endpoint
    categories: data.categories,
  };
  programsDB.push(newProgram);
  return newProgram;
};

const deleteProgram = (id) => {
  const index = programsDB.findIndex((program) => program.id === id);
  if (index !== -1) {
    programsDB.splice(index, 1);
    return true;
  }
  return false;
};

const editProgram = (id, data) => {
  const index = programsDB.findIndex((program) => program.id === id);
  if (index !== -1) {
    programsDB[index] = {
      id: id,
      title: data.title ? data.title : programsDB[index].title,
      description: data.description ? data.description : programsDB[index].description,
      seasons: data.seasons ? data.seasons : programsDB[index].seasons,
      cover: programsDB[index].cover,
      categories: data.categories ? data.categories : programsDB[index].categories
    }
    return programsDB[index];
  }
  return false;
};

const editProfileImg = (id, imgCover) => {
  const index = programsDB.findIndex(item => item.id === id)
  if(index !== -1){
    programsDB[index].cover = imgCover
    return programsDB[index]
  }
  return false
}

module.exports = {
  getAllPrograms,
  getProgramById,
  createProgram,
  deleteProgram,
  editProgram,
  editProfileImg
}