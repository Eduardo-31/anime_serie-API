const uuid = require("uuid");

const chaptersDB = require("./chaptersDB")

const getChaptersByProgram = (programID) => {
  const data = chaptersDB.filter((chapter) => chapter.program_id === programID);
  return data;
};

const getChapterById = (chapterID, programID) => {
  const data = chaptersDB.filter((chapter) => chapter.id === chapterID && chapter.program_id === programID);
  return data.length? data[0] : false;
};

const createChapter = (data, program_id) => {
  const newChapter = {
    id: uuid.v4(),
    program_id,
    chapter_num: data.chapter_num,
    url: '',
  };
  chaptersDB.push(newChapter);
  return newChapter;
};

const deleteChapter = (chapterID, programID) => {
  const index = chaptersDB.findIndex((chapter) => chapter.id === chapterID && chapter.program_id === programID);
  if (index !== -1) {
    chaptersDB.splice(index, 1);
    return true;
  }
  return false;
};

const editChapter = (chapterID, programID, data) => {
  const index = chaptersDB.findIndex((chapter) => chapter.id === chapterID && chapter.program_id === programID);
  
  if(index !== -1){
    chaptersDB[index] = {
      id: chapterID,
      program_id: programID,
      chapter_num: data.chapter_num ? data.chapter_num : chaptersDB[index].chapter_num,
      url: chaptersDB[index].url,
    }
    return chaptersDB[index]
  }
  return false
};

const editChapterUrl = (chapterID, programID, videoUrl) => {
  const index = chaptersDB.findIndex(chapter => chapter.id === chapterID && chapter.program_id === programID)
  if(index !== -1){
    chaptersDB[index].url = videoUrl
    return chaptersDB[index]
  }
  return false
}


module.exports = {
  getChaptersByProgram,
  getChapterById,
  createChapter,
  deleteChapter,
  editChapter,
  editChapterUrl
}
