const express =require('express');
const path = require('path');
const morgan = require('morgan');
const multer = require('multer');
const uuid = require('uuid/v4');
const { format } = require('timeago.js');

//Initialization
const app = express();
require('./database'); 

//Settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Middelwares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/img/uploads'),
    filename: (req, file, cb, filename) =>{
        cb(null, uuid() + path.extname(file.originalname));

    }
});
app.use(multer({ storage: storage }).single('image'));

//Global variables
app.use((req, res, next) =>{
    app.locals.format = format;
    next();
});

//Routes
app.use(require('./routes/index'));


//Static Files
app.use(express.static(path.join(__dirname, 'public')));


//Star the server
app.listen(app.get('port'), () =>{
    console.log('server on port', app.get('port'));
});