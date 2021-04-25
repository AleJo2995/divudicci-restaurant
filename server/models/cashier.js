import mongoose from 'mongoose';

const cashierSchema = mongoose.Schema({
    code:String,
    registryDate:String,
    description:String,
    openingAmount:String,
    action:String,
    restaurant:String
});

const cashier = mongoose.model('cash_register', cashierSchema, 'cash_register');

export default cashier;