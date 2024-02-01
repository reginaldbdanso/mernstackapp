require('dotenv').config();
const express = require('express');
const router = require('./routes/router');


// express app
const app = express()

// middleware
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})
// routes
app.use('/api/workouts/', router);


//listening for requests
app.listen(process.env.PORT, () => {
    console.log('listening on port', process.env.PORT)
})