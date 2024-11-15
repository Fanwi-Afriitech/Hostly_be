const express= require("express");
const app= express();
const cors = require("cors");
app.use(express.json());

const DBconfig= require('./db');
const roomRoute= require('./routes/roomRoute')
const userRoute =require('./routes/userRoute')
const bookingsRoute= require('./routes/bookingsRoute')
const port = process.env.PORT || 5000;

app.use(cors());
app.use('/api/rooms', roomRoute);
app.use('/api/users' , userRoute);
app.use('/api/bookings' , bookingsRoute);

app.listen(port,()=> console.log('node server started'));

