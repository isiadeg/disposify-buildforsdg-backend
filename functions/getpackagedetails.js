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
let packageid = req.body.packageid;
console.log(req.body);
admin.auth().verifyIdToken(idToken).then((claims) => {
  console.log(claims);
if(claims.uid == uid  || claims.admin === true ){

  let hi = packageid.lastIndexOf("_");
  let substra = hi-1;
  let addit = hi+1;
  let business_id = packageid.substr(0, hi);

  console.log(business_id);
  let date_now = packageid.substr(addit, packageid.length);
  console.log(date_now);

  let ref=`packagereg/${business_id}/${date_now}`;
   var db = admin.database();
   var dbref = db.ref(ref);
   dbref.once('value', function(snapshot){
     if(snapshot.val()){
       let result = snapshot.val();
       console.log(result);
       let to_return_object = {};
       to_return_object["package"] = result;
       console.log(to_return_object);
       let ref2=`business/${business_id}`;
       var dbref2 = db.ref(ref2);
       dbref2.once('value', function(snapshot){
         if(snapshot.val()){
           let result2 = snapshot.val();
           to_return_object["business"] = result2;
            console.log(to_return_object);
            res.status(200).json({message: to_return_object});

         }else{
           res.status(500).json({error: 'An error occured'})
         }}, function(error){
           res.status(500).json({error: 'An error occured'})

         });



     }else{
       res.status(400).json({error: 'No Package with the given id'})

     }
   }, function(error){
     res.status(400).json({error: 'No Package with the given id'})
   })





}else{
  res.status(400).json({error: 'Unauthorized'});
}
});
});



return app;
}
module.exports = function(admin){return approvals(admin)};
