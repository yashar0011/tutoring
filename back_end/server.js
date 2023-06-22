const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

const messages = [{ user: 'System', text: 'Welcome to the chat app' , id: 0}];

app.post('/save-data', (req, res) => {
  const data = req.body;
  messages.push(data);
  res.send(messages);
  console.log(messages);
});

app.get('/Yashar', (req, res) => {
  res.send(messages);
});

app.delete('/messages', (req, res) => {
  messages.splice(0, messages.length);
  res.send({ message: 'All messages deleted' });
});

app.delete('/messages/:id', (req, res) => {
  const messageId = Number(req.params.id)
  const index = messages.findIndex((message) => message.id === messageId);
  if (index !== -1) {
    messages.splice(index, 1);
    res.send(messages);
  } else {
    res.send({ error: `Message with id ${messageId} not found` });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
