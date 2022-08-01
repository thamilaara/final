const Order = require('../models/order');
const Product = require('../models/productModel');

const ErrorHandler = require('../utills/errorHandiler');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const order = require('../models/order');
const ErrorHandler = require('../middleware/errors')

// create a newewOrder order => 
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
    const {
        orderItems,
        shipingInfo,
        itemsPrice,
        textPrice,
        shippingPrice,
        totalPrice,
        paymentInfo

    } = req.body;

    const order = await order.create({
        orderItems,
        shipingInfo,
        itemsPrice,
        textPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt: Date.now(),
        user: req.user._id
    })
    res.send(200).json({
        success: true,
        order
    })

})
module.exports = orderCtrl