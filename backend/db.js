const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://hebbarayush:Venkatesh123$@cluster0.tbm1rog.mongodb.net/gofoodmern";

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected successfully");

    const db = mongoose.connection.db;

    // Fetch food items data
    const foodItemsCollection = db.collection("food_items");
    const foodItemsData = await foodItemsCollection.find({}).toArray();

    // Fetch food categories data
    const foodCategoryCollection = db.collection("foodCategory");
    const foodCategoryData = await foodCategoryCollection.find({}).toArray();

    // Set global variables
    global.food_items = foodItemsData;
    global.foodCategory = foodCategoryData;

    console.log("Data fetched successfully");
  } catch (err) {
    console.error("Error connecting to MongoDB or fetching data:", err);
    process.exit(1); // Exit process with failure
  }
};

module.exports = mongoDB;
