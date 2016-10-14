var express = require('express');
var app = express();

var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/public/views');

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// index route
app.get('/', function(req, res){
    res.render('index.html');
});

app.listen(port);
console.log('Server running on port: ' + port);