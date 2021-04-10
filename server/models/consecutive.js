import mongoose from 'mongoose';

const consecutiveSchema = mongoose.Schema({
    code:String,
    type:String,
    description:String,
    initialValue:Number,
    hasPrefix:Boolean,
    prefix:String
});

const consecutive = mongoose.model('consecutives', consecutiveSchema, 'consecutives');

export default consecutive;