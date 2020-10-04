function reg(admin){
const express = require('express');
const bodyParser = require('body-parser');

const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(bodyParser.raw());


app.post('/', (req, res)=>{
 let profile = req.body;
  console.log(req.body);
  if (profile.passportUrl == ""){
    return res.status(400).json({"error": "You need to upload passport photograph and id card"});
  }

if(profile.fullname !== "" &&
profile.email !== "" && profile.location !== "" &&
profile.passportUrl !== "" ){



  var db = admin.database();
  var dbref= db.ref('registration/');
  var dbrefchild = dbref.child('users/'+profile.userid)
  //var newuser = dbrefchild.push();
  dbrefchild.set({
    fullname: profile.fullname,
    address: profile.address,
    phonenumber : profile.phonenumber,
    companyornot : profile.companyornot,
    customerornot: profile.customerornot,
    passporturl: profile.passportUrl,
    location: profile.location,
    email:profile.email,

    whoareyou: {
      status : profile.customerornot
    }
  },  function(error) {
  if (error) {
    res.status(500).json({"error":"Data could not be saved." + error});
  } else {
  res.status(201).json({"message":"You have successfully registered, You can now login" });
}});



}
});
return app;
}

module.exports = function(admin){return reg(admin)};
