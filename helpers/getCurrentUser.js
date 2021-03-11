const client = require('../DB/models/client.model');
const jwtDecode = require('jwt-decode');
const mongoose = require('mongoose');

const getCurrentUser = (req) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const decoded = jwtDecode(token);
    const Client = mongoose.model(decoded.name, client);
    return Client;
}

module.exports = getCurrentUser;