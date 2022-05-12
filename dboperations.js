var config = require('./dbconfig');
var variables = require('./variables');
const sql = require('mssql');

async function getWheelchairs() {
    try {
        let pool = await sql.connect(config);
        let products = await pool.request().query("SELECT Model from WC_specs where Weight>"+variables.weight+"AND Seat_Width_Min <="+variables.swidth+"AND Seat_Width_Max >= "+variables.swidth+"AND Seat_Depth_Min <="+variables.sdepth+"AND Seat_Depth_Max >= "+variables.sdepth);
        return products.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function showWheelchairs(weight, width, depth, tilt) {
    try {
        let pool = await sql.connect(config);
        console.log(tilt);
        let products = await pool.request().query("SELECT Model from WC_specs where Weight>"+weight+"AND Seat_Width_Min <="+width+"AND Seat_Width_Max >= "+width+"AND Seat_Depth_Min <="+depth+"AND Seat_Depth_Max >= "+depth+"AND Tilt =" + "'"+tilt+"'"+"COLLATE Latin1_General_CS_AS");
        return products.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = {
    getWheelchairs: getWheelchairs,
    showWheelchairs: showWheelchairs
}