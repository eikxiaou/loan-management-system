const http = require('http');

const options = {
  hostname: 'localhost',
  port: 3000, // Change this to your server's port
  path: '/close', // You need to handle this route in your Express app
  method: 'GET'
};

const req = http.request(options, (res) => {
  console.log(`Server stopped with response code: ${res.statusCode}`);
});

req.on('error', (error) => {
  console.error('Error stopping the server:', error.message);
});

req.end();
