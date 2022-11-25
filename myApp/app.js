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

  app.listen(port , function (){
    console.log("server running"); 
    console.log(`running on localhost: ${port}`);
  });

//Mongo Database
const MongoClient =require('mongodb').MongoClient;
const url ="mongodb://127.0.0.1/";
const dbName="db";
MongoClient.connect(`${url}${dbName}`, function(err,db){
  console.log("Connected to database")
  db.close();
});  

function getCLient(){
  return new MongoClient(url);
}

function createCollection(collectionName){
  getCLient().connect(function(err,db){
    if(err) throw err;
    let currentDB =db.db(dbName);
    currentDB.listCollections({name: collectionName}).next(function(err, collectionInfo){
      if(collectionInfo){
        console.log(`Collection with the name ${collectionName} already exists` );
        db.close();
      }else{
        currentDB.createCollection(collectionName,function(err,res){
          
          console.log(`Collection created with the name ${collectionName}`);
          db.close();
        });
      }
    });
    
  });
}
createCollection("Accounts");
function deleteCollection(collectionName){
  getCLient().connect(function(err,db){
    if(err) throw err;
    let currentDB =db.db(dbName);
    currentDB.listCollections({name: collectionName}).next(function(err, collectionInfo){
      if(collectionInfo){
        currentDB.collection(collectionName).drop(function(err,res){
          console.log(`Collection with the name ${collectionName} was deleted Successfully` );
          db.close();
        });
        
      }else{
        console.log(`Collection with the name ${collectionName} doesn't exist`);
        db.close();
      }
    });
    
  });
}
function addDocument(collectionName,document){
  try{
    getCLient().connect(async function(err,db){
      
      let currentDB =db.db(dbName);
      currentDB.listCollections({name: collectionName}).next(async function(err, collectionInfo){
        if(collectionInfo){
         
          let user=await currentDB.collection(collectionName).countDocuments({id:document.id});
          console.log(await user);
          if(await user==0){
            currentDB.collection(collectionName).insertOne(document,function(){
              console.log(`Document  Inserted`);
              db.close();
            });
          }else{
            console.log("User already exists");
            db.close();
          }
          
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
function deleteDocument(collectionName,document){
  try{
    getCLient().connect(function(err,db){
      
      let currentDB =db.db(dbName);
      currentDB.listCollections({name: collectionName}).next(function(err, collectionInfo){
        if(collectionInfo){
         currentDB.collection(collectionName).deleteOne(document,function(){
          console.log(`Document ${document} was successfully deleted`);
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

app.post('/Register',function(req,res){
  const data = req.body;
  const user = {id:data.username,pass:data.password,list:[]};
  addDocument("Accounts",user);
  res.render('login');
});
app.post('/Register',function(req,res){
  const data = req.body;
  let result = space
  const user = {id:data.username,pass:data.password,list:[]};
  addDocument("Accounts",user);
  res.render('login');
});