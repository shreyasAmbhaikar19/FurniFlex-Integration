const express = require('express');
// const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const user = require('./routes/userRoute');
const product = require('./routes/productRoute');
const wishlist = require('./routes/wishlistRoute');
const cart = require('./routes/cartRoute');
// const order = require('./routes/orderRoute');
// const payment = require('./routes/paymentRoute');

const app = express();

app.use(express.json());
app.use(cookieParser());
// app.use(bodyParser.urlencoded({ extended: true }));

// Enable CORS for all routes
app.use(cors());

app.use('/api/v1', user);
app.use('/api/v1', product);
app.use('/api/v1', wishlist);
app.use('/api/v1', cart);
// app.use('/api/v1', order);
// app.use('/api/v1', payment);
app.use('/uploads', express.static('uploads'));

module.exports = app;