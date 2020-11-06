require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser= require('body-parser');
const errorHandler = require('_middleware/error-handler')
const path = require('path');

app.use(bodyParser.urlencoded({ extended: false}));
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.json());
app.use(cors())

//api routes
app.use('/student', require('./routes/student/studentController'));
app.use('/teacher', require('./routes/teacher/teacherController'));
app.use('/parent', require('./routes/parent/parentController'));
app.use('/course', require('./routes/courses/coursescontroller'));
app.use('/assignment', require('./routes/assignment/assignController'));

//global error handler
app.use(errorHandler);

//start server
const port = process.env.NODE === 'production' ? (process.env.PORT || 80): 3000;

app.listen(port, ()=> console.log("Listening  on port " +port));