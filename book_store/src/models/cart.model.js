import { Schema, model } from 'mongoose';

const cartSchema = new Schema({
    userId: {
        type: String,
    },
    books:[
        {
            productId: {
                type: String
              },
              description: {
                type: String
              },
            bookName:{
                type: String
              },
              bookImage: {
                type: String
              },
              author: {
                type: String
              },
              quantity:{
                type: Number,
                default: 1,
              },
              price: {
                type: Number,
              } 
        }
    ],
    cart_Total:{
        type: Number,
        default: 0
    },
    },
    {
      timestamps: true
    
});

export default model('cart', cartSchema);