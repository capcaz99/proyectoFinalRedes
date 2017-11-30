var express       		  = require("express"),
    request               = require("request"),
    http                  = require('http'),
	app 				  = express();
	
app.set("view engine", "ejs");
app.use(express.static("public"));

var options = {
  path: '/v2/entities/Med025/attrs/voltage/value'
};
//--------------------------------------------------------------
//RUTAS
//--------------------------------------------------------------

app.get("/", function(req, res){
    res.render("home",{val:0, text:''});
});


app.post("/temperature", function(req,res){
    request('http://148.205.176.167:1026/v2/entities/Med025/attrs/voltage/value', function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.
        res.render("home",{val:body, text:'Temp:'});
    });
    
  

    
    
  });
  

app.post("/humidity", function(req,res){
    request('http://148.205.176.167:1026/v2/entities/Med025/attrs/frequency/value', function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.
        res.render("home",{val:body, text:'Hum:'});
        });
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started");
});
