import mongoose from 'mongoose';

const buffetSchema = mongoose.Schema({
    code:String,
    name:String,
    price:String,
    type:String,
    unitOfMeasure:String
});

const buffet = mongoose.model('buffet', buffetSchema, 'buffet');

export default buffet;