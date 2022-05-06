const { connect } = require("mongoose");

const mongoURI = "mongodb+srv://karthik:6ja30zkKTeEWaXAm@cluster0.wqclx.mongodb.net/brillio-db?retryWrites=true&w=majority";
connect(mongoURI)
    .then(() => console.log("MongoDB Connected..."))
    .catch(console.log)

    //"mongodb://localhost:27017/brillio-db";