
const yargs= require('yargs');
const geocode= require("./geocode");
const axios= require('axios');

var argv= yargs.options(
{
    a:{
        demand:true,
        alias:'address',
        string:true,
        description:'address for the place'
    }
   
})
.help().argv;

console.log(argv);
var encodedAddress;
if(argv.address===''){
    encodedAddress= encodeURIComponent("Chennai");
}
else
encodedAddress= encodeURIComponent(argv.address);
var addressURL='http://www.mapquestapi.com/geocoding/v1/address?key=TJ2YAY9hpHSbAxRgkltueaBJdI4EPG6O&location='+encodedAddress;

//Making the call to address api

axios.get(addressURL).then((response)=>{

    if(response.data.results[0].locations[0].geocodeQualityCode==='A1XAX'){
        throw new Error('Unable to find address');
    }
    var addressResultsRequired= {
        address: `${response.data.results[0].locations[0].adminArea5}, ${response.data.results[0].locations[0].adminArea3},${response.data.results[0].locations[0].adminArea1}`,
      longitude: response.data.results[0].locations[0].latLng.lng,
      latitude:response.data.results[0].locations[0].latLng.lat
  }
    console.log(addressResultsRequired.address);
    const weatherURL=`https://api.darksky.net/forecast/40eb845184c07454e8317fa5015b4676/${addressResultsRequired.latitude},${addressResultsRequired.longitude}`
    return axios.get(weatherURL);
}).then((response)=>{
  var weatherResonseRequired={

    /*###################I WANT TO DO LIKE THIS ################*/

    //address:addressResultsRequired.address

    temperature: response.data.currently.temperature,
    windSpeed: response.data.currently.windSpeed,
    humidity: response.data.currently.humidity,
    summary: response.data.currently.summary

  } 
  console.log(weatherResonseRequired);
}).catch((error)=>{
    if(error.code==='ENOTFOUND'){
        console.log('Unable to connect to the servers')
    }
    else{
        console.log(error.message);
    }
});



