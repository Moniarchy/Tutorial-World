var express = require('express');
var logger = require('morgan');
var exphbs = require('express3-handlebars');
var bodyParser = require('body-parser')
var passport = require('passport')

var initializePassport = require('./config/passport')
var db = require('./config/db')

var home = require( './routes/index' );
var todos = require( './routes/todos' );
var about = require( './routes/about' );
var test = require( './routes/test' );
var auth = require( './routes/authentication' );

var app = express();

app.use( passport.initialize() );
app.use( passport.session() );

app.use(logger('dev'));

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use( bodyParser.json() )
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use( '/', home );
app.use( '/todos', todos );
app.use( '/about', about );
app.use( '/test', test );
app.use( '/auth', auth );

app.use('/public', express.static('public'));

var port = Number( process.env.PORT || 5000 );
var connectionString = (
  process.env.MONGO_CONNECTION_STRING ||
  'mongodb://localhost:27017/todos'
)

db.connect( connectionString, function( err ) {
  if ( err ) {
    console.log( 'Unable to connect to Mongo.', err )
    process.exit(1)
  } else {
    initializePassport();
    app.listen(port, function() {
      console.log('Listening on port ' + port + '...')
    })
  }
})
