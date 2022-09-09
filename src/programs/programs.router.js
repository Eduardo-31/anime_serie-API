const router = require ('express').Router()
const programHttp = require('./programs.http')
const chapterHttp = require('../chapters/chapters.http')
const { updateCover, updateChapter } = require('../utils/multer')

router.route('/')
    .get(programHttp.getAll)
    .post(programHttp.create)

router.route('/:program_id')
    .get(programHttp.getById)
    .patch(programHttp.update)
    .delete(programHttp.deleted)

// POST - cover image
router.route('/:id/cover-img')
    .post(updateCover().single('cover-img'), programHttp.postImgCover)

    
// Chapters    

router.route('/:program_id/chapters')
    .get(chapterHttp.getAllChapters)
    .post(chapterHttp.create)

router.route('/:program_id/chapters/:chapter_id')
    .get(chapterHttp.getById)
    .patch(chapterHttp.update)
    .delete(chapterHttp.deleted)

// POST - video url
router.post('/:program_id/chapters/:chapter_id/video', updateChapter().single('chapter-video'), chapterHttp.postVideoUrl) 


exports.router = router