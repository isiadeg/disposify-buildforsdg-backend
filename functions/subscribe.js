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
let package_id = req.body.package_id;
let package_name = req.body.package_name;
console.log(req.body);
console.log(typeof(package_id));
admin.auth().verifyIdToken(idToken).then((claims) => {
  console.log(claims);
if((claims.uid == uid && claims.claims == "customer") || claims.admin === true){
  let hi = package_id.lastIndexOf("_");
  let substra = hi-1;
  let addit = hi+1;
  let business_id = package_id.substr(0, hi);
  let date_now =package_id.substr(addit, package_id.length);
  console.log(date_now);

  console.log(business_id);
  let ref=`packagereg/${business_id}/${date_now}/subscription/${uid}`;
   var db = admin.database();
   var dbref = db.ref(ref);
   dbref.set({customer: uid,
   package_id: package_id,
 package_name: package_name}, function(error){
     if(error){
       res.status(500).json({error: 'An error occured'});
     }else{
       let ref2 = `registration/users/${uid}/subscription/${package_id}`;
       var dbref2 = db.ref(ref2);
       dbref2.set({
         business_id: business_id,
         package_id: package_id,
       package_name: package_name

     }, function(error){
       if(error){
          res.status(500).json({error: 'An error occured'});
       }else{
         res.status(200).json({message: "Your Subscription is successfull"});

       }
     })
         }
   });






}else{
  res.status(400).json({error: 'Unauthorized'});
}
});
});



return app;
}
module.exports = function(admin){return approvals(admin)};
