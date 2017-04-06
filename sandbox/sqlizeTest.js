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

var Employer = sequelize.define('employer', {
  employerName: {
    type: Sequelize.STRING,
    field: 'employer_name'
  }
})

var Position = sequelize.define('position', {
  jobTitle: {
    type: Sequelize.STRING,
    field: 'job_title'
  },
  extPosID: {
    type: Sequelize.STRING,
    field: 'ext_pos_id'
  },
  location: {
    type: Sequelize.STRING,
    field: 'location'
  },
  appDate: {
    type: Sequelize.database,
    field: 'app_date'
  },
})
