import HttpStatus from 'http-status-codes';
import * as CartService from '../services/cart.service';

//add book to cart
export const addToCart = async(req, res , next) =>{
    try {
        const data = await CartService.addToCart(req.body.userId, req.params._id)
        console.log('cart details', data);
        res.status(HttpStatus.CREATED).json({
            code: HttpStatus.CREATED,
            data: data,
            message: "Successfully added to cart"
        })
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message: `${error}`
        });
    }
}

/**
 * Controller to get book from cart
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getBookFromCart = async (req, res, next) => {
    try {
      const data = await CartService.getBookFromCart(req.body.userId);
        res.status(HttpStatus.OK).json({
          code: HttpStatus.OK,
          data: data,
          message: 'Cart fetched successfully'
        });
      
    } catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        message: `${error}`
      });
    }
  };

// Remove book from cart
export const removeBookFromCart = async (req, res) => {
    try {
        const data = await CartService.removeBookFromCart(req.body.userId, req.params._id);
        console.log("const data", data);
        res.status(HttpStatus.CREATED).json({
            code: HttpStatus.CREATED,
            data: data,
            message: 'book removed from cart successfully'
        });
    } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
            code: HttpStatus.BAD_REQUEST,
            message: `${error}`
        });
    }
};
