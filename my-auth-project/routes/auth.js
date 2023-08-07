// routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');

// Sample user database (in a real application, use a database like MongoDB)
const users = [];

// Middleware to check if the user is authenticated
function isAuthenticated(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  }
  req.flash('error', 'Please log in to view this page.');
  res.redirect('/login');
}

// Routes
router.get('/', (req, res) => {
  res.render('dashboard', { user: req.session.user });
});

router.get('/login', (req, res) => {
  res.render('login', { messages: req.flash('error') });
});

router.post(
  '/login',
  (req, res) => {
    const { username, password } = req.body;
    const user = users.find((u) => u.username === username);

    if (!user || !bcrypt.compareSync(password, user.password)) {
      req.flash('error', 'Invalid username or password.');
      return res.redirect('/login');
    }

    req.session.user = user;
    res.redirect('/');
  }
);

router.get('/register', (req, res) => {
  res.render('register');
});

router.post(
  '/register',
  [
    check('username', 'Username must be at least 3 characters').isLength({
      min: 3,
    }),
    check('password', 'Password must be at least 6 characters').isLength({
      min: 6,
    }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render('register', { errors: errors.array() });
    }

    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = { username, password: hashedPassword };

    users.push(newUser);
    req.session.user = newUser;
    res.redirect('/');
  }
);

router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

module.exports = router;
