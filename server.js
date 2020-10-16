const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('public'));

app.get('/', function(req, res){
    res.sendFile('index.html');
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`App listening on port ${port}...`));


