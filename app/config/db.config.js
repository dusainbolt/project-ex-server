module.exports = {
    HOST: 'localhost',
    USER: 'root',
    e: 'ee',
    DB: 'project',
    dialect: 'mysql',
    PASSWORD: '12345678',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
};
