



const request = require("request");




const fetchMyIP = function(callback){

  request("https://api.ipify.org/?format=json",(error,response,body)=>{

  if(error){
    callback(error,null)
    return
  }

  if (response.statusCode !== 200) {
    const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
    callback(Error(msg), null);
    return;
  }

  const data =    JSON.parse(body)
  callback(null,data.ip)
  return
  })



}

const fetchCoordsByIP = function(ip, callback) {

  const url = `https://api.freegeoip.app/json/${ip}?apikey=9715a050-3dca-11ec-a46d-a72c573d2b50`


  request(url,(error,response,body)=>{
  const respondBody = JSON.parse(body)
    const latitude = respondBody.latitude
    const longitude = respondBody.longitude
    const description = {latitude,longitude}
    callback(error,description)
  })


}

const fetchISSFlyOverTimes = function(coords, callback) {
  const url = `https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;

  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
      return;
    }

    const passes = JSON.parse(body).response;
    callback(null, passes);
  });
};

const nextISSTimesForMyLocation = (callback) => {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, loc) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(loc, (error, nextPasses) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, nextPasses);
      });
    });
  });
};







module.exports = {nextISSTimesForMyLocation}






