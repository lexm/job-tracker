'use strict';

const bluebird = require('bluebird');
const fsProm = bluebird.promisifyAll(require('fs'));
const xport = module.exports = {};

// logProm('test')
const loadTestRecord = function(record) {
  // const sqlVals = [record.EmpName]
  // const sqlString = `INSERT INTO
  //                    Employer("EmpName")
  //                    VALUES($1);`
  const sqlVals = [record.category]
  const sqlString = `SELECT title FROM articles WHERE category = $1;`
  // console.log(record)
  console.log('sqlVals: ', sqlVals)
  return new Promise((res, rej) => {
    res(pool.query(sqlString, sqlVals))
    .catch(err => rej(err))
})
}

xport.readTestJSON = (file) => {
  console.log('Employer: ', file);
  return fsProm.readFileAsync(`${__dirname}/../public/data/${file}`)
  .then(data => JSON.parse(data.toString().trim()))
  .then(fd => fd.map(loadTestRecord))
}
