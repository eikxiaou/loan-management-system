var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const mongoose = require('mongoose');

// Replace 'mongodb://localhost:27017/your-database-name' with your MongoDB URI
mongoose.connect('mongodb://127.0.0.1:27017/loanmanager', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

// Handle connection errors
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB database');
    // You can perform database operations here
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loansRouter =  require('./routes/loans');
var paymentsRouter = require('./routes/payments');
var invoicesRouter = require('./routes/invoices');
var customersRouter = require('./routes/customers');
var settingsRouter = require('./routes/settings');
var auditlogsRouter = require('./routes/auditlogs');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

console.log('here');
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/customers', customersRouter);
app.use('/loans', loansRouter);
// app.use('/users', usersRouter);

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
app.get('/close', (req, res) => {
  res.send('Server is shutting down...');
  server.close(() => {
    console.log('Server has been stopped');
    process.exit(0); // Exit the Node process gracefully
  });
});
module.exports = app;
