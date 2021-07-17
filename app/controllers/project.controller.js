const db = require('../models');
const fs = require('fs');
const Project = db.projects;
const Op = db.Sequelize.Op;

const rootUploadAvatar = `/uploads/avatars`;
const rootUploadDoc = `/uploads/docs`;

const getPagination = (page, size) => {
  const limit = size ? +size : 10;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: projects } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, projects, totalPages, currentPage };
};

// Retrieve all Tutorials from the database.
exports.findAll = async (req, res) => {
  try {
    const { totalPages, currentPage, title } = req.query;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    const { limit, offset } = getPagination(currentPage, totalPages);

    const data = await Project.findAndCountAll({ where: condition, order: [['createdAt', 'DESC']], limit, offset });
    const response = getPagingData(data, currentPage, limit);
    res.send(response);
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while creating the Tutorial.',
    });
  }
};

const uploadFile = async (file, dir) => {
  let fileName = '';
  if (file.size) {
    // Create file name save
    fileName = `${dir}/${Date.now()}${file.originalname}`;

    // write file to storage
    fs.writeFileSync(`${_appRoot}/public${fileName}`, file.buffer, 'binary');
  }
  return fileName;
};

// Create and Save a new Tutorial
exports.create = async (req, res) => {
  try {
    const { files, body } = req;
    // Get file data from files request
    const avatarStudentFile = files['avatarStudent'];
    const fileUpload = files['file'];

    let fileUrl = '';
    if (fileUpload && fileUpload.length) {
      // Upload file data
      fileUrl = await uploadFile(fileUpload[0], rootUploadDoc);
    }

    let avatarUrl = '';
    if (avatarStudentFile && avatarStudentFile.length) {
      // Upload file data
      avatarUrl = await uploadFile(avatarStudentFile[0], rootUploadAvatar);
    }

    // Create a project
    const project = {
      title: body.title,
      description: body.description,
      teacher: body.teacher,
      file: fileUrl,
      nameStudent: body.nameStudent,
      codeStudent: body.codeStudent,
      classStudent: body.classStudent,
      avatarStudent: avatarUrl,
      type: body.type || _constant.STATUS_ACTIVE,
    };

    // Save project in the database
    const data = await Project.create(project);

    // Response data
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
    const { files, body, params } = req;

    // Get id project from params
    const { id } = params;

    let avatarUrl = '';
    if (!body.avatarStudent && files['avatarStudent'] && files['avatarStudent'].length) {
      // Get file data from files request
      const avatarStudentFile = files['avatarStudent'][0];
      avatarUrl = await uploadFile(avatarStudentFile, rootUploadAvatar);
    }

    let fileUrl = '';
    if (!body.file && files['file'] && files['file'].length) {
      // Get file data from files request
      const fileUpload = files['file'][0];
      fileUrl = await await uploadFile(fileUpload, rootUploadDoc);
    }

    // Create a update data Project
    const project = {
      title: body.title,
      description: body.description,
      teacher: body.teacher,
      file: fileUrl || body.file,
      nameStudent: body.nameStudent,
      codeStudent: body.codeStudent,
      classStudent: body.classStudent,
      type: body.type,
      avatarStudent: avatarUrl || body.avatarStudent,
    };

    // Update Project to database
    const data = await Project.update(project, { where: { id } });
    if (data[0]) {
      // Response data
      return res.send(await Project.findByPk(id));
    }
    return res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while creating the Tutorial.',
    });
  }
};

// Find a single Project with an id
exports.findOne = async (req, res) => {
  try {
    const id = req.params.id;

    // get project data from id
    const data = await Project.findByPk(id);

    // Response data
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while creating the Tutorial.',
    });
  }
};

// Delete a Tutorial with the specified id in the request
exports.delete = async (req, res) => {
  try {
    const id = req.params.id;

    // get project data from id
    const data = await Project.destroy({ where: { id } });

    // Response data
    if (data === 1) {
      return res.send(true);
    }
    return res.send(false);
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while creating the Tutorial.',
    });
  }

  // Tutorial.destroy({
  //     where: { id: id },
  // })
  //     .then(num => {
  //         if (num == 1) {
  //             res.send({
  //                 message: 'Tutorial was deleted successfully!',
  //             });
  //         } else {
  //             res.send({
  //                 message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`,
  //             });
  //         }
  //     })
  //     .catch(err => {
  //         res.status(500).send({
  //             message: 'Could not delete Tutorial with id=' + id,
  //         });
  //     });
};
