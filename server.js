const express = require("express");
const cors = require("cors")
const app = express();
const api = express.Router();

const middlewares = (req, res, next) => {
    cors()
    next()
}

app.use(middlewares)

app.get('/', (req, res) => {
    console.log('entery');
})

app.listen(() => {
    console.log('listen on 3000');
})