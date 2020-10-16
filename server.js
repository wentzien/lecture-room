const express = require('express');
const app = express();

const port = process.env.PORT || 80;

app.use('/', express.static(__dirname + '/public'));

app.listen(port, () => {
    console.log(`server listening to ${port}...`);
});


