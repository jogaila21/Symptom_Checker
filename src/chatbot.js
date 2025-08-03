import openai from '../config/open-ai.js'; // path for openai
import { assessSeverity } from './severity.js'; //import severity and condition matching
import { matchWithLibrary } from './condition-library.js';

export async function getBotResponse(userInput, userProfile, chatHistory = []) { 
  const severity = assessSeverity(userInput);
  const matchedConditions = matchWithLibrary(userInput);

  const systemPromptLines = [
    `User profile: ${userProfile.age}-year-old ${userProfile.gender} with conditions: ${
      userProfile.disabilities.join(', ') || 'none'
    }.`,
    `Symptom severity assessment: ${severity}.`,
    `Local matched conditions: ${matchedConditions.length > 0 ? matchedConditions.join(', ') : 'None'}.`,
    `Provide symptom analysis based on this information.`,
  ];
  const systemPrompt = systemPromptLines.join('\n');
  // This expects chatHistory as array of [role, content]
  const messages = chatHistory.map(([role, content]) => ({ role, content }));
  // Insert system prompt before user message
  messages.push({ role: 'system', content: systemPrompt });
  messages.push({ role: 'user', content: userInput });

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages,
    });

    const botReply = response.choices[0].message.content;

    return { botReply, severity, matchedConditions };
  } catch (error) {
    throw new Error(error.response?.data?.error?.message || error.message);
  }
}