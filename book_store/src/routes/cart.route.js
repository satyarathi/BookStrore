import express from 'express';
import * as cartController from '../controllers/cart.controller'
import {userAuth} from '../middlewares/auth.middleware'

const router = express.Router();

//add books to cart
router.post('/add/:_id', userAuth, cartController.addToCart);

//remove books from cart
router.post('/remove/:_id', userAuth, cartController.removeBookFromCart)

//get books from cart
router.get('', userAuth, cartController.getBookFromCart)

export default router;