import express from 'express';
import * as wishlistcontroller from '../controllers/wishlist.controller';
import { userAuth } from '../middlewares/auth.middleware';


const router = express.Router();

//router to add books to the cart
router.post('/:_id', userAuth, wishlistcontroller.addBook);

// remove book from wishlist
router.put('/:_id', userAuth, wishlistcontroller.removeBook);

export default router;