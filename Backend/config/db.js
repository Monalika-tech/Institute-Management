const mongoose = require("mongoose");


const connectDB = async () => {
    await mongoose.connect(process.env.MONGODB_URL)
        .then(() => console.log("Database connected successfully!!"))
        .catch((err) => console.log("Error in DB connection: ", err));
}
module.exports = connectDB;