const mongoose = require('mongoose');

const connectDB = async () => {
  const boostrap = await mongoose.connect(process.env.MONGO_URI);

  console.log(`MongoDB Connected: ${boostrap.connection.host}`);
}

module.exports = connectDB;