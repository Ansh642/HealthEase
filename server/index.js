const express = require("express");
const app = express();

require("dotenv").config();
const fileUpload = require("express-fileupload");
const cors = require("cors");
const database = require("./config/database");
const cloudinary = require("./config/cloudinary");


const routes = require("./routes/routes");

database.connect();
cloudinary.cloudinaryConnect();

const PORT= process.env.PORT || 4000;
 
app.use(express.json());

// connecting frontend and backend
app.use(
    cors({
        origin: "*",
        credentials : true,
    })
);

// middleware for file upload
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

// call the routes
app.use("/api/v1",routes);

app.use("/",(req, res)=>{
    return res.json({
        success: true,
        message: "Server is running...",   
    });
});


app.listen(PORT,()=>{
    console.log(`App listening on port ${PORT}`)
});


