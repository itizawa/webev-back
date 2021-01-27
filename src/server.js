const express  =require("express");
const mongoose = require( 'mongoose');

const { env } = require( 'process');
const cors = require( 'cors');

const apiRoute = require( './routes/index')

const port = env.PORT || 8000;
const corsOptions = {
  origin: 'http://localhost:3000',
};

const app = express();
app.use(cors(corsOptions));

mongoose.connect("mongodb://localhost:27017/webev", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
}, (dbErr) => {
  if (dbErr) {
    throw new Error();
  }
  else {
    console.log('db connected');
  }

  app.use('/api/v1/', apiRoute);

  app.listen(port, () => {
    console.log(`listening on port ${port}`);
  });
});