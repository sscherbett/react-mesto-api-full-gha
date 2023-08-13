require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const routes = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 4000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
const app = express();
app.use(cors({ origin: 'http://localhost:3001' }));

app.use(express.json());
app.use(requestLogger);
app.use(routes);
app.use(errorLogger);

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: false,
});

app.use(errors());
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
