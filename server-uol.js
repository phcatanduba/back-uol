import express from 'express';
import cors from 'cors';
import dayjs from 'dayjs';

const app = express();

app.use(cors());
app.use(express.json());

const participants = [];
const messages = [];
const names = [];

app.post('/participants', (req, res) => {
    let newParticipant = req.body;
    newParticipant.lastStatus = Date.now();
    if (!names.includes(req.body.name)) {
        names.push(req.body.name);
        participants.push(newParticipant);
        messages.push({
            from: req.body.name,
            to: 'Todos',
            text: 'entra na sala...',
            type: 'status',
            time: dayjs().format('H:m:s'),
        });
        res.sendStatus(200);
        return;
    } else {
        res.sendStatus(400);
        return;
    }
});

app.get('/participants', (req, res) => {
    res.send(participants);
});

app.get('/messages', (req, res) => {
    res.send(messages);
});

app.post('/messages', (req, res) => {
    const username = req.headers.user;

    if (req.body.to === '' || req.body.text === '') {
        res.sendStatus(400);
    } else if (
        req.body.type !== 'message' &&
        req.body.type !== 'private_message'
    ) {
        res.sendStatus(400);
    } else if (!names.includes(username)) {
        res.sendStatus(400);
    } else {
        let newMessages = req.body;
        newMessages.from = username;
        newMessages.time = dayjs().format('H:m:s');
        messages.push(newMessages);
        res.sendStatus(200);
    }
});

app.listen(4000, () => {
    console.log('rodando');
});
