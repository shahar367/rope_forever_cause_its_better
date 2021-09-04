const express = require('express');
const path = require('path');
const cors = require('cors')
const axios = require('axios');
const app = express();
// require('dotenv').config({ path: __dirname + '/.env' });
const router = express.Router();
const port = process.env.PORT || 3000;
const getTrickListURL = process.env.GET_TRICKS_SHEET;

app.use('/', router);
app.use(express.static(path.join(__dirname, 'build')));
app.use(cors())

if (process.env.NODE_ENV === 'development') {
    app.get('/*', function (req, res) {
        res.sendFile(path.join(__dirname, 'build', 'index.html'));
    });
}

if (process.env.NODE_ENV === 'production') {
    app.get('/*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}

router.get('/googleSheetTricks', async function (req, res) {
    console.log(getTrickListURL);
    try {
        res.send(await axios.default.get(getTrickListURL, {
            headers: { "Accept": "application/json" },
            baseURL: "",
            proxy: "",
        }).then(response => {
            console.log(response)
            if (response.status === 200) return response.data;
            else return response.statusText;
        }))
    } catch (err) {
        console.log(err);
    }
})

app.listen(port, () => {
    console.log(`listen on ${port}`);
});