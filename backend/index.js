const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./utlis/db');
const authRoute = require('./routes/auth');
const blogRoute = require('./routes/blog');
const publicRoute = require('./routes/public');
const dashboardRoute = require('./routes/dashboard');
const commentRoute = require('./routes/comment');
const cookieParser = require('cookie-parser');
const cors = require('cors')

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();
const corsOptions = {
    origin: 'http://localhost:5173', // your frontend URL
    credentials: true                // must be lowercase and true
};
app.use(cors(corsOptions));
connectDB();
app.use(express.static('public'));//for static files
//middlewears

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

console.log('hello !!!');
app.get('/test', (req, res) => {
    res.send('Hellow From Backend');
    console.log('hello from console');
})
//authentication
app.use('/auth', authRoute);
//blog_routing
app.use('/blog', blogRoute);
//dashboard_route
app.use('/dashboard', dashboardRoute);
//comment route
app.use('/comment', commentRoute);
app.use('/public', publicRoute);

app.listen(PORT, () => {
    console.log(`app is running on port ${PORT}`);
})