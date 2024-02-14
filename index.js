const app = require('./app')
const port = 8081

// var Connection = require('tedious').Connection;  
// var config = {  
//     server: 'your_server.database.windows.net',  //update me
//     authentication: {
//         type: 'default',
//         options: {
//             userName: 'sa', //update me
//             password: 'sa123'  //update me
//         }
//     },
//     options: {
//         // If you are on Microsoft Azure, you need encryption:
//         encrypt: true,
//         database: 'AttendanceSystem'  //update me
//     }
// }; 
// var connection = new Connection(config);  
//     connection.on('connect', function(err) {  
//         // If no error, then good to proceed.
//         console.log("Connected");  
//     });

    
// const db = require("./models/index");

// db.mongoose.connect(db.url,{
//   useNewUrlParser: true,
//     useUnifiedTopology: true
// })
// .then(()=>{
//   console.log("Connected to the database!");
// })
// .catch(err =>{
//   console.log("Cannot connect to the database!", err);
//   process.exit();
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})