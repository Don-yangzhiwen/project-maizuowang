var express = require('express');
var router = express.Router();
var http = require('http');
var request = require('request');

var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://127.0.0.1:27017/project';

router.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/home', function (req, res) {
    var time = new Date().getTime();
    http.get('http://m.maizuo.com/v4/api/billboard/home?__t=' + time, function (data) {
        var temp = '';
        data.on('data', function (chunk) {
            temp += chunk;
        })
        data.on('end', function () {
            res.send(temp);
        })
    })
});

router.get('/now-playing', function (req, res) {
    var time = new Date().getTime();
    http.get('http://m.maizuo.com/v4/api/film/now-playing?__t=' + time + '&page=1&count=5', function (data) {
        var temp = '';
        data.on('data', function (chunk) {
            temp += chunk;
        })
        data.on('end', function () {
            res.send(temp);
        })
    })
});

router.get('/coming-soon', function (req, res) {
    var time = new Date().getTime();
    http.get('http://m.maizuo.com/v4/api/film/coming-soon?__t=' + time + '&page=1&count=3', function (data) {
        var temp = '';
        data.on('data', function (chunk) {
            temp += chunk;
        })
        data.on('end', function () {
            res.send(temp);
        })
    })
});

router.get('/film/now-playing', function (req, res) {

    http.get('http://m.maizuo.com/v4/api/film/now-playing?page=1&count=7', function (data) {
        var temp = '';
        data.on('data', function (chunk) {
            temp += chunk;
        })
        data.on('end', function () {
            res.send(temp);
        })
    })
});

router.get('/film/coming-soon', function (req, res) {

    http.get('http://m.maizuo.com/v4/api/film/coming-soon?page=1&count=7', function (data) {
        var temp = '';
        data.on('data', function (chunk) {
            temp += chunk;
        })
        data.on('end', function () {
            res.send(temp);
        })
    })
});

router.get('/cinema', function (req, res) {
    var time = new Date().getTime();
    http.get('http://m.maizuo.com/v4/api/cinema?__t=' + time, function (data) {
        var temp = '';
        data.on('data', function (chunk) {
            temp += chunk;
        })
        data.on('end', function () {
            res.send(temp);
        })
    })
});

router.get('/details', function (req, res) {
    var time = new Date().getTime();
    var id = req.query.id;
    // console.log(req.query);
    http.get('http://m.maizuo.com/v4/api/film/' + id + '?__t=' + time, function (data) {
        var temp = '';
        data.on('data', function (chunk) {
            temp += chunk;
        })
        data.on('end', function () {
            res.send(temp);
        })
    })
});

router.get('/storage', function (req, res) {
    console.log(req.query);
    var text = req.query.text;
    var password = req.query.pw;
    // console.log(text);
    MongoClient.connect(DB_CONN_STR, function (err, db) {
        if (err) {
            console.log(err);
        } else {
            var data = {
                text: text,
                password: password
            }
            console.log(data);
            // console.log('=================');
            var coll = db.collection('maizuowang');
            //save()写入一组数据
            coll.save(data, function (err, arr) {
                if (err) {
                    console.log('失败!');
                } else {
                    console.log('存储成功!');
                    res.send('存储成功!');
                }
            });
            db.close();
        }
    })

});

module.exports = router;
