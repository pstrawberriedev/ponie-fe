const express = require('express');
const app = express();

app.get('/', function(req, res) {
  res.send('hey welcome 2express byich');
});

app.listen(3000, function() {
  console.log('server running');
});
