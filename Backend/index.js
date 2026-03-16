const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");


const cors = require("cors");
const router = require("./routes/controller.js")
const conntdb = require("./config/db.js")

app.use("/uploads",express.static("uploads"))

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
conntdb()
app.use(cookieParser());


app.use("/api",router)

app.get("/",(req,res)=>{
    res.send("hello")
})
app.listen(process.env.Port, () =>{
    console.log("server is started")
})
