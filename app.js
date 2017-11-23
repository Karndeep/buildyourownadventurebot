var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var twilio = require('twilio');

var oConnections = {};

// Define the port to run on
app.set('port', process.env.PORT || parseInt(process.argv.pop()) || 5100);

// Define the Document Root path
var sPath = path.join(__dirname, '.');

app.use(express.static(sPath));
app.use(bodyParser.urlencoded({ extended: true }));

function fEnd(req, res){
  var sFrom = req.body.From;
  var twiml = new twilio.twiml.MessagingResponse();
  twiml.message('Meh if you want to talk to me again we can start all over!');
  oConnections[sFrom].fCurState = fBeginning;
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
}

function fEndRon(req, res){
  var sFrom = req.body.From;
  var sAction = req.body.Body;
  var twiml = new twilio.twiml.MessagingResponse();
  if(sAction.toLowerCase().search("yes") != -1){
    twiml.message("Damn some random team then eh! Nice talk!");
    oConnections[sFrom].fCurState = fBeginning;
  }else if(sAction.toLowerCase().search("no") != -1){
    twiml.message("Hard for someone to stay loyal but Meh nice talk?");
    oConnections[sFrom].fCurState = fBeginning;
  }else{
    twiml.message("We didn't understand you please try again")
    oConnections[sFrom].fCurState = fEndRon;    
  }
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
}

function fEndMes(req, res){
  var sFrom = req.body.From;
  var sAction = req.body.Body;
  var twiml = new twilio.twiml.MessagingResponse();
  if(sAction.toLowerCase().search("yes") != -1){
    twiml.message("Damn some random team then eh! Nice talk!");
    oConnections[sFrom].fCurState = fBeginning;
  }else if(sAction.toLowerCase().search("no") != -1){
    twiml.message("Hard for someone to stay loyal but Meh nice talk?");
    oConnections[sFrom].fCurState = fBeginning;
  }else{
    twiml.message("We didn't understand you please try again")
    oConnections[sFrom].fCurState = fEndMes;    
  }
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
}

function fNewTeamRon(req, res){
  var sFrom = req.body.From;
  var sAction = req.body.Body;
  var twiml = new twilio.twiml.MessagingResponse();
  if(sAction.toLowerCase().search("psg") != -1){
    twiml.message("Wow I hope he goes to PSG too! Great Talk!");
    oConnections[sFrom].fCurState = fBeginning;
  }else if(sAction.toLowerCase().search("nap") != -1){
    twiml.message("Wow I hope he goes to NAP too! Great Talk!");
    oConnections[sFrom].fCurState = fBeginning;
  }else{
    twiml.message("We didn't understand you please try again")
    oConnections[sFrom].fCurState = fNewTeamRon;    
  }
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
}

function fNewTeamMes(req, res){
  var sFrom = req.body.From;
  var sAction = req.body.Body;
  var twiml = new twilio.twiml.MessagingResponse();
  if(sAction.toLowerCase().search("chelsea") != -1){
    twiml.message("Wow I hope he goes to chelsea too! Great Talk!");
    oConnections[sFrom].fCurState = fBeginning;
  }else if(sAction.toLowerCase().search("man city") != -1){
    twiml.message("Wow I hope he goes to man city too! Great Talk!");
    oConnections[sFrom].fCurState = fBeginning;
  }else{
    twiml.message("We didn't understand you please try again")
    oConnections[sFrom].fCurState = fNewTeamMes;    
  }
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
}

function fRon(req, res){
  var sFrom = req.body.From;
  var sAction = req.body.Body;
  var twiml = new twilio.twiml.MessagingResponse();
  if(sAction.toLowerCase().search("yes") != -1){
    twiml.message("Which team PSG or NAP?");
    oConnections[sFrom].fCurState = fNewTeamRon;
  }else if(sAction.toLowerCase().search("no") != -1){
    twiml.message("You think he will stay loyal forever? Yes or no");
    oConnections[sFrom].fCurState = fEndRon;
  }else{
    twiml.message("We didn't understand you please try again")
    oConnections[sFrom].fCurState = fRon;    
  }
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
}

function fMes(req, res){
  var sFrom = req.body.From;
  var sAction = req.body.Body;
  var twiml = new twilio.twiml.MessagingResponse();
  if(sAction.toLowerCase().search("yes") != -1){
    twiml.message("Which team chelsea or Man city?");
    oConnections[sFrom].fCurState = fNewTeamMes;
  }else if(sAction.toLowerCase().search("no") != -1){
    twiml.message("You think he will stay loyal forever? Yes or no");
    oConnections[sFrom].fCurState = fEndMes;
  }else{
    twiml.message("We didn't understand you please try again")
    oConnections[sFrom].fCurState = fMes;    
  }
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
}


function fMesOrRon(req, res){
  var sFrom = req.body.From;
  var sAction = req.body.Body;
  var twiml = new twilio.twiml.MessagingResponse();
  if(sAction.toLowerCase().search("messi") != -1){
    twiml.message("Cool messi is the greatest ever! Do you think he will ever move his current team? Yes or No");
    oConnections[sFrom].fCurState = fMes;
  }else if(sAction.toLowerCase().search("ronaldo") != -1){
    twiml.message("Cool ronaldo is the greatest ever! Do you think he will ever move his current team? Yes or No");
    oConnections[sFrom].fCurState = fRon;
  }else{
    twiml.message("We didn't understand you please try again")
    oConnections[sFrom].fCurState = fMesOrRon;    
  }
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
}

function fSoccer(req, res){
  var sFrom = req.body.From;
  var sAction = req.body.Body;
  var twiml = new twilio.twiml.MessagingResponse();
  if(sAction.toLowerCase().search("yes") != -1){
    twiml.message("Great messi or ronaldo?");
    oConnections[sFrom].fCurState = fMesOrRon;
  }else if(sAction.toLowerCase().search("no") != -1){
    twiml.message("Soccer hater? Cant talk anymore, Was I a good talker?");
    oConnections[sFrom].fCurState = fEnd;
  }else{
    twiml.message("We didn't understand you please try again")
    oConnections[sFrom].fCurState = fSoccer;    
  }
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
}

function fGoodOrBad(req, res){
  var sFrom = req.body.From;
  var sAction = req.body.Body;
  var twiml = new twilio.twiml.MessagingResponse();
  if(sAction.toLowerCase().search("good") != -1){
    twiml.message("Great to hear do you like soccer, Yes or no?");
    oConnections[sFrom].fCurState = fSoccer;
  }else if(sAction.toLowerCase().search("bad") != -1){  
    twiml.message(":( feelsbadman, Was I a good talker?");
    oConnections[sFrom].fCurState = fEnd;
  }else  {
    twiml.message("We didn't understand you please try again")
    oConnections[sFrom].fCurState = fGoodOrBad;
  }
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
}

function fBeginning(req, res){
  var sFrom = req.body.From;
  oConnections[sFrom].fCurState = fGoodOrBad;
  var twiml = new twilio.twiml.MessagingResponse();
  twiml.message('Hi ... My name is Karn. How is your day Good or Bad?');
  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());

}

//define a method for the twilio webhook
app.post('/sms', function(req, res) {
  var sFrom = req.body.From;
  if(!oConnections.hasOwnProperty(sFrom)){
    oConnections[sFrom] = {"fCurState":fBeginning};
  }
  oConnections[sFrom].fCurState(req, res);
});

// Listen for requests
var server = app.listen(app.get('port'), () =>{
  var port = server.address().port;
  console.log('Listening on localhost:' + port);
  console.log("Document Root is " + sPath);
});
