'use strict'

const bluebird = require('bluebird')
const fsProm = bluebird.promisifyAll(require('fs'))
const pg = require('pg')
const Pool = pg.Pool
const ops = module.exports = {}

const Pool = new Pool({
  user: process.env.USER,
  password: '';
  host: 'localhost',
  database: process.env.USER,
  max: 10,
  idleTimeoutMillis: 1000
})

const loadEmployerRecord = function(record) {
  const sqlVals = [record.EmpName]
  const sqlString = 'INSERT INTO
                     Employer(EmpName)
                     VALUES($1);'
  return new Promise((res, rej) => {
    res(pool.query(sqlString, sqlVals))
    .catch(err => rej(err))
  })
}

const loadSourceRecord = function(record) {
  const sqlVals = [record.SourceName, record.SourceURL]
  const sqlString = 'INSERT INTO
                     LeadSource(SourceName, SourceURL)
                     VALUES($1, $2);'
  return new Promise((res, rej) => {
    res(pool.query(sqlString, sqlVals))
    .catch(err => rej(err))
  })
}

/* keeping this around as a template
ops.createTable = function() {
  return new Promise((res, rej) => {
    const sqlCreate = `
    CREATE TABLE IF NOT EXISTS
    tname (
    );`
    res(
      pool.query(sqlCreate)
      .then(() => console.log('create tname success'))
      .catch(err => rej(err))
    )
  })
}
*/

ops.createEmployerTable = function() {
  return new Promise((res, rej) => {
    const sqlCreate = `
    CREATE TABLE IF NOT EXISTS
    Employer (
      id SERIAL PRIMARY KEY,
      EmpName VARCHAR(255) NOT NULL
    );`
    res(
      pool.query(sqlCreate)
      .then(() => console.log('create Employer table success'))
      .catch(err => rej(err))
    )
  })
}

ops.createLeadSourceTable = function() {
  return new Promise((res, rej) => {
    const sqlCreate = `
    CREATE TABLE IF NOT EXISTS
    LeadSource (
      id SERIAL PRIMARY KEY,
      SourceName VARCHAR(255) NOT NULL,
      SourceURL VARCHAR(255)
    );`
    res(
      pool.query(sqlCreate)
      .then(() => console.log('create LeadSource table success'))
      .catch(err => rej(err))
    )
  })
}

pool.on('error' e => console.error(e))

ops.readEmployerJSON = (file) => {
  return fsProm.readFileAsync(`${__dirname}/../public/data/${file}`)
  .then(data => JSON.parse(data.toString().trim()))
  .then(fd => fd.map(loadEmployerRecord))
  .then(proms => Promise.all(proms))
  .then(() = console.log('Employer files loaded successfully'))
  .catch(err => console.error(err))
}

ops.readSourceJSON = (file) => {
  return fsProm.readFileAsync(`${__dirname}/../public/data/${file}`)
  .then(data => JSON.parse(data.toString().trim()))
  .then(fd => fd.map(loadSourceRecord))
  .then(proms => Promise.all(proms))
  .then(() = console.log('LeadSource files loaded successfully'))
  .catch(err => console.error(err))
}
