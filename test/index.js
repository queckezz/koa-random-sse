
'use strict'

var request = require('supertest')
var get = require('koa-route').get
var koa = require('koa')
var randomize = require('../')
var words = require('random-words').wordList

describe('koa-sse-random', function () {
  it('should set the appropiate headers', function (done) {
    var app = koa()
      .use(get('/', randomize(2)))

    request(app.listen())
      .get('/')
      .expect('Cache-Control', 'no-cache')
      .expect('Connection', 'keep-alive')
      .expect('Content-Type', 'text/event-stream; charset=utf-8')
      .end(done)
  })

  it('should send random events', function (done) {
    var app = koa()
      .use(get('/', randomize(2)))

    var req = request(app.listen())
      .get('/')
      .end(function (err, res) {
        if(err) throw err;
        res.text.should.containEql('event:')
        res.text.should.containEql('data:')
        res.text.should.containEql('\n\n')
        done()
      })
  })
})