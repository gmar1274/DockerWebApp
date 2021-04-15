const express = require('express');

function createRouter(db) {
    const router = express.Router();
    const users_api = "/api/v1/users";
    router.get(users_api, (req, res, next) => {
        console.log("GET recieved. /api/v1/users");
        db.query('call qry_get_user()', (error, results) => {
            if (error) {
                console.log(error);
                res.status(500).json({ status: 'error' });
            } else {
                res.status(200).json(results);
            }
        });

    });
    router.post(users_api, (req, res, next) => {
        console.log("POST received.");
        let json = req.body;
        res.json(json);
        db.query('call qry_create_user(?,?,?,?,?,?,?,?,?)', [json.name, json.addr, json.city, json.state, json.zip, json.country, json.lat, json.lon, json.description], function (err, result) {
            if (err) {
                console.log("err:", err);
            } else {
                console.log("results:", result);
            }
        });
    });
    return router;
}

module.exports = createRouter;