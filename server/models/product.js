import mongoose from 'mongoose';

const productSchema = mongoose.Schema({
    code:String,
    name:String,
    description:String,
    quantity:String,
    type:String,
    brand:String
});

const product = mongoose.model('product', productSchema, 'product');

export default product;