var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var scraper = require('webScraper');
var cheerio = require('cheerio');
var request = require('request');
var Q = require('q');

var routes = require('./routes/index');
var app = express();

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
  
});


var io = require('socket.io').listen(server);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'bower_components')));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', routes);


//handle sockets
io.on('connection', function (socket) {
    console.log('connected');
    socket.on('scrape', function (data) {
        if (data.function) {
            if (data.function.length !== 0) {
                eval("var crawlModule = " + data.function);
            } else {
                var crawlModule = null;
            }
        } else {
            var crawlModule = null;
        }

        scraper.crawlForData(data.url, data.class,
            function (data) {
                socket.emit('scrape done', data);
            },
            crawlModule
        )
    });

    socket.emit('connected',{connected:"connected"});
});




/// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;