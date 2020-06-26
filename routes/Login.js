const express = require('express');
const { Pool } = require('pg');
const md5 = require('md5');

// 	postgres://rdvnbpfq:Rg_vbAeEbvkpiFnl_QsAMXzwYxa4qvvA@ruby.db.elephantsql.com:5432/rdvnbpfq
const pool = new Pool({
    user: 'gwyvplvx',
    host: 'ruby.db.elephantsql.com',
    database: 'gwyvplvx',
    password: 'nhw1Fp4n_XNo5v5IZz9OfQnmag5XWPmS',
    port: 5432,
});


const router = express.Router();

router.get('/', (req, res) => {
    res.send('Use POST, Luke!');
})

router.post('/', (req, res) => {
    const { username, password } = req.body;

    pool
        .query(`SELECT * FROM users WHERE username='${username}';`)
        .then((data) => {
            const returnedTable = data.rows; // Array of records

            if (returnedTable.length === 0) {
                // This return is to exit from function
                return res.send({ error: 'No records found' });
            }

            const userFromDb = returnedTable[0];

            const detailedInfoAboutUser = {
                firstName: userFromDb.first_name,
                lastName: userFromDb.last_name,
                secretToken: 'Secret!!!!!'
            };

            // Building hash for received from request password
            const salt = 'SOME_SECRET_HERE';
            const receivedHashedPassword = md5(password + salt);

            const passwordsHashesMatch = userFromDb.password_hash === receivedHashedPassword;

            if (passwordsHashesMatch) {
                res.send(detailedInfoAboutUser);
            } else {
                res.send({ error: 'Failed' });
            }
        })
        .catch(err => {
            res.send({ error: err.message });
        });
});

module.exports = router;