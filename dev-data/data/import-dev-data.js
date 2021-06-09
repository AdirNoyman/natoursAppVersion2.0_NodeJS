const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('../../models/tourModal');
dotenv.config({ path: './config.env' });

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

// Read JSON file
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

// Import data into the Mongo DB
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data successfully loaded 🤓🤘');
  } catch (err) {
    console.log('Error importing the dev data 😩 ' + err);
  }

  process.exit();
};

// Delete all data from collection in the MongoDB
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data successfully deleted 😈🤘');
  } catch (err) {
    console.log('Error deleting the dev data 😩 ' + err);
  }

  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}

console.log(process.argv);
