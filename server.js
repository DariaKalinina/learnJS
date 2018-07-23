let http = require('http');
let static = require('node-static');
let file = new static.Server('.', {
  cache: 0,
  headers: {
    'Access-Control-Allow-Origin': '*',
    // 'Access-Control-Allow-Methods': 'GET,PUT',
    // 'Access-Control-Allow-Headers': 'Content-Type'
  }
});

function accept(req, res) {

  if (req.url.startsWith('/api')) {
    setTimeout(() => {
      file.serve(req, res);
    }, 1000);
  } else {
    file.serve(req, res);
  }

}

http.createServer(accept).listen(3000);

console.log('Server running on port 3000');
