
'use strict'

/**
 * Module dependencies.
 */

let PassThrough = require('stream').PassThrough
let Emitter = require('component-emitter')
let words = require('random-words')
let sse = require('co-sse-events')
let write = require('koa-write')
let wait = require('co-wait')
let co = require('co')

/**
 * Exports `randomize`.
 */

module.exports = randomize;

/**
 * Send `times` or infinite different random
 * events at different intervals.
 *
 * @param {Number} times
 */

function randomize (times) {
  let events = new Emitter()
  times = times || Infinity
  let curr = 0

  // ms between each event
  let ms = Math.floor(Math.random() * 2000) + 100

  return function *() {
    // prevent stream from closing after 2 minutes
    this.req.setTimeout(Infinity)

    // set headers
    this.type = 'text/event-stream; charset=utf-8'
    this.set('Cache-Control', 'no-cache')
    this.set('Connection', 'keep-alive')

    // make body streamable
    this.body = PassThrough()

    // emit random events every `ms`
    let interval = setInterval(function () {
      events.emit(words(), words())
    }, ms)

    // send `events`
    co(function *() {
      let e

      while (e = yield sse(events)) {
        yield write(this, e.out);
        if (++curr == times) return this.body.end();
      }
    }).call(this, this.onerror)
  }
}