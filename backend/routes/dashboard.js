const express = require('express');
const { isAdmin } = require('../middleware/isAdmin');
const { GetAllData, GetAllUser, UserDelete } = require('../controllers/dashboard');


const dashboardRoute = express.Router();

dashboardRoute.get('/', isAdmin, GetAllData);

dashboardRoute.get('/users', isAdmin, GetAllUser);

dashboardRoute.delete('/delete/:id', isAdmin, UserDelete);







module.exports = dashboardRoute;