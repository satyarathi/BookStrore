import express from 'express';
import * as bookController from '../controllers/book.controller';
import { userAuth } from '../middlewares/auth.middleware';


const router = express.Router();

// get all books
router.get('', userAuth, bookController.getAllBooks);

// get book by id
router.get('/:_id', userAuth, bookController.getBookById);

export default router;