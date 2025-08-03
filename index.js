import readlineSync from 'readline-sync';
import colors from 'colors';

import { getBotResponse } from './src/chatbot.js';

async function main() {
  const chatHistory = [];

  const userName = readlineSync.question(
    colors.bold.green(
      'Welcome to the Symptom Checker Program!\nCan I have your name? (type "exit" to quit):\n'
    )
  );

  if (userName.toLowerCase() === 'exit') {
    console.log(colors.green('Bot: Goodbye!'));
    return;
  }

  const userAge = readlineSync.question(colors.cyan('What is your age? '));
  const userGender = readlineSync.question(colors.cyan('What is your gender?: '));
  const userDisabilities = readlineSync.question(
    colors.cyan('Please list any known disabilities or pre-existing conditions (comma-separated): ')
  );

  const userProfile = {
    name: userName,
    age: parseInt(userAge),
    gender: userGender.toLowerCase(),
    disabilities: userDisabilities
      .toLowerCase()
      .split(',')
      .map((d) => d.trim())
      .filter(Boolean),
  };

  console.log(colors.bold.green(`\nHello ${userName}, please describe your symptoms.`));

  while (true) {
    const userInput = readlineSync.question(colors.yellow('You: '));

    if (userInput.toLowerCase() === 'exit') {
      console.log(colors.green('Bot: Goodbye!'));
      break;
    }

    try {
      const { botReply, severity, matchedConditions } = await getBotResponse(
        userInput,
        userProfile,
        chatHistory
      );

      console.log(colors.magenta(`Severity: ${severity}`));
      console.log(
        colors.blue(
          `Matched Conditions: ${matchedConditions.length > 0 ? matchedConditions.join(', ') : 'None'}`
        )
      );
      console.log(colors.green('Bot: ') + botReply);

      chatHistory.push(['user', userInput]);
      chatHistory.push(['assistant', botReply]);
    } catch (err) {
      console.error(colors.red('Error: ' + err.message));
    }
  }
}

main();