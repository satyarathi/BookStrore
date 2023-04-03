import HttpStatus from 'http-status-codes';
import * as wishlistService from '../services/wishlist.service';

// add book to Wishlist
export const addBook = async (req, res) => {
    try {
        const data = await wishlistService.addBook(req.body.userId, req.params._id);
        console.log("user id--------------------------------------------------------->", req.body.userId);
        res.status(HttpStatus.CREATED).json({
            code: HttpStatus.CREATED,
            data: data,
            message: 'Added to Wishlist successfully'
        });
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message: `${error}`
        })
    }
};

// Remove book from Wishlist
export const removeBook = async (req, res) => {
    try {
        const data = await wishlistService.removeBook(req.body.userId, req.params._id);
        res.status(HttpStatus.CREATED).json({
            code: HttpStatus.CREATED,
            data: data,
            message: 'book removed from Wishlist successfully'
        });
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message: `${error}`
        });
    }
};

