
const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  console.log(passTimes);
});





// fetchCoordsByIP("76.67.182.110",(error,data) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log("callback Data",data);
// })





//    fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });
