require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');
const mailchimp = require('@mailchimp/mailchimp_marketing');

const app = express();
app.use(express.static('public')); // allows server to find static files
app.use(bodyParser.urlencoded({
  extended: true
}));

const listId = 'b07638c29c';

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: 'us6',
});

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.post('/', function(req, res) {
  console.log(req.body);
  const emailAddress = req.body.emailAddress;
  const subscribingUser = {
    email: emailAddress,
  }

async function run() {
  try {
    const response = await mailchimp.lists.addListMember(listId, {
      email_address: subscribingUser.email,
      status: 'subscribed',
      // merge_fields would go here
    });
    console.log(
      `Successfully added contact as an audience member. The contact's id is ${response.id}.`
    );
    res.sendFile(__dirname + '/success.html');
  } catch (error) {
    console.log(error);
    res.sendFile(__dirname + '/failure.html');
  }
}



});

run();

// failure route for the Try Again button
app.post('/failure', function(req, res) {
  res.redirect('/'); // redirect back to root
});

app.listen(process.env.PORT || 3000, function() {
  console.log('Server running.')
})





// ORIGINAL - PASTE UNDER app.get(....... res.sendFile(....'/index.html'))
// app.post('/', function(req, res) {
//   const email = req.body.userEmail;
//
//   // need to match what MailChimp wants (this is JS)
//   const data = {
//     members: [{
//       email_address: email,
//       status: 'subscribed'
//     }]
//   }
//
//   const jsonData = JSON.stringify(data); // turn JS object into JSON
//
//   // from main MailChimp endpoint - find in API docs
//   url = process.env.MAILCHIMP_URI
//   // url = 'https://us6.api.mailchimp.com/3.0/lists/' + process.env.MAILCHIMP_LIST_ID; // append 'lists' and list ID
//
//   const options = {
//     method: 'POST',
//     auth: 'kyra_nank:' + process.env.MAILCHIMP_API_KEY // any username, and my api key
//   }
//
//   // response will be from MailChimp
//   const request = https.request(url, options, function(response) {
//
//     response.on('data', function(data) {
//
//       if (response.statusCode === 200 && JSON.parse(data).errors[0] === undefined) {
//         res.sendFile(__dirname + '/success.html');
//       } else {
//         res.sendFile(__dirname + '/failure.html');
//       }
//       // console.log(JSON.parse(data).errors[0].error);
//       console.log(JSON.parse(data));
//     });
//   });
//
//   // pass JSON data to the MailChimp data
//   request.write(jsonData);
//   request.end();
//
// });
