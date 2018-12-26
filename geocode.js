var request= require('request');

var geocodeAddress=(address, callback)=>{
    var encodedAddress= encodeURIComponent(address);
request({
    url:'http://www.mapquestapi.com/geocoding/v1/address?key=TJ2YAY9hpHSbAxRgkltueaBJdI4EPG6O&location='+encodedAddress,
    json:true
}, (err, res, body)=>{

    if(err){
        callback('There was some error connecting to servers');
        }
    else if(body.results[0].locations[0].geocodeQualityCode==='A1XAX'){
        callback('Invalid Address');
        }
    else{
          callback(undefined, {
              address: `${body.results[0].locations[0].adminArea5}, ${body.results[0].locations[0].adminArea3},${body.results[0].locations[0].adminArea1}`,
            longitude: body.results[0].locations[0].latLng.lng,
            latitude:body.results[0].locations[0].latLng.lat
        })
       
    }
   
})
}


var weatherFinder= (results, callback)=>{

    request({
        url:`https://api.darksky.net/forecast/40eb845184c07454e8317fa5015b4676/${results.latitude},${results.longitude}`,
        json: true
    },(err, res, body)=>{

        if(err==null && res.statusCode===200)
            callback(undefined, {
                address:results.address,
                temperature: body.currently.temperature,
                windSpeed: body.currently.windSpeed,
                humidity: body.currently.humidity,
                summary: body.currently.summary
            });
       
        else{
            callback(err);
           
        }
    })

}

module.exports={
    geocodeAddress,
    weatherFinder
}