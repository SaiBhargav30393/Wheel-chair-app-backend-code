var Db  = require('./dboperations');
var variables = require('./variables');
var dboperations  = require('./dboperations');
var XLSX = require('xlsx')
// Import Libraries
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);

//For middle ware(Future Use) => password authentication and predefined stuff
router.use((request,response,next)=>{
  variables.row.set("8", "2");
  variables.row.set("8.5", "3");
  variables.row.set("9", "4");
  variables.row.set("9.5", "5");
  variables.row.set("10", "6");
  variables.row.set("10.5", "7");
  variables.row.set("11", "8");
  variables.row.set("11.5", "9");
  variables.row.set("12", "10");
  variables.row.set("12.5", "11");
  variables.row.set("13", "12");
  variables.row.set("13.5", "13");
  variables.row.set("14", "14");
  variables.row.set("14.5", "15");
  variables.row.set("15", "16");
  variables.row.set("15.5", "17");
  variables.row.set("16", "18");
  variables.row.set("16.5", "19");
  variables.row.set("17", "20");
  variables.row.set("17.5", "21");
  variables.row.set("18", "22");
  variables.row.set("18.5", "23");



  variables.col.set("10", "C");
  variables.col.set("10.5", "D");
  variables.col.set("11", "E");
  variables.col.set("11.5", "F");
  variables.col.set("12", "G");
  variables.col.set("12.5", "H");
  variables.col.set("13", "I");
  variables.col.set("13.5", "J");
  variables.col.set("14", "K");
  variables.col.set("14.5", "L");
  variables.col.set("15", "M");
  variables.col.set("15.5", "N");
  variables.col.set("16", "O");
  variables.col.set("16.5", "P");
  variables.col.set("17", "Q");
  variables.col.set("17.5", "R");
  variables.col.set("18", "S");
  variables.col.set("18.5", "T");
  variables.col.set("19", "U");
  variables.col.set("19.5", "V");
  variables.col.set("20", "W");
  variables.col.set("20.5", "X");
  variables.col.set("21", "Y");
  variables.col.set("21.5", "Z");
  variables.col.set("22", "AA");
  variables.col.set("22.5", "AB");
  variables.col.set("23", "AC");
  variables.col.set("23.5", "AD");
  variables.col.set("24", "AE");
  variables.col.set("24.5", "AF");
  variables.col.set("25", "AG");
  variables.col.set("25.5", "AH");
  variables.col.set("26", "AI");
  variables.col.set("26.5", "AJ");
  variables.col.set("27", "AK");
  variables.col.set("27.5", "AL");
  variables.col.set("28", "AM");
  variables.col.set("28.5", "AN");
  variables.col.set("29", "AO");
  variables.col.set("29.5", "AP");
  variables.col.set("30", "AQ");


    next();
 })

 router.route('/getChairs').post((request,response,next)=>{
    console.log(variables.tilt);
    dboperations.showWheelchairs(request.body.Weight, request.body.SeatWidth, request.body.SeatDepth, variables.tilt).then(result => {
       response.json(result);
    })


})

router.route('/parameters').post((request,response)=>{
  
   var workbook = XLSX.readFile('Seat_Width.xlsx');
   let worksheet = workbook.Sheets[workbook.SheetNames[0]];

   //console.log(worksheet.C1.v);
   //for( let cell in worksheet){
     //const value = worksheet[cell].v;
     //if(value){
       //console.log(value);
     //}
   //}
   var mer = variables.col.get(JSON.stringify(request.body.hwidth))+ variables.row.get(JSON.stringify(request.body.cwidth));
   var desired_cell = worksheet[mer];
   var seat_width = desired_cell.v;
    variables.weight = request.body.patientWeight;
    //variables.swidth = variables.seatwidth.get([request.body.hwidth,request.body.cwidth]);
    if (request.body.footpropulsion ==1 ) {
      variables.sdepth = request.body.btdepth - 1.5;
      variables.FSFH = request.body.lowerleg - 3;
    } else {
      variables.sdepth = request.body.btdepth - 1.0;
      variables.FSFH = request.body.lowerleg + 1;
    }

      var result = {
         "Weight": variables.weight,
         "SeatWidth": seat_width,
         "SeatDepth": variables.sdepth,
         "RecommendedFSFH": variables.FSFH
         };
    variables.tilt = request.body.tilt;
    response.json(result);
})

var port = process.env.PORT || 8090;
app.listen(port);
console.log('Order API is runnning at ' + port);