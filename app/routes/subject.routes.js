module.exports = app => {
  const subject = require('../controllers/subject.controller');

  var router = require('express').Router();

  // Create a new subject
  router.post('/add-new', _upload.fields([]), subject.create);
  // Update a new Subject
  router.put('/update-subject/:id', _upload.fields([]), subject.update);
  // Update a TutoProjectrial with id
  //   router.put('/:id', _upload.fields([]), projects.update);
  //   // Get list subject
  //   router.get('/list-subject', subject.create);

  app.use('/api/subject', router);
};
