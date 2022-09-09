const chapterControllers = require('./chapters.controllers')
const {getProgramById} = require('../programs/programs.controller')

const getAllChapters = (req, res) => {
    const id = req.params.program_id
    const program = getProgramById(id)
    const data = chapterControllers.getChaptersByProgram(id)
    if(program && data){
        res.status(200).json({ ...program,chapters: data})
    } else {
        res.status(404).json({message: 'Invalid ID'})
    }
}

const create = (req, res) => {
    const id = req.params.program_id
    const data = req.body
    const program = getProgramById(id) 

    if(!program){
        res.status(404).json({message: 'impossible to create chapters, the program does not exist, "Invalid ID"'})
    }
    
    if(
        !data.chapter_num
    ){
        res.status(400).json({
            message: "All fields must be completed",
            fields: {
                chapter_num: "number"
            }
        })

    }else if (
        typeof data.chapter_num !== 'number'
    ){
        res.status(400).json({message: 'your credential chapter_num, must be strictly typo number'})
    }else{
        const response = chapterControllers.createChapter(data, id)
        res.status(201).json({
            message: 
            `Chapter successfully created with id: ${response.id}`,
            chapter: response
        })
    }
}


const getById = (req, res) => {
    const chapterID = req.params.chapter_id
    const programID = req.params.program_id
    const data = chapterControllers.getChapterById(chapterID, programID)

    if(data){
        res.status(200).json(data)
    }else{
        res.status(404).json({message: 'Invalid ID'})
    }
    
}

const update = (req, res)  => {
    const chapterID = req.params.chapter_id
    const programID = req.params.program_id
    const data = req.body

    if(data.chapter_num){
        
        if (typeof data.chapter_num !== 'number') {
            return res.status(400).json({message: 'your credential chapter_num, must be strictly typo number'})
        } 
        
        const response = chapterControllers.editChapter(chapterID, programID, data)
        if (response) {
            return res.status(200).json({
                message: 'Chapter edited succesfully',
                user: response
              })
        } else {
            return res.status(404).json({
                message: 'Invalid ID'
              })
        }
    }
       
    if(!data.chapter_num){
        return res.status(400).json({
            message: "one or more of the fields must be completed",
            fields: {
                chapter_num: "number"     
            }
        })
    }
}

const deleted = (req, res) => {
    const chapterID = req.params.chapter_id
    const programID = req.params.program_id
    const data = chapterControllers.deleteChapter(chapterID, programID)
    if(data){
        res.status(204).json()
    }else{
        res.status(404).json({message: 'Invalid ID'})
    }
}


const postVideoUrl = (req, res) => {
    const chapterID = req.params.chapter_id
    const programID = req.params.program_id
    const videoUrl = req.hostname + ':8000' + '/api/v1/uploads/serie/chapters/' + req.file.filename
    const data = chapterControllers.editChapterUrl(chapterID, programID, videoUrl)
    res.status(200).json(data)
}

module.exports = {
    getAllChapters,
    create,
    getById,
    update,
    deleted,
    postVideoUrl
}