'use strict';

const bluebird = require('bluebird');
const fsProm = bluebird.promisifyAll(require('fs'));
const xport = module.exports = {};

// logProm('test')
const loadEmployerRecord = function(record) {
  ;
  return new Promise((res, rej) => {
    res(console.log(record))
    .catch(err => rej(err))
})
}

xport.readEmployerJSON = (file) => {
  console.log('Employer: ', file);
  return fsProm.readFileAsync(`${__dirname}/../public/data/${file}`)
  .then(data => JSON.parse(data.toString().trim()))
  .then(fd => fd.map(loadEmployerRecord))
}
