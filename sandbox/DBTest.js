'use strict';

const bluebird = require('bluebird');
const fsProm = bluebird.promisifyAll(require('fs'));
const pg = require('pg');
const Pool = pg.Pool;
const xport = module.exports = {};

const pool = new Pool({
  user: process.env.USER,
  password: '',
  host: 'localhost',
  database: process.env.USER,
  max: 10,
  idleTimeoutMillis: 1000
})

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
    var sponse = pool.query(sqlString, sqlVals)
    console.log(sponse);
    res(sponse)
    .catch(err => rej(err))
})
}

xport.readTestJSON = (file) => {
  console.log('Test file: ', file);
  return fsProm.readFileAsync(`${__dirname}/${file}`)
  .then(data => JSON.parse(data.toString().trim()))
  .then(fd => fd.map(loadTestRecord))
  .then(proms => Promise.all(proms))
  .then(qres => console.log('query result:', qres.map((cur) => cur.rows[0])))
  .catch(err => console.error(err))
}
