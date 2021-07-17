module.exports = (sequelize, Sequelize) => {
  const Project = sequelize.define('project', {
    title: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    teacher: {
      type: Sequelize.STRING,
    },
    nameStudent: {
      type: Sequelize.STRING,
    },
    codeStudent: {
      type: Sequelize.STRING,
    },
    avatarStudent: {
      type: Sequelize.STRING,
    },
    classStudent: {
      type: Sequelize.STRING,
    },
    file: {
      type: Sequelize.STRING,
    },
    type: {
      type: Sequelize.INTEGER,
    },
  });

  return Project;
};
