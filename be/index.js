const express = require("express");
const app = express();
const rootRouter = require("./routes/index");

const cors = require("cors");


app.use(cors());

app.use((req, res, next) => {
    console.log('CORS middleware executed');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });


app.use(express.json());


app.use("/api/v1", rootRouter);

app.listen(3000,()=>{
  console.log("running on port 3000");
  
});
