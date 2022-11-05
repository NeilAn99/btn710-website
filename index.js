const Sequelize = require('sequelize');
const { QueryTypes } = require('sequelize');
var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var HTTP_PORT = process.env.PORT || 8080;
var hash;
bcrypt.hash("btn710@G#", 10).then(hasht=>{ // Hash the password using a Salt that was generated using 10 rounds
    // TODO: Store the resulting "hash" value in the DB
    console.log(hasht);
    hash = hasht;
})
.catch(err=>{
    console.log(err); // Show any errors that occurred during the process
});

// set up sequelize to point to our postgres database
var sequelize = new Sequelize('aqoqzwdx', 'aqoqzwdx', 'NjkY89I5Rvmp-S-M4sGWW3sOLIDpHvbR', {
    host: 'peanut.db.elephantsql.com',
    dialect: 'postgres',
    port: 5432,
    dialectOptions: {
        ssl: { rejectUnauthorized: false }
    },
    query: { raw: true }
});


var User = sequelize.define('User', {
    username: Sequelize.STRING,
    password: Sequelize.STRING,
    email: Sequelize.STRING
});

sequelize.sync().then(function () {

});
// call this function after the http server starts listening for requests
function onHttpStart() {
    console.log("Express http server listening on: " + HTTP_PORT);
  }
  
  // setup a 'route' to listen on the default url path (http://localhost)
  app.get('/', function(req,res){
        res.sendFile(path.join(__dirname,"/login.html"));
  });
  
  // setup another route to listen on /about
  app.post('/home', function(req,res) {
    var formData = req.body;
    console.log(formData);
    bcrypt.compare(req.body.password, hash).then((result) => {
        // result === true
        if (result === true)
        {
            res.send(`<!doctype html>
            <html>
            
            <head>
              <title>BTN710 Group 1</title>
            </head>
            <style>
                * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
              -webkit-font-smoothing: antialiased;
            }
            
            body {
              background: #e35869;
              font-family: 'Rubik', sans-serif;
            }
            
            .login-form {
              background: #fff;
              width: 500px;
              margin: 65px auto;
              display: -webkit-box;
              display: flex;
              -webkit-box-orient: vertical;
              -webkit-box-direction: normal;
                      flex-direction: column;
              border-radius: 4px;
              box-shadow: 0 2px 25px rgba(0, 0, 0, 0.2);
            }
            .login-form h1 {
              padding: 35px 35px 0 35px;
              font-weight: 300;
            }
            .login-form .content {
              padding: 35px;
              text-align: center;
            }
            .login-form .input-field {
              padding: 12px 5px;
            }
            .login-form .input-field input {
              font-size: 16px;
              display: block;
              font-family: 'Rubik', sans-serif;
              width: 100%;
              padding: 10px 1px;
              border: 0;
              border-bottom: 1px solid #747474;
              outline: none;
              -webkit-transition: all .2s;
              transition: all .2s;
            }
            .login-form .input-field input::-webkit-input-placeholder {
              text-transform: uppercase;
            }
            .login-form .input-field input::-moz-placeholder {
              text-transform: uppercase;
            }
            .login-form .input-field input:-ms-input-placeholder {
              text-transform: uppercase;
            }
            .login-form .input-field input::-ms-input-placeholder {
              text-transform: uppercase;
            }
            .login-form .input-field input::placeholder {
              text-transform: uppercase;
            }
            .login-form .input-field input:focus {
              border-color: #222;
            }
            .login-form a.link {
              text-decoration: none;
              color: #747474;
              letter-spacing: 0.2px;
              text-transform: uppercase;
              display: inline-block;
              margin-top: 20px;
            }
            .login-form .action {
              display: -webkit-box;
              display: flex;
              -webkit-box-orient: horizontal;
              -webkit-box-direction: normal;
                      flex-direction: row;
            }
            .login-form .action button {
              width: 100%;
              border: none;
              padding: 18px;
              font-family: 'Rubik', sans-serif;
              cursor: pointer;
              text-transform: uppercase;
              background: #e8e9ec;
              color: #777;
              border-bottom-left-radius: 4px;
              border-bottom-right-radius: 0;
              letter-spacing: 0.2px;
              outline: 0;
              -webkit-transition: all .3s;
              transition: all .3s;
            }
            .login-form .action button:hover {
              background: #d8d8d8;
            }
            .login-form .action button:nth-child(2) {
              background: #2d3b55;
              color: #fff;
              border-bottom-left-radius: 0;
              border-bottom-right-radius: 4px;
            }
            .login-form .action button:nth-child(2):hover {
              background: #3c4d6d;
            }
            </style>
            <body">
                <div class="login-form">
                    <h1>BTN710 Group 1 Artifacts</h1>
                    <div class="content">
                        <ul><a href="/download">Report</a></ul>
                        <ul><a href="/">Video</a></ul>
                    </div>
                </div>
            
            </body>
            </html>
    `);
        }
    });
  });
  
app.get('/download', function(req, res){
    const file = `${__dirname}/BTN710 Deliverable 2 - Group 1.pdf`;
    res.download(file); // Set disposition and send it.
});

  // setup http server to listen on HTTP_PORT
  app.listen(HTTP_PORT, onHttpStart);