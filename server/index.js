const express = require('express');
const app = express();
const connection = require('./connections/dbConnection');
const student = require('./routes/student');
const bodyParser = require('body-parser');
const parent = require('./routes/parent');
const teacher = require('./routes/teacher');
port = 3000;



app.use(express.json());
app.use(bodyParser.json());
app.use('/student', student);
app.use('/parent', parent);
app.use('/teacher', teacher)


app.listen(port, ()=> console.log("Listening  to Port 3000"));