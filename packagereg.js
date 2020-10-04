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
  console.log("in deposit")


idToken = req.body.id;
let uid = req.body.business_id;



admin.auth().verifyIdToken(idToken).then((claims) => {
  console.log(claims);
if(claims.uid == uid || claims.admin === true){

 if (typeof collectedfrcust !== "number" ||
typeof transferedtocust !== "number" ){
   console.log("it's not a number");
   return res.status(400).json({"error": "The amount you entered is not a number"});
 }else{
 var db = admin.database();
 let date = Date.now();

 let j = new Date(date);
 let year = j.getFullYear();
 let month = j.getMonth()+1;
 let day = j.getDate();

 let dategan = day+"-"+month+"-"+year;




   //get bank, get amount collected from customer, get
   // amount transfered to customer,  bank charges,
   //get bank charges,
   //get amountremaining in hand add to money collected from cust
   //get amount remaining in Bank, subtract charges and amount deposited by customer
   // get profit by subtrating
   //(bank charges + amount transfered to customer) from
   // total amount colcted from customer
   //

 //res.status(200).json((snapshot.val()));

//res.status(200).json((snapshot.val()));

let ref= `financial institution/${bank}/${type}/`;
let ref2 = `amountremaining/${uid}/hand/`;
let ref3 = `amountremaining/${uid}/bank/`;
let ref4 = `transactions/${uid}/${dategan}/${date}/`;

dbref = db.ref(ref);
dbref2 = db.ref(ref2);
dbref3 = db.ref(ref3);
dbref4 = db.ref(ref4);

dbref.once("value", function(snapshot){
let charge;
  let all = snapshot.val();
  if(all){
  let keys = Object.keys(all);

keys.forEach((key)=>{
let hi = key.lastIndexOf("_");
let substra = hi-1;
let addit = hi+1;
let mind = key.substr(0, hi);

console.log(mind);
let maxd = key.substr(addit, key.length);
console.log(maxd);
mind = parseInt(mind);
maxd = parseInt(maxd);
if (transferedtocust <= maxd && transferedtocust >= mind){
let all2 = all[key];
if(all2.charges){
charge = all2.charges;
charge = parseInt(charge);
}
if(all2.percentage){
  charge = all2.percentage/100 * transferedtocust;
  charge = parseInt(charge);
}

}

});
if(charge !== undefined && charge !== null){
dbref2.once("value", function(snapshot){
  let amountremaining = snapshot.val().amount;
  amountremaining = parseInt(amountremaining);
  console.log(amountremaining);
  let tosave = amountremaining + collectedfrcust;
  dbref2.set({amount:tosave}, function(error){
if(error){

}else{

dbref3.once("value", function(snapshot){

  let amountremaining2 = snapshot.val().amount;
  console.log(amountremaining2);
  amountremaining2 = parseInt(amountremaining2);
  let tosave2 = amountremaining2 -(charge + transferedtocust);
  dbref3.set({amount:tosave2}, function(error){
    if(error){

    }else{
      profit = collectedfrcust - (charge + transferedtocust);
      dbref4.set({
        profit: profit,
        type: "deposit",
        amountcollectedfromcustomer:collectedfrcust,
        amounttransferedtocustomer:transferedtocust,
        bankcharges: charge,
        amountremaininginhand: tosave,
        amountremaininginbank: tosave2,
        datetime: Date.now(),
        date:dategan
      }, function(error){
        if(error){

        }else{
          res.status(200).json({"message": "deposit transaction successfully"})

        }
      })
    }
  });

}, function(error){


})

 }

  });
}, function(error){
  console.log(error);
})
}else{
  res.status(500).json({"error": "No configured charges for the transaction requested"})
}
}
}, function(error){

})






}}});

});








return app;
}
module.exports = function(admin){return approvals(admin)};
