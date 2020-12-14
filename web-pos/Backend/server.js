'use-strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('morgan');
const dotenv = require("dotenv");
dotenv.config();

const Router = require('./Routes/index');

const app = express();
const nodeDev = 'Development';
const port = process.env.PORT || 4000;

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));
app.use('/', Router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, error => {
	if (error) {
		console.log(`Error: ${error}`);
	}
	console.log(`Server running on port ${port}...`);
});

module.exports = app;