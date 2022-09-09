const programControllers = require('./programs.controller')

const getAll = (req, res) => {
    const data = programControllers.getAllPrograms()
    res.status(200).json({items: data.length, programs: data})
}

const getById = (req, res) => {
    const id =  req.params.program_id
    const data = programControllers.getProgramById(id)
    if(data){
        res.status(200).json(data)
    }else{
        res.status(404).json({message: 'Invalid ID'})
    }
}

const create = (req, res) => {
    const data = req.body
    if (typeof data.categories === 'string') {
        return res.status(400).json({message: 'shipment not accepted, it is mandatory that the category is an array'})
      }
    if(!data){
        res.status(400).json({message: 'Missing data'})
    }
    if(!data.title ||
        !data.description ||
        !data.seasons ||
        !data.categories 
    ){
        res.status(400).json({
            message: "All fields must be completed",
            fields: {
              title: "string",
              description: "string",
              seasons: 'number',
              categories: 'array'
            },
          });
          
    }else{
        const response = programControllers.createProgram(data)
        return res.status(201).json({
            message: 
            `Program created succesfully with id: ${response.id}`,
            program: response
        })
    }
}

const deleted = (req, res) => {
    const id = req.params.program_id
    const data = programControllers.deleteProgram(id)
    if(data){
        return res.status(204).json()
    }else{
        return res.status(404).json({message: 'Invalid ID'})
    }
}

const update = (req, res) => {
    const id = req.params.program_id
    const data =  req.body
   
    if(data.title ||
        data.description ||
        data.seasons ||
        data.categories
    ){
        const response = programControllers.editProgram(id, data)
        if (response) {
            return res.status(200).json({
                message: 'Program edited succesfully',
                user: response
              })
        } else {
            return res.status(404).json({
                message: 'Invalid ID'
              })
        }
    }

    if(!data.title ||
        !data.description ||
        !data.seasons ||
        !data.categories
    ){
        return res.status(400).json({
            message: "one or more of the fields must be completed",
            fields: {
              title: "string",
              description: "string",
              seasons: 'number',
              categories: 'array/required'
            },
          });
    }
    
}

const postImgCover = (req, res) => {
    const id = req.params.id
    const imgCover = req.hostname + ':8000' + '/api/v1/uploads/serie/cover-img/' + req.file.filename
    const data = programControllers.editProfileImg(id, imgCover)
    res.status(200).json(data)
}


module.exports = {
    getAll,
    getById,
    create,
    deleted,
    update,
    postImgCover
}