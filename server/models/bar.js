import mongoose from 'mongoose';

const barSchema = mongoose.Schema({
    code:String,
    name:String,
    number:Number,
    chairs:Number,    
    restaurant:String,
    busy:Boolean
});

const bar = mongoose.model('bar', barSchema, 'bar');

export default bar;