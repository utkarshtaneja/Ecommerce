const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require("./routes/UserRoutes");
const productRoutes = require("./routes/ProductRoutes");
const cartRoutes = require("./routes/CartRoutes");
const orderRoutes = require("./routes/OrderRoutes");
const paymentRoutes = require('./routes/PaymentRoutes');
const cookieParser = require('cookie-parser');

dotenv.config();
connectDB();

app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/product', productRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/payment', paymentRoutes);
app.use("/uploads", express.static('uploads'));

const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});