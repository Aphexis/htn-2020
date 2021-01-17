var {Sequelize} = require('sequelize-cockroachdb');
var fs = require('fs');
const { DataTypes, Model } = require('sequelize-cockroachdb');
const { urlencoded } = require('express');

// Connect to CockroachDB through Sequelize.
var sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT,
    logging: false,
    dialectOptions: {
        ssl: {
            ca: fs.readFileSync('../certs/cc-ca.crt').toString()
        }
    }
});

sequelize.authenticate().then(() => {
    console.log('Authenticated to db');
})
.catch((err) => {
    console.log(`DB connection error: ${err}`);
})

Task = sequelize.define('tasks', {
    name: DataTypes.STRING,
    deadline: {
        type: DataTypes.DATE,
    },
    status: {
        type: DataTypes.STRING, // active, completed, or failed
    }
})

taskToJSON = (task) => {
    return {
        id: task.id,
        name: task.name,
        userId: task.userId,
        friend: task.friendId,
        // user: {
        //     id: task.user_id
        // },
        // friend: {
        //     id: task.friend_id
        // },
        deadline: task.deadline, // date parsing?
        status: task.status,
        createdAt: task.createdAt,
    }
}

User = sequelize.define('users', {
    // user_id: {
    //     type: DataTypes.INTEGER,
    //     primaryKey: true
    // },
    username: {
        type: DataTypes.STRING,
        unique: true,
    },
    password: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    // friends: DataTypes.ARRAY(DataTypes.INTEGER), // FKs
    data: DataTypes.JSONB,
})

userToJSON = (user) => {
    return {
        id: user.id,
        username: user.username,
        phone: user.phone,
        data: user.data,
    }
}

Friend = sequelize.define('friends', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        // defaultValue: 1,
    },
    name: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    // user_id: DataTypes.INTEGER,
})

friendToJSON = (friend) => {
    return {
        id: friend.id,
        name: friend.name,
        phone: friend.phone,
        userId: friend.userId // or user obj?
    }
}

Friend.belongsTo(User);
User.hasMany(Friend);
Task.belongsTo(User);
User.hasMany(Task);
Task.belongsTo(Friend, {foreignKey: {allowNull: true}});
Friend.hasMany(Task);

// sequelize.sync({
//     force: true
// })
// .then(() => {
//     return User.create({id: 1, username: 'Stephanie', password: 'asdf', phone: 6479185272});
// })
// .then(function () {
//     // Insert two rows into the "friends" table.
//     return Friend.bulkCreate([{
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
//     return Task.bulkCreate([
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
//     return Friend.findAll();
// })
// .then(function (friends) {
//     // Print out the balances.
//     friends.forEach(function (account) {
//         console.log(account.id + ' ' + account.name + ' ' + account.phone);
//     });
//     // process.exit(0);
// })
// .then(() => User.findOne({where: {username: 'Stephanie'}}))
// .then((user) => user.getFriends())
// .then((friends) => friends.forEach((friend) => console.log(friend.name)))
// .then(() => sequelize.close())
// .catch(function (err) {
//     console.error('error: ' + err.message);
//     process.exit(1);
// });

/**
 * Task: id, user, friend (nullable), deadline, status (current, completed, failed)
 * User: name, password, phone, friends, data (personalization)
 * Friend: name, phone, user
 */

module.exports = {
    sequelize, Sequelize, User, Task, Friend, userToJSON, taskToJSON, friendToJSON
}
