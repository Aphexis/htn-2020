var express = require('express');
var router = express.Router();
var models = require('../models');

// GET all users
router.get('/', async function(req, res, next) {
  try {
    let users = await models.User.findAll();
    let result = users.map((user) => {
      return models.userToJSON(user);
    })
    console.log(result);
    res.json(result);
  } catch (err) {
    console.error(`Error: ${err}`)
  }
});

// GET specific user (by username?)
router.get('/:username', async function(req, res, next) {
  console.log('here')
  try {
    let user = await models.User.findOne({username: req.params.username});
    let result = models.userToJSON(user);
    console.log(result);
    res.status(200).json(result);
  } catch (err) {
    console.error(`Error: ${err}`)
  }
});

// POST new user (username, password)
router.post('/', async ({body}, res, next) => {
  try {
    const new_user = await models.User.create({username: body.username, password: body.password, phone: body.phone}); 
      // TO-DO: pw hashing later
    res.status(200).json(models.userToJSON(new_user));
  } catch (err) {
    console.error(`Error: ${err}`)
  }
})

// set user preferences

// add user images?

module.exports = router;
