const express = require('express');
const { redirect } = require('express/lib/response');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');

const app = express();


app.use(express.static(__dirname + '/assets'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded());

var contactList = [
    {
        name: "anurag",
        phone: "1111111111"
    },
    {
        name: "tony stark",
        phone: "1234567890"
    },
    {
        name: "coding Ninjas",
        phone: " 2134564234"
    }
]

app.get('/', function (req, res) {

    Contact.find().then(function (contacts) {
        return res.render('home', {
            title: "contacts List",
            contact_list: contacts
        });
    }).catch(function (err) {
        console.log('error in fetching contacts from database', err);
        return;
    })

});

app.get('/practice', function (req, res) {
    return res.render('practice', {
        title: "let us play with ejs"
    });
});

app.post('/create-contact', function (req, res) {
    // contactList.push({
    //     name:req.body.name,
    //     phone:req.body.phone
    // });

    // contactList.push(req.body); 
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    })
        .then(newContact => {
            console.log('*****', newContact);
            return res.redirect('/');
        })
        .catch(err => {
            console.error('Error in creating a contact:', err);
            return res.status(500).send('Error in creating a contact');
        });
});

//for deleting a contact
app.get('/delete-contact', function (req, res) {

    //get the id
    let id = req.query.id;

    //find the contact in the database using id and delete
    Contact.findByIdAndDelete(id).then(function (data) {

        return res.redirect('/');
    }).catch(function (err){
        console.log('error in deleting an object form database');
            return;
    });


});

app.listen(port, function (err) {
    if (err) {
        console.log("error in running the server", err);
    }

    console.log("yup!My express server is running on port:", port);

});