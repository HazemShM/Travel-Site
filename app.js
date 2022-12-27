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

app.use(session({ secret: "abcdefghazem1234", resave: false, saveUninitialized: true }));
app.use(flash());

//admin wanttogo list
let adminList =[];

//setting up the server
const port = process.env.PORT || 3824;

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

//check if user is logged in method

function requireLogin(req, res, next) {
  if (!req.session.user) {
    req.flash('error', 'Please login first');
    res.redirect('/');
  } else {
    next();
  }
};
//Login Page
app.get('/', function (req, res) {
  const success = req.flash('success');
  const error = req.flash('error');
  res.render('login', { success, error });
});

app.get('/login', function (req, res) {
  res.redirect('/');
});

app.post('/', function (req, res) {
  const data = req.body;
  const user = { username: data.username, password: data.password };
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
    req.flash("error", "Please Enter Correct Username and Password");
    res.redirect('/');
  } else {
    if (data.username == 'admin') {
      if (data.password != 'admin') {
        req.flash("error", "Wrong Password");
        res.redirect('/');
      } else {
        req.session.user = { username: data.username, password: data.password , wanttogo: adminList };
        res.redirect('/home');
      }
    } else {
      getCLient().connect(async function (err, db) {
        if (err) throw err;
        let currentDB = db.db(dbName);
        let usernameFound = await currentDB.collection(collection).countDocuments({ username: user.username });
        if (await usernameFound == 0) {
          req.flash("error", "This username is not registered");
          res.redirect('/');
        } else {
          let correctPassword = await currentDB.collection(collection).countDocuments({ username: user.username, password: user.password });
          if (await correctPassword == 0) {
            req.flash("error", "Wrong Password");
            res.redirect('/');
          }else {
            await currentDB.collection(collection).findOne(user, function(err, doc){
              if (err) throw err;
              const wanttogo = doc.wanttogo
              req.session.user = { username: data.username, password: data.password , wanttogo: wanttogo };
              res.redirect('/home');
            });

          }
        }
        //db.close();
      });
    }
  }

});

//registration page
app.get('/registration', function (req, res) {
  const success = req.flash('success');
  const error = req.flash('error');
  res.render('registration', { success, error });
});

app.get('/Register', function (req, res) {
  res.redirect('/Registration');
});

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
              req.flash("success", "You have registered successfully");
              res.redirect('/');
            } else {
              db.close();
              req.flash("error", "Please Enter a Different Username");
              res.redirect('/registration');

            }

          }else {
            console.log(`Collection ${collection} doesn't exist`);
            db.close();
          }

        });

      });
    } catch (err) {
      console.log(`Error: ${err}`);
  }
}
});

//Home Page
app.get('/home', requireLogin, function (req, res) {
  res.render('home');

});

app.get('/hiking', requireLogin, function (req, res) {
  res.render('hiking');

});

app.get('/cities', requireLogin, function (req, res) {
  res.render('cities');
});

app.get('/islands', requireLogin, function (req, res) {
  res.render('islands');
});

//hiking page
app.get('/inca', requireLogin, function (req, res) {
  res.render('inca',{error: req.flash('error')});
});

app.get('/annapurna', requireLogin, function (req, res) {
  res.render('annapurna',{error: req.flash('error')});
});

//cities page
app.get('/paris', requireLogin, function (req, res) {
  res.render('paris',{error: req.flash('error')});
});

app.get('/rome', requireLogin, function (req, res) {
  res.render('rome',{error: req.flash('error')});
});

//islands page
app.get('/bali', requireLogin, function (req, res) {
  res.render('bali',{error: req.flash('error')});
});

app.get('/santorini', requireLogin, function (req, res) {
  res.render('santorini',{error: req.flash('error')});
});

//want to go list
app.get('/wanttogo', requireLogin, function (req, res) {
  if (req.session.user.wanttogo) {
    res.render('wanttogo', { destinations: req.session.user.wanttogo });
  } else {
    res.render('wanttogo' );
  }
});

app.post('/wanttogo', requireLogin, function (req, res) {
  const destination = req.body.destination;
  //console.log(destination);
  const user = req.session.user;
  if(user.wanttogo && user.wanttogo.includes(destination)) {
    req.flash("error", "This Destination is already in your list");
    res.redirect(destination);
  }else {
    if (user.username != "admin") {
      getCLient().connect(function (err, db) {
        if (err) throw err;
        let currentDB = db.db(dbName);
        currentDB.collection(collection).updateOne({ username: user.username }, {$push: { wanttogo: destination } });
        //console.log('added '+destination+' to wanttogo list');
      });
    }
    req.session.user.wanttogo.push(destination);
    res.redirect(destination);
  }
});

//search bar
app.post('/search', requireLogin, async function (req, res) {
  const search = await req.body.Search;
  const destinations = ['annapurna', 'inca', 'santorini', 'bali', 'paris', 'rome'];

  let results = [];

  for (let i = 0; i < destinations.length; i++) {

    if (destinations[i].includes(search)) {
      results.push(destinations[i]);
    }
  }
  if (results.length === 0) {
    req.flash('notfound', 'Destination not Found');
    res.render('searchresults', { notfound: req.flash('notfound') });
  } else {
    res.render('searchresults', { results });
  }
});
// app.get('/searchresults',requireLogin , function(req,res){
//   res.render('searchresults');
// });







