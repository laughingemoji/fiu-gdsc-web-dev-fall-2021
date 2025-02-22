const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv').config()
const PORT = process.env.PORT || 5000
const ATLAS_URI = process.env.ATLAS_URI;
const ErrorHandler = require('./Error/ErrorHandler');
const cookieParser = require('cookie-parser');

// Enable cookie dependency
app.use(cookieParser());

// This is to allow our api to receive data from a client app.
app.use(express.urlencoded({extended: true}));

// This is to allow our api for parsing json.
app.use(express.json());

// This is to allow our api for cross-origin resource sharing.
app.use(cors());

// Import Routes and create router
const loginRouter = require('./Routes/LoginRoute');
const signUpRouter = require('./Routes/SignUpRoute');
const forgetRouter = require('./Routes/ForgetRoute');

// Route Middlewares
app.use('/Login', loginRouter);
app.use('/Register', signUpRouter);
app.use('/Forget', forgetRouter);

// Apply error handler to every call
app.use(ErrorHandler);

// Connect to MongoDB Atlas database
mongoose.connect(ATLAS_URI, {
    useNewUrlParser: true
}).then(() => console.log('*** MongoDB connection established! ***'))
.catch(err => console.log(err));

// Check what PORT the app is listening to
app.listen(PORT, () => {
    console.log(`*** Server is listening on port ${PORT} ***`);
});
