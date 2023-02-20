
//  Require the libray

const mongoose = require('mongoose');

// connect to the database

mongoose.connect('mongodb://localhost/contact_list_db');

// acuqire to the connetion (to check if it succesful)

const db = mongoose.connection;

// if there is any  error
db.on('error',console.error.bind(console,'erroe connecting to db'));


// up and running then message

db.once('open',function(){
    console.log('Succesfully conneted to the database');
})