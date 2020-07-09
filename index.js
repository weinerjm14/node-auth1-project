const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);
const db = require('./data/dbConfig');
const usersRouter = require('./users/usersRouter');

const server = express();
const port = process.env.PORT || 5000;

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(
  session({
    // name: 'proj',
    resave: false,
    saveUninitialized: true,
    secret: `you can't see me`,
    store: new KnexSessionStore({
      knex: db,
      createtable: true,
    }),
  })
);

server.use('/api', usersRouter);

server.use((err, req, res, next) => {
  console.log(err);

  res.status(500).json({
    message: 'Something went wrong',
  });
});

server.listen(port, () => {
  console.log(`Running at http://localhost:${port}`);
});
