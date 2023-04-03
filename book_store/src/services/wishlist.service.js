import Book from '../models/book.model';
import Wishlist from '../models/wishlist.model';

//adding book to wishlist
export const addBook = async (userID, params_book_id) => {
    try {
        const book = await Book.findOne({ _id: params_book_id });
        if (!book) throw new Error('Book not found');

        console.log('Book:', book);

        const userCart = await Wishlist.findOne({ userId: userID }) || { userId: userID, books: [] };

        const existingBook = userCart.books.find(book => book.productId === params_book_id);
        if (existingBook) {
            existingBook.quantity++;
            console.log('Existing book quantity:', existingBook.quantity);
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
            console.log('Added new book:', newBook);
        }

        const updatedCart = await Wishlist.findOneAndUpdate({ userId: userID }, { books: userCart.books }, { new: true, upsert: true });
        return updatedCart;
    } catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
};
