import mongoose from 'mongoose';

const restaurantSchema = mongoose.Schema({
    code:String,
    name:String,
    address:String,
    clientsQuant:String,
    phoneNumber:String,
    specialty:String,
    active:Boolean
});

const restaurant = mongoose.model('restaurant', restaurantSchema, 'restaurant');

export default restaurant;