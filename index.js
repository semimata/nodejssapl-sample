const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes/routes.js")
 
const app = express();

const port = process.env.PORT || 3000;
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",(req,res) => {
    res.send("hello world");
});

app.use("/", routes);

app.listen(port,() => {
    console.log(`ポート番号${port}番で起動`);
});

