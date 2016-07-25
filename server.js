var express = require('express');
var app = express();
var logger = require('morgan');
var exphbs = require('express3-handlebars');

app.use(logger('dev'));

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));

app.set('view engine', 'handlebars');

app.get('/', function( request, response ){
  var luckyNumber = Math.round( Math.random() * 10);
  response.render('index', {
    luckyNumber: luckyNumber
  });
});

app.get('/about', function( request, response ){
  response.render('about');
});

app.use('/public', express.static('public'));

var port = Number( process.env.PORT || 5000 );
app.listen(port);