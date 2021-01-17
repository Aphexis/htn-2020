var express = require('express');
var router = express.Router();
var models = require('../models');

// GET task by id
router.get('/one/:id', async function(req, res, next) {
    console.log('task by id');
    try {
      let task = await models.Task.findOne({id: req.params.id});
      let result = models.taskToJSON(task);
      console.log(result);
      res.status(200).json(result);
    } catch (err) {
      console.error(`Error: ${err}`)
    }
});

// get tasks by status & current user (active, complete, failed)
router.get('/:status', async function(req, res, next) {
    try {
      let tasks = await models.Task.findAll({where: {
          userId: 1, // TO-DO: Use logged in user
          status: req.params.status,
      }});
        // or user.getFriends() for a specific user object
      let result = tasks.map((user) => {
        return models.friendToJSON(user);
      })
      console.log(result);
      res.json(result);
    } catch (err) {
      console.error(`Error: ${err}`);
    }
});

// add a task (name, deadline, friend)
router.post('/', async ({body}, res, next) => {
    try {
        // find friend?
        const task = await models.Task.create({
            name: body.name,
            userId: 1,
            friendId: body.friendId,
            deadline: body.deadline,
            status: 'active'
        });
        res.status(200).json(taskToJSON(task));
    } catch (err) {
        console.error(`Error: ${err}`);
    }
})

// edit a task (deadline, name, friend)
router.patch('/edit/:id', async ({body, params}, res, next) => {
    try {
        let updatedTask = {};
        if (body.name) updatedTask.name = body.name;
        if (body.deadline) updatedTask.deadline = body.deadline;
        if (body.friendId) updatedTask.friendId = body.friendId;
        await models.Task.update(updatedTask, {
            where: {id: params.id}
        });
        const task = await models.Task.findOne({where: {id: params.id}});
        res.status(200).json(taskToJSON(task));
    } catch (err) {
        console.error(`Error: ${err}`);
    }
})

// complete a task
router.patch('/complete/:id', async ({body, params}, res, next) => {
    try {
        await models.Task.update({status: 'complete'}, {
            where: {id: params.id}
        });
        const task = await models.Task.findOne({where: {id: params.id}});
        res.status(200).json(taskToJSON(task));
    } catch (err) {
        console.error(`Error: ${err}`);
    }
})

// fail a task
router.patch('/fail/:id', async ({body, params}, res, next) => {
    try {
        await models.Task.update({status: 'failed'}, {
            where: {id: params.id}
        });
        const task = await models.Task.findOne({where: {id: params.id}});
        res.status(200).json(taskToJSON(task));
    } catch (err) {
        console.error(`Error: ${err}`);
    }
})

module.exports = router;
