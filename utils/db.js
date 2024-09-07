const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
    });
    console.log('Conectado a la base de datos MongoDB');
  } catch (error) {
    console.error('Error conectando a la base de datos MongoDB:', error);
    process.exit(1); 
  }
};

module.exports = { connectDB };
