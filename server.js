const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DB_PASSWORD);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('DB connection successfull 🤓🤘');
  });

// SERVER CONFIG
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is runing on port ${port} 😎🤘...`);
});
