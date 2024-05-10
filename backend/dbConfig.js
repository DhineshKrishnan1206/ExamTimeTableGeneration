const mongoose = require('mongoose');

const connectDB=()=>{
    try {
        mongoose.connect('mongodb://0.0.0.0:27017/timetable');
        console.log("Connect to DB Successfully");
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;