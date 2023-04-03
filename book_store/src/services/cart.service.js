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
        const book = await books.findOne({_id: params_book_id});
        if(!book && book.quantity < 0) throw new Error('No Book found');

        console.log('Book:', book);

        const userCart = await Cart.findOne({ userId: userID }) || { userId: userID, books: [], cart_Total: 0 };
        let totalPrice = userCart.cart_Total;

        const existingBook = userCart.books.find(book => book.productId === params_book_id);
        if (existingBook) {
            existingBook.quantity++;
            totalPrice += existingBook.price;
            
        } else {
            const newBook = {
                productId: book._id,
                description: book.description,
                bookName: book.bookName,
                bookImage: book.bookImage,
                author: book.author,
                price: parseInt(book.price),
                quantity: 1
            };
            userCart.books.push(newBook);
            totalPrice += newBook.price;
            console.log('Added new book:', newBook);
        }

        console.log(`Cart total after adding books: ${totalPrice}`);

        const updatedCart = await Cart.findOneAndUpdate({ userId: userID }, { books: userCart.books, cart_Total: totalPrice }, { new: true, upsert: true });
        return updatedCart;
    } catch (error) {
        throw new Error(error.message)
    }
}

//Remove books from cart

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
      newCart = Cart.findByIdAndUpdate(
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
      bookObj['cart_Total'] = -book.price;
      newCart = Cart.findByIdAndUpdate({ _id: userCart._id }, { $inc: bookObj });
    }
  }
  return newCart;
};