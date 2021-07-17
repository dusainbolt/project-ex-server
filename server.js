const express = require('express');
// const bodyParser = require("body-parser"); /* deprecated */
const cors = require('cors');
var path = require('path');

const app = express();
global._appRoot = path.resolve(__dirname);
global._constant = require('./app/constants');

var multer = require('multer');
global._upload = multer();

var corsOptions = {
    origin: 'http://localhost:8081',
};

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// for parsing multipart/form-data
// app.use(_upload.array());
app.use(express.static('public'));

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json()); /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); /* bodyParser.urlencoded() is deprecated */

const db = require('./app/models');

db.sequelize.sync();
// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// simple route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to project excersice application.' });
});

require('./app/routes/project.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
