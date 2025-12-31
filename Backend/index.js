const express = require('express');
const dotenv = require('dotenv');

require("dotenv").config();

const server = express();
const PORT = process.env.PORT || 1337;
 
server.listen(PORT, () => {
    console.log("Server is running on port : ", PORT);
});
