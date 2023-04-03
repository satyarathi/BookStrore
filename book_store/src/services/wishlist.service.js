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
            throw new Error('Book already exist');
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

//Remove books from wishlist

export const removeBook = async (userID, params_book_id) => {
    const checkCart = await Wishlist.findOne({ userId: userID });
    if (checkCart) {
        console.log("If User Exists");
        let bookFound = false
        let totalPrice = 0
        let bookquanitity = 0
        checkCart.books.forEach(element => {
            if (element.productId == params_book_id) {
                element.quantity = element.quantity -= 1
                bookquanitity = element.quantity
                totalPrice = totalPrice - (element.price * element.quantity);
                let indexofelement = checkCart.books.indexOf(element);
                console.log("If Book found");
                checkCart.books.splice(indexofelement, 1)
                bookFound = true
            }
        });
        console.log("After deleting the book", checkCart.books);
        if (bookFound == false) {
            console.log("If Book not found");
            throw new Error("Book not in the cart");
        }

        const updatedCart = await Wishlist.findOneAndUpdate({ userId: userID }, { books: checkCart.books, cart_total: totalPrice }, { new: true })
        return updatedCart
    } else {
        throw new Error("User cart doesn't exist");
    }
};