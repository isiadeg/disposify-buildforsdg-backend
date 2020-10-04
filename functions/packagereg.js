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
let packagename = req.body.packagename;
let packagedescription = req.body.packagedescription;
let featureses = req.body.featureses;
let packageprice = req.body.packageprice;
let serviceimagesurl = req.body.serviceimagesUrl;

admin.auth().verifyIdToken(idToken).then((claims) => {
  console.log(claims);
if((claims.uid == uid && claims.claims == "collector") || claims.admin === true){


if(packagename && packagedescription &&
featureses && packageprice &&
serviceimagesurl){
  let ref=`business/${uid}/`;
   var db = admin.database();
   var dbref = db.ref(ref);
   dbref.once('value', function(snapshot){
     if(snapshot.val()){
       let companyname = snapshot.val().companyname;
       const date_now = Date.now();
       let ref2 = `packagereg/${uid}/${date_now}`;
       console.log(ref2);
      let featuree = featureses.map(noobject);
       function noobject(item){
         var eachone = item.features;
         console.log(eachone);
         return eachone;
       }
       console.log(featuree);

       var dbref2 = db.ref(ref2);
       dbref2.set({
         business_id : uid,
         package_id: `${uid}_${date_now}`,
         companyname : companyname,
         packagename : packagename,
         packagedescription: packagedescription,
         featureses : featuree,
         packageprice: packageprice,
         serviceimagesurl: serviceimagesurl
       }, function(error){
         if(error){
           res.status(400).json({error: 'An error occured'})

         }else{
           res.status(200).json({message: 'Your service package was saved successfully'})

         }
       });
     }else{
       res.status(400).json({error: 'You have to register your business first before registering packages'})

     }
   }, function(error){
     res.status(400).json({error: 'You have to register your business first before registering packages'})
   })


}else{
  res.status(400).json({error: 'You have to fill all fields'});
}



}else{
  res.status(400).json({error: 'Unauthorized'});
}
});
});



return app;
}
module.exports = function(admin){return approvals(admin)};
