// app.js
const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const bcrypt = require('bcryptjs');

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware setup
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));

// Set up session middleware
app.use(
  session({
    secret: 'your-secret-key', // Replace 'your-secret-key' with a random secret key
    resave: true,
    saveUninitialized: true,
  })
);

// Set up flash middleware
app.use(flash());

// Routes
app.use('/', require('./routes/auth'));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
