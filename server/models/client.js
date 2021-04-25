import mongoose from 'mongoose';

const clientSchema = mongoose.Schema({
    code:String,
    name:String,
    amount:String,
    detail:String,
    date:String,
    reservation:Boolean,
    bar:Boolean,
    restaurant:String,
    tableName:String
});

const client = mongoose.model('client', clientSchema, 'client');

export default client;