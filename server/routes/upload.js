const express = require('express')
const multer = require('multer')
const path = require('path')

const router = express.Router()

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'uploads/')
    },
    filename: (req, file, callback) => {
        callback(
            null,
            `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
        )
    },
})

const checkFileType = (file, callback) => {
    const fileTypes = /jpg|jpeg|png/
    const isValidFileExt = fileTypes.test(path.extname(file.originalname).toLowerCase())
    const isValidMimeType = fileTypes.test(file.mimetype)

    if (isValidFileExt && isValidMimeType) {
        return callback(null, true)
    } else {
        callback('Images only of type .jpg .jpeg .png')
    }
}

const upload = multer({
    storage,
    fileFilter: (req, file, callback) => {
        checkFileType(file, callback)
    },
})

router.post('/', upload.single('image'), (req, res) => {
    res.send(`/${req.file.path}`)
})

module.exports = router
