import Consecutive from '../models/consecutive.js';

export const getConsecutives = async (req, res) => {
    try {
        const consecutives = await Consecutive.find();

        console.log(consecutives);

        res.status(200).json(consecutives);
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

export const createConsecutive = async (req, res) => {
    const consecutive = req.body;
    const newConsecutive = new Consecutive(consecutive);
    try {
        await newConsecutive.save();

        res.status(201).json(newConsecutive);
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}

export const getNextConsecutiveValue = async (consecutiveType) => {
    try {
        let actualValue, initialValue;
        const consecutive = await Consecutive.find({ type: consecutiveType })
                                        .then(consecutive => { 
                                            actualValue = consecutive[0].actualValue;
                                            initialValue= consecutive[0].initialValue;
                                        });
        if (!(actualValue === undefined || actualValue === null)){ //actual value has been set before
            await handleConsecutives(consecutiveType, actualValue + 1 )
            return consecutive.code + actualValue;           
        } else {
            await handleConsecutives(consecutiveType, initialValue)
            return consecutive.code + initialValue;  
        }
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}

export const handleConsecutives = async (consecutiveType, valueToIncrement) => {
    try {
        return await Consecutive.find({ type: consecutiveType }).updateOne({ actualValue: valueToIncrement})
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}

export const editConsecutive = async (req, res) => {
    const type = req.params.type;
    const newConsecutive = new Consecutive(consecutive);
    try {
        await newConsecutive.save();

        res.status(201).json(newConsecutive);
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}

export const getConsecutiveByType = async (req, res) => {
    const consecutiveType = req.query.type;
    try {
        const consecutive = await Consecutive.find({ type: consecutiveType });
        res.status(200).json(consecutive);
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}