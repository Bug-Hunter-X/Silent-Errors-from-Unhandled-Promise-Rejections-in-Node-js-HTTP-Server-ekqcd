const http = require('http');

const server = http.createServer((req, res) => {
  // Simulate an asynchronous operation that might fail
  doSomethingAsync().then(() => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Success!');
  }).catch(err => {
    // Unhandled promise rejection. Node.js will log a warning but the server won't crash.
    console.error('Error:', err);
    res.writeHead(500, {'Content-Type': 'text/plain'});
    res.end('Internal Server Error');
  });
});

function doSomethingAsync() {
  return new Promise((resolve, reject) => {
    // Simulate a random failure
    const random = Math.random();
    if (random < 0.5) {
      setTimeout(() => resolve(), 100);
    } else {
      setTimeout(() => reject(new Error('Something went wrong')), 100);
    }
  });
}

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});