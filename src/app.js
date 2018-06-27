'use strict';

import express from 'express';
import cors from 'cors';

let app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

let server = false;

module.exports = {
  start: (port) => {
    if(!server) {
      server = app.listen(port, (err) => {
        if(err) {throw err;}
        console.log(`Server is running on PORT: ${port}`);
      });
    } else {
      console.log('Server is already running');
    }
  },
  
  stop: () => {
    server.close(() => {
      console.log('Server is off');
    });
  },
};