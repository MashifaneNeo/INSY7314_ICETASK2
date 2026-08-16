const express = require('express');
const router = express.Router();

const { getAllBooks, getBookById, createBook } = require('../Controllers/bookController');
const validateBookInput = require('../middleware/validateBookInput');

router.get('/', getAllBooks);
router.get('/:id', getBookById);
router.post('/', validateBookInput, createBook);

module.exports = router;