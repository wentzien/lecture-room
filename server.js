const express = require('express');
const path = require('path');
const app = express();

app.use('/', express.static(__dirname + '/public'));
app.use('/lecture-room', express.static(__dirname + '/public'));

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`App listening on port ${port}...`));


