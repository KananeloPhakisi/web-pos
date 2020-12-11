'use-strict';

const app = require("./app");
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('morgan');
const dotenv = require("dotenv");
dotenv.config();

const Router = reqiure('./Backend/Routes/index');

const app = express();
const nodeDev = 'Development';
const port = process.env.PORT || 3000;

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false;
}));
app.use('/', Router);

app.listen(port, error => {
	if (error) {
		console.log(`Error: ${error}`);
	}
	console.log(`Server running on port ${port}...`);
});

module.exports = app;