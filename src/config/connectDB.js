const mongoose = require('mongoose')
const { configEnv } = require('./index')

const connectDB = async ()=>{
  try{
    await mongoose.connect(configEnv.MONGO_URI ,
      {
        useNewUrlParser: true, useUnifiedTopology: true,
      })
    console.log('MongoDB connected')
  } catch(error){
    console.log(error.message)
    process.exit(1)
  }
}

module.exports = {connectDB}