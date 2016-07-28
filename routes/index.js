var express = require('express');
var router = express.Router();

router.get( '/', function( request, response, next ) {
  response.render( 'index', { session: request.session.passport });
});

module.exports = router;
