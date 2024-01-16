"use strict";
var mongoose = require('mongoose');
var dotenv = require('dotenv');
var app = require('./app');
dotenv.config();
var PORT = process.env.PORT || 4000;
var HOST = process.env.DB_HOST;
if (!HOST) {
    console.error('DB_HOST is not defined in the environment variables.');
    process.exit(1);
}
mongoose.set('strictQuery', false);
mongoose
    .connect(HOST)
    .then(function () {
    console.log('Connected to MongoDB');
    app.listen(PORT, function () {
        console.log('Node API app is running on port ' + PORT);
    });
})
    .catch(function (error) {
    console.log(error);
});
//# sourceMappingURL=index.js.map