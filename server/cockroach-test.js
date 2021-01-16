// var Sequelize = require('sequelize-cockroachdb');
// var fs = require('fs');
// const { DataTypes, Model } = require('sequelize-cockroachdb');

// // Connect to CockroachDB through Sequelize.
// var sequelize = new Sequelize('pastel-insect-128.orelse', 'dreamteam', 'dreamteam!!!', {
//     host: 'free-tier.gcp-us-central1.cockroachlabs.cloud',
//     dialect: 'postgres',
//     port: 26257,
//     logging: false,
//     dialectOptions: {
//         ssl: {
//             ca: fs.readFileSync('../certs/cc-ca.crt').toString()
//         }
//     }
// });

// module.exports.Task = sequelize.define('tasks', {
//     name: DataTypes.STRING,
//     deadline: {
//         type: DataTypes.DATE,
//     },
//     status: {
//         type: DataTypes.STRING, // current, completed, or failed
//     }
// })

// // Model.exports.taskToJSON = (task) => {
// //     return {
// //         id: parseInt(task.task_id),
// //         user: {
// //             id: task.user_id
// //         },
// //         friend: {
// //             id: task.friend_id
// //         },
// //         deadline: task.deadline, // date parsing?
// //         status: task.status
// //     }
// // }

// module.exports.User = sequelize.define('users', {
//     // user_id: {
//     //     type: DataTypes.INTEGER,
//     //     primaryKey: true
//     // },
//     username: {
//         type: DataTypes.STRING,
//         unique: true,
//     },
//     password: DataTypes.STRING,
//     phone: DataTypes.INTEGER,
//     // friends: DataTypes.ARRAY(DataTypes.INTEGER), // FKs
//     data: DataTypes.JSONB,
// })

// module.exports.Friend = sequelize.define('friends', {
//     id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//         // defaultValue: 1,
//     },
//     name: DataTypes.STRING,
//     phone: DataTypes.INTEGER,
//     // user_id: DataTypes.INTEGER,
// })

// module.exports.Friend.belongsTo(module.exports.User);
// module.exports.User.hasMany(module.exports.Friend);
// module.exports.Task.belongsTo(module.exports.User);
// module.exports.User.hasMany(module.exports.Task);
// module.exports.Task.belongsTo(module.exports.Friend, {foreignKey: {allowNull: true}});
// module.exports.Friend.hasMany(module.exports.Task);

// sequelize.sync({
//     force: true
// })
// .then(() => {
//     return module.exports.User.create({id: 1, username: 'Stephanie', password: 'asdf', phone: 6479185272});
// })
// .then(function () {
//     // Insert two rows into the "friends" table.
//     return module.exports.Friend.bulkCreate([{
//             id: 1, // how to make id auto?
//             name: 'Evelyn',
//             phone: 4167799080,
//             userId: 1,
//         },
//         {
//             id: 2,
//             name: 'Julia',
//             phone: 6473818828,
//             userId: 1,
//         }
//     ]);
// })
// .then(() => {
//     return module.exports.Task.bulkCreate([
//         {
//             name: 'Task 1',
//             friendId: 1,
//             status: 'active'
//         },
//         {
//             name: 'Task 2',
//             friendId: 2,
//             status: 'active'
//         }
//     ])
// })
// .then(function () {
//     // Retrieve accounts.
//     return module.exports.Friend.findAll();
// })
// .then(function (friends) {
//     // Print out the balances.
//     friends.forEach(function (account) {
//         console.log(account.id + ' ' + account.name + ' ' + account.phone);
//     });
//     // process.exit(0);
// })
// .then(() => module.exports.User.findOne({where: {username: 'Stephanie'}}))
// .then((user) => user.getFriends())
// .then((friends) => friends.forEach((friend) => console.log(friend.name)))
// .then(() => sequelize.close())
// .catch(function (err) {
//     console.error('error: ' + err.message);
//     process.exit(1);
// });

// /**
//  * Task: id, user, friend (nullable), deadline, status (current, completed, failed)
//  * User: name, password, phone, friends, data (personalization)
//  * Friend: name, phone, user
//  */

// module.exports.sequelize = sequelize;
// module.exports.Sequelize = Sequelize;
