const express = require('express');

const server = express();

server.use(logger);
server.use(express.json());

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//custom middleware

function logger(req, res, next) {
  const date = new Date();
  console.log(`${req.method} to ${req.path} at`, date);
  next();
}

module.exports = server;
