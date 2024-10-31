const express=require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

const port = 5000;

app.use(cors());
app.use(bodyParser.json());

let messages = [];
app.post('/messages', (req, res) => {
    const {message} = req.body;
    messages.push(message);
    res.status(201).send();
});

app.get('/messages', (req, res) => {
    res.json(messages);
});

app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});