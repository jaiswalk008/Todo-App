const { default: mongoose } = require("mongoose");

let isConnected = false;

const connectToDatabase = async () => {
  if (isConnected) {
    console.log('=> using existing database connection');
    return Promise.resolve();
  }

  console.log('=> using new database connection');
  return mongoose.connect(process.env.MONGO_URI)
    .then(db => {
      isConnected = db.connections[0].readyState;
    });
};
export default connectToDatabase;