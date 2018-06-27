'use strict';

export default (req, res, next) => { // eslint-disable-line
  let error = {error: 'Resource Not Found'};
  res.statusCode = 404;
  res.statusMessage = 'Not Found';
  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify(error));
  res.end();
};