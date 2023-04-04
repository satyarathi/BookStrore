import books from '../models/book.model';
import Cart from '../models/cart.model';
import * as BookService from '../services/book.service';

//get user cart
export const getBookFromCart = async (userID) => {
    const data = await Cart.findOne({ userId: userID });
    return data;
  };


export const addToCart = async (userID, params_book_id)=>{
    try {
      const book = await BookService.getBookById(params_book_id);
        if(!book && book.quantity <= 1) throw new Error('No Book found');

        console.log('Book:', book);

        let cart = await Cart.findOne({ userId: userID});

        if (!cart) {
          cart = await Cart.create({
            userId: userID,
            books: [
              {
                productId: book._id,
                description: book.description,
                bookName: book.bookName,
                author: book.author,
                quantity: 1,
                price: book.price
              }
            ],
            cart_Total: book.price
          });
          return cart;
        }
      
        var isBookPresent = false;
        let idx;
        for (idx = 0; idx < cart.books.length; idx++) {
          if (cart.books[idx].productId == book._id) {
            isBookPresent = true;
            break;
          }
        }
        console.log('isBookPresent', isBookPresent);
      
        let newCart;
        if (isBookPresent) {
          const bookObj = {};
         
          bookObj['books.' + idx + '.quantity'] = 1;
          bookObj['books.' + idx + '.price'] = book.price;
          bookObj['cart_Total'] = book.price;
      
          newCart = Cart.updateOne({ _id: cart._id }, { $inc: bookObj });
        } else {
          newCart = Cart.updateOne(
            { _id: cart._id },
            {
              $push: {
                books: {
                  productId: book._id,
                  description: book.description,
                  bookName: book.bookName,
                  author: book.author,
                  quantity: 1,
                  price: book.price
                }
              },
              $inc: {
                cart_Total: book.price
              }
            }
          );
        }
        return newCart;
      
    } catch (error) {
        throw new Error(error.message)
    }
}

//Remove books from cart

export const removeBookFromCart = async (userID, params_book_id,allBooks = false) => {
  const book = await BookService.getBookById(params_book_id);
  if (!book) {
    throw new Error('No book found');
  }
  console.log('book details', book);
  var userCart = await Cart.findOne({ userId: userID });
  
  if (!userCart) {
    throw new Error('No cart found');
  }
  let existingBook = false;

  let idx;
  for (idx = 0; idx < userCart.books.length; idx++) {
    if (userCart.books[idx].productId == params_book_id) {
      existingBook = true;
      break;
    }
  }
  let newCart;
  if (existingBook) {

    if (
      userCart.books[idx].quantity == 1 ||
      userCart.books[idx].quantity == 0 ||
      allBooks
    ) {
      newCart = Cart.updateOne(
        { _id: userCart._id },
        {
          $pull: {
            books: {
              productId: book.id
            }
          },
          $inc: {
            cart_Total: -(book.price * userCart.books[idx].quantity)
          }
        }
      );
    } else {
      const bookObj = {};
      bookObj['books.' + idx + '.quantity'] = -1;
      bookObj['books.' + idx + '.price'] = -book.price;
      bookObj['cart_Total'] = -book.price;
      newCart = Cart.updateOne({ _id: userCart._id }, { $inc: bookObj });
    }
  }
  return newCart;
};