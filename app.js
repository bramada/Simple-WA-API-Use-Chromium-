const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const router1 = require("./routers/wa");

app.use(bodyParser.json());
app.use('/', router1);

app.listen(port, () => {
  console.log(`App alive on port ${port}`);
})