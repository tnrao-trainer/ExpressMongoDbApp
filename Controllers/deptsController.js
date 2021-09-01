var express = require('express');
var deptModel = require("../Models/deptModel");
var path = require('path');

let router = express.Router();
var app=express();
const viewFolderPath = path.resolve('Views');

router.use(express.json());
router.use(express.urlencoded({
  extended: true
}));

router.get('/ShowDepts',function(req,res)
{     
    var data = {}; 	
    deptModel.find({}, function(err, resData) 
	{
		if(err)	 {    
			console.log(err); 
			return; 
        }
		       
		var str  = viewFolderPath + "/list.ejs"; 
		data.deptsArray =  resData;       
		res.render(str, data);		
	});
});

router.get('/details/:id',function(req,res)
{
    var data = {}; 	
    deptModel.findOne({"deptno":req.params.id}, function(err, resData) 
	{
		if(err)	 {    
			console.log(err); 
			return; 
        }
		       
		var str  = viewFolderPath + "/details.ejs"; 
		data.deptObj =  resData;       
		res.render(str, data);		
	});
});

router.get('/create',function(req,res)
{	 
    res.render( viewFolderPath + "/create.ejs");
});

router.post('/create',function(req,res)
{	 
   // New Object for Dept Model Object
	var deptObj  = new  deptModel({ 
		deptno : parseInt(req.body.txtDeptno),	
		dname  :  req.body.txtDname,
		loc   : req.body.txtLoc  });
	 
	deptObj.save(function(err) 
	{
		if(err)	 {  console.log(err); return; }		
		console.log("Record inserted in Database");
		res.redirect("/depts/ShowDepts");	
	});
});


router.get('/delete/:id',function(req,res)
{
    var data = {}; 	
    deptModel.findOneAndRemove({"deptno":req.params.id}, function(err) 
	{
		if(err)	 {    
			console.log(err); 
			return; 
        }

		res.redirect("/depts/ShowDepts");
	});
});


router.get('/edit/:id',function(req,res)
{
    var data = {}; 	
    deptModel.findOne({"deptno":req.params.id}, function(err, resData) 
	{
		if(err)	 {    
			console.log(err); 
			return; 
        }
		       
		var str  = viewFolderPath + "/edit.ejs"; 
		data.deptObj =  resData;       
		res.render(str, data);		
	});
});


router.post('/edit',function(req,res)
{	 
   // new object
	var deptObj  = { 
		deptno : parseInt(req.body.txtDeptno),	
		dname  :  req.body.txtDname,
		loc   : req.body.txtLoc  };
	 
    deptModel.findOneAndUpdate({ deptno: deptObj.deptno }, deptObj, function(err) 
	{
		if(err)	 {  console.log(err); return; }		
		console.log("Record inserted in Database");
		res.redirect("/depts/ShowDepts");	
	});
});


module.exports = router;