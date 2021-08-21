const { subject } = require('../models');
const db = require('../models');
const Subject = db.subject;

// Create and Save a new Tutorial
exports.create = async (req, res) => {
  try {
    console.log('TAO GOI HAM CREATE');

    const { body } = req;
    console.log(body.title);

    // Create a project
    const subject = {
      title: body.title,
      description: body.description,
      teacher: body.teacher,
      type: body.type,
    };
    // Save project in the database
    const data = await Subject.create(subject);
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while creating the Tutorial.',
    });
  }
};

// Update a project by the id in the request
exports.update = async (req, res) => {
  try {
    const { body, params } = req;

    // Get id project from params
    const { id } = params;

    // Create a project
    const subjectUpdate = {
      title: body.title,
      description: body.description,
      teacher: body.teacher,
      type: body.type,
    };
    // console.log(subjectUpdate);
    const data = await Subject.update(subjectUpdate, { where: { id } });
    return res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while creating the Tutorial.',
    });
  }
};
