import mongoose from 'mongoose';

const tableSchema = mongoose.Schema({
    code:String,
    name:String,
    number:Number,
    chairs:Number,    
    restaurant:String,
    busy:Boolean
});

const table = mongoose.model('table', tableSchema, 'table');

export default table;