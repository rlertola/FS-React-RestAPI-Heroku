'use strict';

// Load modules.
const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');

const morgan = require('morgan');
const jsonParser = require('body-parser').json;

// Variable to enable global error logging.
const enableGlobalErrorLogging =
  process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

// Body parser.
app.use(jsonParser());

// Morgan(req logging).
app.use(morgan('dev'));

// CORS setup.
app.use(cors());

// Routes setup.
const routes = require('./routes');
const mongoose = require('mongoose');

// Connect to mongodb server. The settings are to fix deprecation warnings.
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost:27017/fsjstd-restapi',
  {
    useNewUrlParser: true,
    useCreateIndex: true
  }
);

const db = mongoose.connection;

db.on('error', err => {
  console.error('connection error:', err);
});

db.once('open', () => {
  console.log('db connection successful');
});

app.use('/api', routes);

// app.use(express.static(path.join(__dirname, 'client', 'build')));

// Friendly greeting for the root route.
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the REST API project!'
  });
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Global error handler.
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.errors
  });
});

// Send 404 if no other route matched.
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found'
  });
});

// Set port.
app.set('port', process.env.PORT || 5000);

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
// });

// Start listening on port.
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});
