var Sequelize = require('sequelize-cockroachdb');
var fs = require('fs');
const { DataTypes, Model } = require('sequelize-cockroachdb');

// Connect to CockroachDB through Sequelize.
var sequelize = new Sequelize('pastel-insect-128.orelse', 'dreamteam', 'dreamteam!!!', {
    host: 'free-tier.gcp-us-central1.cockroachlabs.cloud',
    dialect: 'postgres',
    port: 26257,
    logging: false,
    dialectOptions: {
        ssl: {
            ca: fs.readFileSync('../certs/cc-ca.crt').toString()
        }
    }
});

module.exports.Task = sequelize.define('tasks', {
    // task_id: {
    //     type: DataTypes.INTEGER,
    //     primaryKey: true
    // },
    user_id: {
        type: DataTypes.INTEGER,
        // FK
    },
    friend_id: {
        type: DataTypes.INTEGER,
        // FK
    },
    deadline: {
        type: DataTypes.DATE,
    },
    status: {
        type: DataTypes.STRING, // current, completed, or failed
    }
})

// Model.exports.taskToJSON = (task) => {
//     return {
//         id: parseInt(task.task_id),
//         user: {
//             id: task.user_id
//         },
//         friend: {
//             id: task.friend_id
//         },
//         deadline: task.deadline, // date parsing?
//         status: task.status
//     }
// }

module.exports.User = sequelize.define('users', {
    // user_id: {
    //     type: DataTypes.INTEGER,
    //     primaryKey: true
    // },
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    friends: DataTypes.ARRAY(DataTypes.INTEGER), // FKs
    data: DataTypes.JSONB,
})

module.exports.Friend = sequelize.define('friends', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: DataTypes.STRING,
    phone: DataTypes.INTEGER,
})

module.exports.Friend.sync({
    force: true
})
.then(function () {
    // Insert two rows into the "friends" table.
    return module.exports.Friend.bulkCreate([{
            id: 1, // how to make id auto?
            name: 'Evelyn',
            phone: 4167799080,
        },
        {
            name: 'Julia',
            phone: 6473818828
        }
    ]);
})
.then(function () {
    // Retrieve accounts.
    return module.exports.Friend.findAll();
})
.then(function (friends) {
    // Print out the balances.
    friends.forEach(function (account) {
        console.log(account.id + ' ' + account.name + ' ' + account.phone);
    });
    process.exit(0);
})
.catch(function (err) {
    console.error('error: ' + err.message);
    process.exit(1);
});

/**
 * Task: id, user, friend (nullable), deadline, status (current, completed, failed)
 * User: name, password, phone, friends, data (personalization)
 * Friend: name, phone
 */

// Define the Account model for the "accounts" table.
// var Account = sequelize.define('accounts', {
//     id: {
//         type: Sequelize.INTEGER,
//         primaryKey: true
//     },
//     balance: {
//         type: Sequelize.INTEGER
//     }
// });

// // Create the "accounts" table.
// Account.sync({
//         force: true
//     })
//     .then(function () {
//         // Insert two rows into the "accounts" table.
//         return Account.bulkCreate([{
//                 id: 1,
//                 balance: 1000
//             },
//             {
//                 id: 2,
//                 balance: 250
//             }
//         ]);
//     })
//     .then(function () {
//         // Retrieve accounts.
//         return Account.findAll();
//     })
//     .then(function (accounts) {
//         // Print out the balances.
//         accounts.forEach(function (account) {
//             console.log(account.id + ' ' + account.balance);
//         });
//         process.exit(0);
//     })
//     .catch(function (err) {
//         console.error('error: ' + err.message);
//         process.exit(1);
//     });

    
module.exports.sequelize = sequelize;
module.exports.Sequelize = Sequelize;
