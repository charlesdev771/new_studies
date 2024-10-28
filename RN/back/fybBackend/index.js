const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoutes = require("./src/routes/userRoutes");
const { sequelize } = require('./models');
const router = express.Router();
const User = require("./models");
const port = 7777;
const path = require("path");

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api', userRoutes);

sequelize.authenticate().then(() => {

    console.log("Connected to db.");
})
.catch(error => {
    console.warn('Eror to connected db: ', error);
});

app.use(cors());

app.use('/upload', express.static(path.join(__dirname, 'upload')));
app.listen(port, () =>{
    console.log("Server running with succefull! in port: " + port);
})

