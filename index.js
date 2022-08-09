// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


app.get("/api/:date?", function (req, res) {
  let responseDate = new Date()
  let currentDate = new Date()

  //has input date
  if(req.params.date){
    let unixDate = +req.params.date;
    let responseDate;

    //check validity and update response
    if(isNaN(unixDate)){
      responseDate = new Date(req.params.date)
    }
    else{
      responseDate = new Date(unixDate)
    }
    if(isNaN(responseDate)){
      return res.json({ error : "Invalid Date" })
    }
    if(!(responseDate instanceof Date)){
      return res.json({ error : "Invalid Date" })
    }
    
    return res.json({unix: responseDate.getTime(), utc:responseDate.toUTCString()});
  }  
  return res.json({unix: currentDate.getTime(), utc:currentDate.toUTCString()});
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
