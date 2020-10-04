function approvals(admin){
const express = require('express');
const bodyParser = require('body-parser');

const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(bodyParser.raw());


app.post('/', (req, res)=>{
  console.log("in packagereg")

let idToken = req.body.id;
let uid = req.body.business_id;
let user_id = req.body.user_id;
admin.auth().verifyIdToken(idToken).then((claims) => {
  console.log(claims);
if(claims.uid == uid  || claims.admin === true){

  console.log(business_id);
  let ref2 = `registration/users/${user_id}';
   var db = admin.database();
   var dbref = db.ref(ref);
   dbref.once('value', function(snapshot){
     if(snapshot.val()){
       let result = snapshot.val();


res.status(200).json({message: result});

     }else{
       res.status(400).json({error: 'No user found !!!'});

     }
   }, function(error){
     res.status(400).json({error: 'No user found !!!'})
   })





}else{
  res.status(400).json({error: 'Unauthorized'});
}
});
});



return app;
}
module.exports = function(admin){return approvals(admin)};
