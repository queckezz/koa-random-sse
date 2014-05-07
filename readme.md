
# koa-random-sse

Sends random sse events, mainly for testing applications or modules like [segmentio/sse](https://github.com/segmentio/sse).

## Installation

```bash
$ npm install koa-random-sse
```

## Example

```js
var app = koa()
  .use(get('/', randomize(4)))

/**
 * Sents four random events in random intervals
 *
 * ->
 *   event: shout
 *   data: suggest
 *
 *   event: plan
 *   data: knowledge
 */
```

## Test

```bash
$ make test
```

## License

MIT