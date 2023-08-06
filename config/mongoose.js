//require the library
const mongoose=require('mongoose');

//connect to the database
mongoose.connect('mongodb://127.0.0.1:27017/contacts_list_db');

//require connection (to check if it is connect)
const db=mongoose.connection;

//error handling
db.on('error', console.error.bind(console, 'error connecting to db'));

//up and running then print the massage
db.once('open',function(){
     console.log('successfully connected to database');
})