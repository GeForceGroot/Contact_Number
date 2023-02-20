const { Console } = require('console');
const express = require('express')
const path = require('path')
const db = require('./config/mongoose');
const Contact = require('./model/contact')
const port = 8000;
const app = express();


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());

app.use(express.static('assets'));

// Middleware 1
// app.use(function(req,res,next){
//   console.log('middleware 1 called');
//   next();
// })

// // Middleware 2
// app.use(function(req,res,next){
//   console.log('middleware 2 is called');
//   next();
// })


var contactList = [
  {
    'name': "Arpan",
    'phone': "1232141414"
  },
  {
    'name': "Stark",
    'phone': "1284681414"
  },
  {
    'name': "Khushal",
    'phone': "4243432"
  },
  {
    'name': "Ninja",
    'phone': "2394794"
  }
]
app.get('/', function (req, res) {

  Contact.find({}, function (err, contacts) {
    if (err) {
      Console.log('Errorin fecting Contacts form db');
      return;
    }
    return res.render('home', {
      title: 'Contact List',
      contact_list: contacts
    });
  })
})

app.get('/pratice', function (req, res) {
  return res.render('pratice', {
    title: 'My contact list'
  })
})
app.post('/create-contact', function (req, res) {
  // contactList.push({
  //   name: req.body.name,
  //   phone : req.body.phone
  Contact.create({
    name: req.body.name,
    phone: req.body.phone
  }, function (err, newContact) {
    if (err) {
      console.log("Error in creating a contact",);
      return;
    }
    console.log('******', newContact);
    return res.redirect('back');
  })
});


//  For Deleting the contact

app.get('/delte-contact/:phone', function (req, res) {

  // get the id from the url

  // console.log(req.query);

  let id = req.query.id;

  // find the contact in db using id and delete it 

  Contact.findByIdAndDelete(id, function (err) {
    if (err) {
      console.log("Error in delteing database")
      return;
    }
    return res.redirect('back');
  });
})

app.listen(port, function (err) {
  if (err) {
    console.log(err);
  }
  console.log("The serever is running on port 8000")
});







