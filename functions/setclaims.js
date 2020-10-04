function seti(admin){
const express = require('express');
const bodyParser = require('body-parser');

const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(bodyParser.raw());

function send(status, res){
  console.log(status);
  res.status(200).json({status: status});
}
app.post('/', (req, res)=>{

let idToken = req.body.id;
console.log(idToken);
let message="";
admin.auth().verifyIdToken(idToken).then((user)=>{
  console.log(user);
  console.log(user.emailVerified);
  console.log(user.uid);
  if(user.email &&
      user.email_verified && user.uid == "rbXRRIavAdP1YoUgOdt3TlmaDmt2"){
        admin.auth().setCustomUserClaims(user.uid, {admin:true}).then(()=>{
        console.log(user.email_verified);
        res.status(200).json({status: "success"});
        });

      }
      if(user.email &&
          user.email_verified && user.uid != "rbXRRIavAdP1YoUgOdt3TlmaDmt2"){
console.log(user.email_verified);
var db = admin.database();
  var dbref= db.ref('registration/');
  var dbrefchild = dbref.child('users/'+user.uid)
dbrefchild.once('value', function(snapshot){
if(snapshot.val()){
  let useee = snapshot.val();
let clam =   useee.whoareyou.status;
admin.auth().setCustomUserClaims(user.uid, {claims:clam}).then(()=>{
console.log(user.email_verified);
res.status(200).json({status: "ineligible"});
});
}else{
  res.status(200).json({status: "unregistered"});
}
}, function(error){
  if(errorObject){
           res.status(501).json({error:"The read failed: " + errorObject.code});
         }else{


         }
})


}

    if(user
      && user.firebase.sign_in_provider == "facebook.com" ){
console.log(user.firebase.sign_in_provider);
var db = admin.database();
var dbref= db.ref('registration/');
var dbrefchild = dbref.child('users/'+user.uid)
dbrefchild.once('value', function(snapshot){
if(snapshot.val()){
let useee = snapshot.val();
console.log(useee);
let clam =   useee.whoareyou.status;
admin.auth().setCustomUserClaims(user.uid, {claims:clam}).then(()=>{
console.log(user.email_verified);
res.status(200).json({status: "ineligible"});
});
}else{
res.status(200).json({status: "unregistered"});
}
}, function(error){
if(errorObject){
         res.status(501).json({error:"The read failed: " + errorObject.code});
       }else{


       }
})


}


})


});
return app;
}
module.exports = function(admin){return seti(admin)};
