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
  res.render('login');
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
//Mongo Database
import {MongoClient} from "mongodb";

const url ="mongodb://localhost:27017/";

const dbName = "db";
const dbUrl =`${url}${dbName}`;
MongoClient.connect(dbUrl, function(err,db){
  console.log("Connected to database")
  db.close();
});  

function createCollection(collectionName){
  url.connect(function(err,db){
    if(err) throw err;
    let currentDB =db.db(dbName);
    currentDB.listCollections({name: collectionName}).next(function(err, collectionInfo){
      if(collectionInfo){
        console.log(`Collection with the name ${collectionName} already exists` );
        db.close();
      }else{
        currentDB.createCollection(collectionName,function(err,res){
          if(err) throw err;
          console.log(`Collection created with the name ${collectionName}`);
          db.close();
        })
      }
    });
    
  });
}
function addDocument(collectionName,document){
  try{
    url.connect(function(err,db){
      if(err) throw err;
      let currentDB =db.db(dbName);
      currentDB.listCollections({name: collectionName}).next(function(err, collectionInfo){
        if(collectionInfo){
          currentDB.collection(collectionName).insertOne(document,function(){
            console.log(`Document ${document} Inserted`);
            db.close();
          });
        }else{
          console.log(`Collection ${collectionName} doesn't exist`);
          db.close();
        }
      });
      
    });
  }catch(err){
    console.log(`Error: ${err}`);
  }
}


createCollection("db","Accounts");
