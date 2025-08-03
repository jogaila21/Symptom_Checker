import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import { getBotResponse } from './src/chatbot.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/api/chat', async (req, res) => {
  try {
    const { userProfile, userInput, chatHistory } = req.body;

    const { botReply, severity, matchedConditions } = await getBotResponse(
      userInput,
      userProfile,
      chatHistory
    );

    res.json({ botReply, severity, matchedConditions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || 'Something went wrong' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});