var request=require('request');

var geocode=(address)=>{
    return new Promise((resolve, reject)=>{
        var encodedAddress= encodeURIComponent(address);
        request({
            url:'http://www.mapquestapi.com/geocoding/v1/address?key=TJ2YAY9hpHSbAxRgkltueaBJdI4EPG6O&location='+encodedAddress,
            json:true
        }, (err, res, body)=>{
        
            if(err){
                reject('There was some error connecting to servers');
                }
            else if(body.results[0].locations[0].geocodeQualityCode==='A1XAX'){
                reject('Invalid Address');
                }
            else{
                  resolve( {
                      address: `${body.results[0].locations[0].adminArea5}, ${body.results[0].locations[0].adminArea3},${body.results[0].locations[0].adminArea1}`,
                    longitude: body.results[0].locations[0].latLng.lng,
                    latitude:body.results[0].locations[0].latLng.lat
                })
               
            }
           
        })
    })
}



geocode('302012').then((message)=>{
    console.log(message);
}, (err)=>{
    console.log(err);
})