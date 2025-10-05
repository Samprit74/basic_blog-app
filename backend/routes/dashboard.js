const express = require('express');
const { isAdmin } = require('../middleware/isAdmin');
const { GetAllData, GetAllUser, UserDelete } = require('../controllers/dashboard');

const dashboardRoute = express.Router();

// Admin-only: dashboard overview
dashboardRoute.get('/', isAdmin, GetAllData);

// Admin-only: get all users
dashboardRoute.get('/users', isAdmin, GetAllUser);

// Admin-only: delete a user
dashboardRoute.delete('/delete/:id', isAdmin, UserDelete);

module.exports = dashboardRoute;
