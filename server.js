var express = require('express');
var logger = require('morgan');
var exphbs = require('express3-handlebars');

var home = require( './routes/index' );
var todos = require( './routes/todos' );
var about = require( './routes/about' );

var app = express();

app.use(logger('dev'));

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));

app.set('view engine', 'handlebars');

app.use( '/', home );
app.use( '/todos', todos );
app.use( '/about', about );

app.use('/public', express.static('public'));

var port = Number( process.env.PORT || 5000 );
app.listen(port);