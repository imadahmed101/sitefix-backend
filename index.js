const express = require('express')
const app =  express()
const env = require('dotenv/config')
const port = process.env.PORT || 5000
const DBCONNECTION = process.env.DBCONNECTION
const mongoose = require('mongoose')
const cors = require('cors')
app.use(express.json());
app.use(cors())

mongoose.connect(DBCONNECTION, { useNewUrlParser: true });

const studentRoute = require('./routes/student')
const postRoute = require('./routes/post')
const commentRoute = require('./routes/comment')

app.use('/api/', (studentRoute))
app.use('/api/post', (postRoute))
app.use('/api/comment', (commentRoute))

app.listen(port, () => {
    console.log(`Server is running on port: ${ port }`);
});