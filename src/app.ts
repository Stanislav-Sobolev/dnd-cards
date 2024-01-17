const express = require('express');
var cors = require('cors');
var boardRoutes = require('./routes/boardRoutes');

var app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(boardRoutes);

module.exports= app;
