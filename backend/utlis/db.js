const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.mongodb_url);
        console.log('MongoDB is connected');
    } catch (error) {
        console.log('MongoDB error', error);
    }
};

module.exports = connectDB;