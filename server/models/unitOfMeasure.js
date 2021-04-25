import mongoose from 'mongoose';

const unitOfMeasureSchema = mongoose.Schema({
    code:String,
    name:String,
    scale:String,
    detail:String,
    symbol:String
});

const unitOfMeasure = mongoose.model('unitOfMeasure', unitOfMeasureSchema, 'unitOfMeasure');

export default unitOfMeasure;