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
  console.log("in businessreg")

let idToken = req.body.id;
let uid = req.body.business_id;
let companyname = req.body.companyname;
let companyaddress = req.body.companyaddress;
let monday_friday_working_hours = `${req.body.wh_mon_fri_start} to ${req.body.wh_mon_fri_end}`;
let saturday_working_hours = `${req.body.wh_sat_start} to ${req.body.wh_sat_end}`;
let sunday_working_hours = `${req.body.wh_sun_start} to ${req.body.wh_sun_end}`;
let business_email = req.body.email;
let business_phonenumber = req.body.phonenumber;
let business_services_description = req.body.servicedescription;
let business_idcardurl = req.body.idCardUrl;
let business_passporturl = req.body.passportUrl;
let certificateurl = req.body.certificateUrl;
admin.auth().verifyIdToken(idToken).then((claims) => {
  console.log(claims);
if((claims.uid == uid && claims.claims == "collector") || claims.admin === true){


if(companyname && monday_friday_working_hours &&
saturday_working_hours && sunday_working_hours &&
business_email && business_phonenumber && business_services_description &&
business_idcardurl && business_passporturl && certificateurl){
  let ref=`business/${uid}/`;
   var db = admin.database();
   var dbref = db.ref(ref);
   dbref.set({
     companyname: companyname,
     companyaddress:companyaddress,
     monday_friday_working_hours: monday_friday_working_hours,
     saturday_working_hours: saturday_working_hours,
     sunday_working_hours: sunday_working_hours,
     business_email: business_email,
     business_phonenumber: business_phonenumber,
     business_services_description: business_services_description,
     business_idcardurl: business_idcardurl,
     business_passporturl: business_passporturl,
     certificateurl: certificateurl
   }, function(error){
     if(error){
       res.status(500).json({error: 'An error occured and your data was not saved'});

     }else{res.status(200).json({message: "Your data was saved successfully"});}
   });

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
