const config = require('dbConfig.json');
const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');

module.exports = db = {
    students: this.students,
    teachers: this.teachers,
    parents: this.parents
};

initialize();

async function initialize() {
    // create db if it doesn't already exist
    const { host, user, password, database } = config.database;
    const connection = await mysql.createConnection({ host, user, password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

    //connect to db
    const sequelize = new Sequelize(database, user, password, { dialect: 'mysql' });

    //init models and add them to the exported db object
     db.students =  require('../routes/student/student.model')(sequelize);
     db.parents = require('../routes/parent/parent.model')(sequelize);
     db.teachers =  require('../routes/teacher/teacher.model')(sequelize);
     db.courses = require('../routes/courses/courses.model')(sequelize);
     db.assignment = require('../routes/assignment/assig.model')(sequelize);
    
    //Relations
    db.parents.belongsTo(db.students);
    db.students.hasOne(db.parents);
    db.courses.belongsTo(db.students);
    db.students.hasMany(db.courses);
    db.courses.belongsTo(db.teachers);
    db.teachers.hasMany(db.courses);

        //assignment
        db.assignment.belongsTo(db.teachers);
        db.teachers.hasMany(db.assignment);
        db.assignment.belongsTo(db.parents);
        db.parents.hasMany(db.assignment);
        db.assignment.belongsTo(db.students);
        db.students.hasMany(db.assignment);

    // sync all models with database
    await sequelize.sync();
}