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
if((claims.uid == uid && claims.claims == "collector") || claims.admin === true){

  let ref2 = `packagereg/${uid}`;// /${date_now}/subscription/${uid}`;

   var db = admin.database();
   var dbref2 = db.ref(ref2);
   dbref2.once('value', function(snapshot){
     if(snapshot.val()){
       let result = snapshot.val();
       var to_return_array = [];
let uidarrays = Object.keys(result);
console.log(uidarrays);
uidarrays.forEach((each_uid)=>{
  let subscriptionarrays = Object.keys(result[each_uid]['subscription']);
  console.log(subscriptionarrays);
  subscriptionarrays.forEach((each_subscription)=>{
    let eachy_subscription = result[each_uid]['subscription'][each_subscription];
    console.log(each_subscription);
    //to_return_array.push(each_subscription);
    let packageobject ={};
     packageobject['subscription'] = eachy_subscription;
    console.log(to_return_array);
    let ref3 = `registration/users/${each_subscription}`;
     var db = admin.database();
     var dbref3 = db.ref(ref3);
     dbref3.once('value', function(snapshot){
       if(snapshot.val()){
         let result2 = snapshot.val();

packageobject['userdetails'] = result2;
  to_return_array.push(packageobject);
  console.log(to_return_array);

       }else{
         res.status(400).json({error: 'No user found !!!'});

       }
     }, function(error){
       res.status(400).json({error: 'No user found !!!'})
     });
  })




});
console.log('p '+to_return_array);
setTimeout(function(){res.status(200).json({message: to_return_array})}, 2000);

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
