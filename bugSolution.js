const http = require('http');

const server = http.createServer((req, res) => {
  // Use async/await for cleaner error handling
  (async () => {
    try {
      await doSomethingAsync();
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Success!');
    } catch (err) {
      console.error('Error:', err); // Log the error for debugging
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Server Error');
    }
  })();
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