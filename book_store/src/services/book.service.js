import Book from '../models/book.model';


//get all books
export const getAllBooks = async () => {
    try{
  const data = await Book.find();
    return data;
  } catch(err) {
    throw new Error('books are not available');
  }
};

// get Book by id
export const getBookById = async (_id, userId) => {
    try {
      const data = await Book.findById({ _id, userId: userId });
      return data;
    } catch (err) {
      throw new Error(err);
    }
  };