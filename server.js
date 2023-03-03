const express = require('express');
const mongoose = require('mongoose');
const routes = require('./Routes/routes');
const app = express();

require('dotenv/config');

app.use(express.json());

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
  console.log('MongoDb Connected!');
});

app.use('/', routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`App listening on http://localhost:${PORT}`));
