const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,  
    },
    description: {
        type: String,
    },
    long_description: {
        type: String,
    },
    details : {
        type : String
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
    },
    stock: {
        type: Number,
        required: true,
        min: [0, 'Stock cannot be negative'],  
    },
    imageUrl: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    color:{
        type:String
    }
});

// Update stock for the product
productSchema.methods.updateStock = async function (quantity) {
    if (this.stock - quantity < 0) {
        throw new Error('Not enough stock');
    }
    this.stock -= quantity;  
    await this.save();
};

// Ensure `price` cannot be negative
productSchema.pre('save', function(next) {
    if (this.price < 0) {
        return next(new Error('Price cannot be negative'));
    }
    next();
});

module.exports = mongoose.model('Product', productSchema);
