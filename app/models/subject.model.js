module.exports = (sequelize, Sequelize) => {
  const Subject = sequelize.define('subject', {
    title: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    teacher: {
      type: Sequelize.STRING,
    },
    type: {
      type: Sequelize.INTEGER,
    },
  });

  return Subject;
};
