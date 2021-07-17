module.exports = app => {
    const projects = require('../controllers/project.controller.js');

    var router = require('express').Router();

    // Create a new Project
    router.post(
        '/',
        _upload.fields([
            { name: 'avatarStudent', maxCount: 1 },
            { name: 'file', maxCount: 1 },
        ]),
        projects.create
    );

    // Update a TutoProjectrial with id
    router.put(
        '/:id',
        _upload.fields([
            { name: 'avatarStudent', maxCount: 1 },
            { name: 'file', maxCount: 1 },
        ]),
        projects.update
    );

    // Retrieve a single Project with id
    router.get('/:id', projects.findOne);

    // Retrieve all Tutorials
    router.get('/', projects.findAll);

    // Delete a Tutorial with id
    router.delete('/:id', projects.delete);

    app.use('/api/projects', router);
};
