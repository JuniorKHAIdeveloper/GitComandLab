const mongoose = require('mongoose');

const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err: any) => console.error('MongoDB connection error:', err));
};

export default connectDB;
