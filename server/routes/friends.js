var express = require('express');
var router = express.Router();
var models = require('../models');

// get logged in user's friends
router.get('/', async function(req, res, next) {
    try {
      let friends = await models.Friend.findAll({where: {userId: 1}});
        // or user.getFriends() for a specific user object
      let result = friends.map((user) => {
        return models.friendToJSON(user);
      })
      console.log(result);
      res.json(result);
    } catch (err) {
      console.error(`Error: ${err}`);
    }
});

// add friend for current user
router.post('/', async ({body}, res, next) => {
    try {
      const friend = await models.Friend.create({name: body.name, phone: body.phone, userId: 1}); 
        // TO-DO: base userId on current user later
      res.status(200).json(models.friendToJSON(friend));
    } catch (err) {
      console.error(`Error: ${err}`);
    }
})

// delete a friend - this doesn't work, not sure why
// router.delete('/:phone', async (req, res, next) => {
//     try {
//         console.log(req.params.phone);
//         await models.Friend.destroy({where: {
//             phone: parseInt(req.params.phone)
//         }});
//         res.status(200).json(`Deleted friend ${phone}`);
//     } catch (err) {
//         console.log(`Error: ${err}`);
//     }
// })

// edit a friend?

module.exports = router;
