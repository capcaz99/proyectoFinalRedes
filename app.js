var express       		  = require("express"),
    request               = require("request"),
    http                  = require('http'),
	app 				  = express();
	
app.set("view engine", "ejs");
app.use(express.static("public"));


//--------------------------------------------------------------
//RUTAS
//--------------------------------------------------------------

var headersOpt = {  
    "content-type": "application/json",
};


app.get("/", function(req, res){
    res.render("home",{val:0, text:':', check:'checked'});
});


app.post("/temperature/:value", function(req,res){
    var estado;
     if(req.params.value == "1")
         estado = 'unchecked';
         
    else
        estado = 'checked';
        
    console.log("Voy a pedir la temperatura");
    request('http://148.205.176.167:1026/v2/entities/laboratorioQuimica/attrs/temperature/value', function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.
        res.render("home",{val:body, text:'Temperatura: ', check:estado});
    });
});
  

app.post("/humidity/:value", function(req,res){
    var estado;
    if(req.params.value == "1")
        estado = 'unchecked'; 
    else
        estado = 'checked';
        
        
    
    console.log("Voy a pedir la humedad");
    request('http://148.205.176.167:1026/v2/entities/laboratorioQuimica/attrs/humidity/value', function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('body:', body); // Print the HTML for the Google homepage.
        res.render("home",{val:body, text:'Humedad: ', check:estado});
        });
});

app.post("/switch/:value/:text/:check", function(req, res) {
    var valor = req.params.check;
    var estado;
    console.log("valor: "+valor);
    console.log(valor == "1");
    if(valor == "1"){
        valor = 1;
        estado = 'checked';
         
    }
    else{
        valor = 0;
        estado = 'unchecked';
       
    }
    request({url:'http://148.205.176.167:1026/v2/entities/laboratorioQuimica/attrs/state', 
            method: 'PUT',
            json: {value: valor}}, 
            function(err){
       if(err){
           console.log("Error");
       }else{
           res.render("home",{val:req.params.value, text: req.params.text, check:estado});
       } 
    })
})

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started");
});
