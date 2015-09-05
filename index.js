//Lets require/import the HTTP module
var http = require('http');
/**
 * Created by Ben on 05/09/2015.
 */
//We need a function which handles requests and send response
var Pusher = require('pusher');

var LocationReporter = require('./locationProviderCsv')

var express = require('express');
var bodyParser = require('body-parser');

//Lets define a port we want to listen to
//const PORT=80;
//function handleRequest(request, response){
//    response.end('It Works!! Path Hit: ' + request.url);
//}


//Create a server
//var server = http.createServer(handleRequest);

var pusher = new Pusher({
    appId: '140197',
    key: 'a7fb12c2db518495aeb4',
    secret: 'a0b8176897022b4d61b0',
    encrypted: true
});
pusher.port = 443;

pusher.trigger('presence-all', 'client-all', {
    "message": "Server up."
});

////Lets start our server
//server.listen(PORT, function(){
//    //Callback triggered when server is successfully listening. Hurray!
//    console.log("Server listening on: http://localhost:%s", PORT);
//});

var location = new LocationReporter()
location.on('location', function () {
    pusher.trigger('flight', 'location', location.latlng);
    if(location.i % 10 == 2) {
        pusher.trigger('flight', 'message', {
            "message": "Look out of the left window at the Eiffel tower!!"
        });
    } else if(location.i % 10 == 7) {
        pusher.trigger('flight', 'message', {
            "message": "The pilot is asleep LOLOLOL!!"
        });
    } else if(location.i == 38) {
        pusher.trigger('flight', 'message', {
            "message": "Welcome to EGYPT!!"
        });
    } else if(location.i == 85) {
        pusher.trigger('flight', 'message', {
            "message": "Please turn on flight mode for final descent!!"
        });
    } else if (location.i == 350) {
        process.exit(0)
    }
    console.log(location.i)
})

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/pusher/auth', function(req, res) {
    var socketId = req.body.socket_id;
    var channel = req.body.channel_name;
    var presenceData = {
        user_id: 'uid' + Math.random()
    };
    var auth = pusher.authenticate(socketId, channel, presenceData);
    res.send(auth);
});

app.use('/static', express.static('./'));

var port = 80;
app.listen(port);