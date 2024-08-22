const express = require("express");
const router = express.Router();
const Order = require("../models/Orders");

router.post("/orderData", async (req, res) => {
  try {
    // Ensure that `Order_date` is provided, otherwise use the current date.
    let orderDate = req.body.Order_date || new Date();
    
    // Ensure that each item in `order_data` has the required fields.
    let data = req.body.order_data.map(item => ({
      ...item,
      img: item.img || 'default-image-url',  // Use default image URL if not provided
      Order_date: orderDate  // Ensure each item has the same Order_date
    }));

    // Insert the Order_date at the beginning of the data array.
    data.splice(0, 0, { Order_date: orderDate });

    // Check if the user already has an order in the database.
    let eID = await Order.findOne({ email: req.body.email });

    if (eID == null) {
      // Create a new order record if it doesn't exist.
      await Order.create({
        email: req.body.email,
        order_data: [data],
      });
    } else {
      // Update the existing order record with new data.
      await Order.findOneAndUpdate(
        { email: req.body.email },
        {
          $push: { order_data: data },
        }
      );
    }

    res.json({ success: true });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

router.post("/myorderData", async (req, res) => {
  try {
    let myData = await Order.findOne({ email: req.body.email });
    res.json({ orderData: myData });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
