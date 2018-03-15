var nodemailer = require('nodemailer');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const request = require('request');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.listen(5000, function () {
  console.log('Node app is running on port 5000');
});

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'isi email anda',
    pass: 'password anda'
  }
});

app.post('/sendemail', function (req, res) {

  let text = req.body.isi;
  kirimemail(text)
  return res.send({ message: text +" Terkirim ke Email" });
});

function kirimemail(params) {
var mailOptions = {
  from: 'email pengirim',
  to: 'email tujuan',
  subject: 'testing',
  text: params.toString()
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
}

app.all("*", function (req, res, next) {
  return res.send('page not found');
  next();
});

module.exports = app;