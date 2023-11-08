require('dotenv').config();
const express = require('express');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./routes/index');
const centralHandlerError = require('./middlewares/centralHandlerError');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { dataMovies } = require('./utils/config');

const { PORT = 3000 } = process.env;

const app = express();

app.use(requestLogger);
app.use(cors());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(limiter);

app.use(helmet());

app.use(router);

app.use(errorLogger);
app.use(errors());

app.use(centralHandlerError);

mongoose.connect(dataMovies);

app.listen(PORT);
