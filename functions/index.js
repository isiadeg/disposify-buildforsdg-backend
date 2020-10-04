const functions = require('firebase-functions');

const express= require("express");
const cors = require('cors');
var admin = require('firebase-admin');


var serviceAccount = require("./serviceaccount.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://sdgdisposify.firebaseio.com"
});

//const registration = require('./registration')(admin);
const setclaims = require('./setclaims')(admin);
const registration = require('./registration')(admin);
const facebookregistration = require('./facebookregistration')(admin);
const businessreg = require('./businessreg')(admin);
const packagereg = require('./packagereg')(admin);
const getpackage =  require('./getpackage')(admin);
const getpackagedetails = require('./getpackagedetails')(admin);
const getcustomersubscription = require('./getcustomersubscription')(admin);
const getcollectorsubscription = require('./getcollectorsubscription')(admin);
const subscribe = require('./subscribe')(admin);
const unsubscribe = require('./unsubscribe')(admin);




const app =express();
app.use(cors({origin: true}));

app.get('/', (req,res)=>{
  res.send('hi');
})

app.use('/api/setclaims', setclaims);
app.use('/api/registration', registration);
app.use('/api/facebookregistration', facebookregistration);
app.use('/api/businessreg', businessreg);
app.use('/api/packagereg', packagereg);
app.use('/api/getpackage', getpackage);
app.use('/api/getpackagedetails', getpackagedetails);
app.use('/api/getcustomersubscription', getcustomersubscription);
app.use('/api/getcollectorsubscription', getcollectorsubscription);
app.use('/api/subscribe', subscribe);
app.use('/api/unsubscribe', unsubscribe);

exports.app = functions.https.onRequest(app);
//app.listen(3030, ()=>{
//  console.log("listening");
//})





// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
