const mongoose = require('mongoose');

const connection = async()=>{
    try{
        const isConnected = await mongoose.connect('mongodb://127.0.0.1:27017/samajikDb');
        if(isConnected) console.log("Connected to mongodb")
    }catch(err){
        console.log("Connection to mongodb failed")
    }

}


module.exports = connection
