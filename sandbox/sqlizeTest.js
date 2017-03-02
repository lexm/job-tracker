'use strict';

var sequelize = new Sequelize(process.env.USER, process.env.USER, '', {
  host: 'localhost',
  dialect: 'postgres',

  pool: {
    max: 10,
    min: 0,
    idle: 10000
  }
});
