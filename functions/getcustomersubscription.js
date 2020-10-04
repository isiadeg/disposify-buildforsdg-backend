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
admin.auth().verifyIdToken(idToken).then((claims) => {
  console.log(claims);
if((claims.uid == uid && claims.claims == "customer") || claims.admin === true){

  console.log(uid);
  let ref2 = `registration/users/${uid}/subscription`;

   var db = admin.database();
   var dbref = db.ref(ref2);
   dbref.once('value', function(snapshot){
     if(snapshot.val()){
       let result = snapshot.val();
       let to_return_array = [];
let uidarrays = Object.keys(result);
console.log(uidarrays);
uidarrays.forEach((each_uid)=>{
//let datearrays = Object.keys(result[each_uid]);
//console.log(datearrays);

to_return_array.push(result[each_uid]);
console.log(to_return_array);
});


res.status(200).json({message: to_return_array});


     }else{
       res.status(400).json({error: 'No business packages yet !!!'});

     }
   }, function(error){
     res.status(400).json({error: 'No business packages yet !!!'})
   })





}else{
  res.status(400).json({error: 'Unauthorized'});
}
});
});



return app;
}
module.exports = function(admin){return approvals(admin)};
