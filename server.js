const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

const accountSid = 'AC3cac120f4706981b69e436846248122d';
const authToken = 'f7d7d6754d4a70c190e7428a41a4855f';
const client = require('twilio')(accountSid, authToken);

const sendSMS = async (body) => {
    let msgOptions = {
        from: '+13474081738',
        to: '+919384957970',
        body
    }
    try {
        const message = await client.messages.create(msgOptions);
        console.log(message);
    } catch (error) {
        console.error(error);
    }
}

app.post('/call-node-function', (req, res) => {
    sendSMS(req.body.pass);
    res.json({
        message: 'Password received successfully!'
    });
});

// sendSMS('string msg');

app.listen(3000, () => {
    console.log("Server started");
});