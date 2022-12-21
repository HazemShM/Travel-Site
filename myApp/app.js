const express = require('express');
const path = require('path');
const app = express();
//express Session
const session = require('express-session');
//Popups
const flash = require('connect-flash');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ secret: "abcdefghazem1234", resave: false, saveUninitialized: false }));
app.use(flash());


//Home Page
app.get('/home', function (req, res) {
  // console.log(req.session.user);
  console.log('I am in Home');
  if (!req.session.user) {

    req.flash("error", "Please Login First");
    res.redirect('/');
    //return res.status(401).send();
  } else {
    res.render('home');
  }
});

app.get('/hiking', function (req, res) {
  console.log('I am in Hiking');
  if (!req.session.user) {
    req.flash("error", "Please Login First");
    res.redirect('/');
    //return res.status(401).send();
  } else {
    res.render('hiking');
  }
});
app.get('/cities', function (req, res) {
  console.log('I am in cities');
  if (!req.session.user) {
    req.flash("error", "Please Login First");
    res.redirect('/');
    //return res.status(401).send();
  } else {
    res.render('cities');
  }
});
app.get('/islands', function (req, res) {
  console.log('I am in islands');
  if (!req.session.user) {
    req.flash("error", "Please Login First");
    res.redirect('/');
  } else {
    res.render('islands');
  }
});
//hiking page
app.get('/inca', function (req, res) {
  console.log('I am in inca');
  if (!req.session.user) {
    req.flash("error", "Please Login First");
    res.redirect('/');
    //return res.status(401).send();
  } else {
    res.render('inca');
  }

});
app.get('/annapurna', function (req, res) {
  console.log('I am in annapurna');
  if (!req.session.user) {
    req.flash("error", "Please Login First");
    res.redirect('/');
    //return res.status(401).send();
  } else {
    res.render('annapurna');
  }

});

app.get('/paris', function (req, res) {
  console.log('I am in paris');
  if (!req.session.user) {
    req.flash("error", "Please Login First");
    res.redirect('/');
  } else {
    res.render('paris');
  }

});
app.get('/rome', function (req, res) {
  console.log('I am in rome');
  if (!req.session.user) {
    req.flash("error", "Please Login First");
    res.redirect('/');
  } else {
    res.render('rome');
  }

});

app.get('/bali', function (req, res) {
  console.log('I am in bali');
  if (!req.session.user) {
    req.flash("error", "Please Login First");
    res.redirect('/');

  } else {
    res.render('bali');
  }
});
app.get('/santorini', function (req, res) {
  console.log('I am in santorini');
  if (!req.session.user) {
    req.flash("error", "Please Login First");
    res.redirect('/');
    //return res.status(401).send();
  } else {
    res.render('santorini');
  }

});
//want to go list
app.get('/wanttogo', function (req, res) {
  console.log('I am in wanttogo');
  if (!req.session.user) {
    req.flash("error", "Please Login First");
    res.redirect('/');
    //return res.status(401).send();
  } else {
    res.render('wanttogo');
  }

});

//Main Page
app.get('/', function (req, res) {
  const success = req.flash('success');
  const error = req.flash('error');
  console.log('I am in /');
  res.render('login', { success, error });

});
app.get('/login', function (req, res) {
  console.log('I am in Login');
  res.redirect('/');
});
app.get('/registration', function (req, res) {
  const success = req.flash('success');
  const error = req.flash('error');
  console.log('I am in registration');
  res.render('registration', { success, error });
});

//Register
app.get('/Register', function (req, res) {
  console.log('I am in register');
  res.redirect('/Registration');
});

//setting up the server
const port = 3000;

app.listen(port, function () {
  console.log("server running");
  console.log(`running on localhost: ${port}`);
});

//Mongo Database
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://127.0.0.1/";
const dbName = "myDB";
const collection = "myCollection";
MongoClient.connect(`${url}${dbName}`, function (err, db) {
  console.log("Connected to database");
  db.close();
});

function getCLient() {
  return new MongoClient(url);
}

function createCollection(collectionName) {
  getCLient().connect(function (err, db) {
    if (err) throw err;
    let currentDB = db.db(dbName);
    currentDB.listCollections({ name: collectionName }).next(function (err, collectionInfo) {
      if (collectionInfo) {
        console.log(`Collection with the name ${collectionName} already exists`);
        db.close();
      } else {
        currentDB.createCollection(collectionName, function (err, res) {

          console.log(`Collection created with the name ${collectionName}`);
          db.close();
        });
      }
    });

  });
}
createCollection(collection);
// function deleteCollection(collectionName){
//   getCLient().connect(function(err,db){
//     if(err) throw err;
//     let currentDB =db.db(dbName);
//     currentDB.listCollections({name: collectionName}).next(function(err, collectionInfo){
//       if(collectionInfo){
//         currentDB.collection(collectionName).drop(function(err,res){
//           console.log(`Collection with the name ${collectionName} was deleted Successfully` );
//           db.close();
//         });

//       }else{
//         console.log(`Collection with the name ${collectionName} doesn't exist`);
//         db.close();
//       }
//     });

//   });
// }

// // }
// function deleteDocument(collectionName,document){
//   try{
//     getCLient().connect(function(err,db){

//       let currentDB =db.db(dbName);
//       currentDB.listCollections({name: collectionName}).next(function(err, collectionInfo){
//         if(collectionInfo){
//          currentDB.collection(collectionName).deleteOne(document,function(){
//           console.log(`Document ${document} was successfully deleted`);
//           db.close();
//          });
//         }else{
//           console.log(`Collection ${collectionName} doesn't exist`);
//           db.close();
//         }
//       });

//     });
//   }catch(err){
//     console.log(`Error: ${err}`);
//   }
// }

app.post('/Register', function (req, res) {
  const data = req.body;
  const document = { username: data.username, password: data.password, wanttogo: [] };
  let tempUser = '';
  let tempPass = '';
  for (let i = 0; i < data.username.length || i < data.password.length; i++) {
    if (i < data.username.length && data.username.charAt(i) != ' ') {
      tempUser += data.username.charAt(i);
    }
    if (i < data.password.length && data.password.charAt(i) != ' ') {
      tempPass += data.password.charAt(i);
    }
  }
  if (tempUser == '' || tempPass == '') {
    req.flash("error", "Please Enter a non Empty Username and Password");
    res.redirect('/registration');
  } else {
    try {
      getCLient().connect(async function (err, db) {
        let currentDB = db.db(dbName);
        currentDB.listCollections({ name: collection }).next(async function (err, collectionInfo) {
          if (collectionInfo) {

            let user = await currentDB.collection(collection).countDocuments({ username: document.username });
            console.log(await user);
            if (await user == 0 & document.username != 'admin') {

              currentDB.collection(collection).insertOne(document, function () {
                console.log(`Document  Inserted`);

                db.close();
              });
              console.log('I am in Register and finished registering');
              res.redirect('/');
            } else {

              console.log("User already exists");
              db.close();
              req.flash("error", "Please Enter a Different Username");
              res.redirect('/registration');

            }

          } else {
            console.log(`Collection ${collection} doesn't exist`);
            db.close();
          }

        });

      });
    } catch (err) {
      console.log(`Error: ${err}`);
    }
    // if(==true){
    //   res.redirect( '/');
    // }else{
    //   res.redirect('/registration');
    // };
  }

});

app.post('/', function (req, res) {
  const data = req.body;
  const user = { username: data.username, password: data.password, wanttogo: data.wanttogo };
  if (data.username == 'admin') {
    if (data.password != 'admin') {
      console.log('Wrong Password');
    } else {
      console.log("Logged in successfully");
      req.session.user = user;
      res.redirect('/home');
    }
  } else {
    getCLient().connect(async function (err, db) {
      if (err) throw err;
      let currentDB = db.db(dbName);
      let usernameFound = await currentDB.collection(collection).countDocuments({ username: user.username });
      if (await usernameFound == 0) {
        console.log('This username is not registered');
      } else {
        let correctPassword = await currentDB.collection(collection).countDocuments({ username: user.username, password: user.password });
        if (await correctPassword == 0) {
          console.log('Wrong Password');
        } else {
          console.log("Logged in successfully");
          req.session.user = user;
          res.redirect('/home');

        }
      }
      db.close();

    });
  }

});
app.post('/bali', function (req, res) {
  let user = req.session.user;
  let flag = false;
  for (let i = 0; i < user.wanttogo.length; i++) {
    if (wanttogo[i] == 'bali') {
      flag = true;
    }
  }
  if (flag) {
    console.log('already exists in the wanttogo list');
  } else {
    getCLient().connect(function (err, db) {
      if (err) throw err;
      let currentDB = db.db(dbName);
      currentDB.collection(collection).updateOne({ username: user.username }, { $push: { wanttogo: 'bali' } });
      console.log('added bali to wanttogo list')
      db.close();
    });
    req.session.user.wanttogo.push('bali');
  }
});