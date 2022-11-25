var express = require('express');
var path = require('path');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/',function(req,res){
  res.render('home');
});
app.get('/registration',function(req,res){
  res.render('registration');
});
//home page
app.get('/hiking',function(req,res){
  res.render('hiking');
});
app.get('/cities',function(req,res){
  res.render('cities');
});
app.get('/islands',function(req,res){
  res.render('islands');
});
//hiking page
app.get('/inca',function(req,res){
  res.render('inca');
});
app.get('/annapurna',function(req,res){
  res.render('annapurna');
});
//cities page
app.get('/paris',function(req,res){
  res.render('paris');
});
app.get('/rome',function(req,res){
  res.render('rome');
});
//islands page
app.get('/bali',function(req,res){
  res.render('bali');
});
app.get('/santorini',function(req,res){
  res.render('santorini');
});

const port =3000;
if(procoss.env.PORT){
  app.listen(procoss.env.PORT , function (){
    console.log("server running"); 
    console.log(`running on localhost: ${procoss.env.PORT}`);
  });
}
else{
  app.listen(port , function (){
    console.log("server running"); 
    console.log(`running on localhost: ${port}`);
  });
}

