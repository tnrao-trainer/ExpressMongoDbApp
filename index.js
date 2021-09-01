var express = require('express');
var deptModel = require("./Models/deptModel");
var deptsController = require("./Controllers/deptsController");

 
var app=express();
// app.use(deptsController);

// Add route prefix
app.use("/depts", deptsController);

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(express.static('public'))

app.set("view engine", "ejs");
app.set('views', __dirname + '/Views');
 
app.get('/',function(req,res)
{ 
    res.render(__dirname + "/Views/home.ejs"); 
});


var server=app.listen(3002,function() {});
 
console.log("Server Started. URL:http://localhost:3002");
