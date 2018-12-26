var request= require('request');
const yargs= require('yargs');
const geocode= require("./geocode");


var argv= yargs.options(
{
    a:{
        demand:true,
        alias:'address',
        string:true,
        description:'address for the place'
    }
})
.help().argv


geocode.geocodeAddress(yargs.argv.address, function(err, results){
    if(err){
        console.log(err);
    }
    else{
        console.log(JSON.stringify(results,undefined, 2));
       geocode.weatherFinder(results, (err, weatherResponse)=>{
                if(err){
                    console.log(err);
                }
                else{
                        console.log(JSON.stringify(weatherResponse,undefined, 2));
                }
       });
    }
});