import { assessSeverity } from './severity.js';
import { matchWithLibrary } from './condition-library.js';
import { synonyms } from './synonyms.js';
const testCases = [
  {
    input: 'I have chest pain and shortness of breath.',
    expectedSeverity: 'Emergency',
    expectedConditions: ['heart attack', 'pulmonary embolism'],
  },
  {
    input: 'I have a high fever, fatigue, and a dry cough.',
    expectedSeverity: 'Moderate',
    expectedConditions: ['flu', 'covid-19'],
  },
  {
    input: 'My head hurts and I have a runny nose.',
    expectedSeverity: 'Mild',
    expectedConditions: ['common cold'],
  },
  {
    input: 'I feel dizzy and have stomach pain.',
    expectedSeverity: 'Moderate',
    expectedConditions: [],
  },
  {
    input: 'I just have a sore throat.',
    expectedSeverity: 'Mild',
    expectedConditions: [],
  },
  {
    input: 'I have a stabbing chest pain when I walk.',
    expectedSeverity: 'Emergency',
    expectedConditions: ['heart attack', 'pulmonary embolism'],
  },
  {
    input: 'Feeling very tired with a high temperature and coughing a lot.',
    expectedSeverity: 'Moderate',
    expectedConditions: ['flu', 'covid-19'],
  },
  {
    input: 'My throat is sore and I keep coughing.',
    expectedSeverity: 'Mild',
    expectedConditions: ['strep throat', 'flu'],
  },
  {
    input: 'I am experiencing dizziness and lightheadedness.',
    expectedSeverity: 'Moderate',
    expectedConditions: [],
  },
  {
    input: 'I have itchy skin and some red spots.',
    expectedSeverity: 'Moderate',
    expectedConditions: ['measles', 'covid-19'],
  },
  {
    input: 'I feel my heart fluttering and have a low heart rate.',
    expectedSeverity: 'Moderate',
    expectedConditions: [],
  },
  {
    input: 'My head aches and I am sneezing a lot.',
    expectedSeverity: 'Mild',
    expectedConditions: ['common cold'],
  },
  {
    input: 'I am throwing up and feel very queasy.',
    expectedSeverity: 'Moderate',
    expectedConditions: [],
  },
  {
    input: 'I have swelling in my joints and difficulty moving them.',
    expectedSeverity: 'Moderate',
    expectedConditions: [],
  },
  {
    input: 'I passed out suddenly and feel confused.',
    expectedSeverity: 'Emergency',
    expectedConditions: [],
  },
];

function runTests() {
  console.log('Running Symptom Checker Test Cases:\n');

  testCases.forEach((test, index) => {
    const severity = assessSeverity(test.input);
    const conditions = matchWithLibrary(test.input);

    const severityPass = severity === test.expectedSeverity;
    const conditionPass =
      test.expectedConditions.length === conditions.length &&
      test.expectedConditions.every((c) => conditions.includes(c));

    console.log(`Test Case #${index + 1}`);
    console.log(`Input: ${test.input}`);
    console.log(`Expected Severity: ${test.expectedSeverity} → Got: ${severity} `);
    console.log(`Expected Conditions: ${test.expectedConditions.join(', ') || 'None'}`);
    console.log(`Matched Conditions: ${conditions.join(', ') || 'None'} [${conditionPass ? '✅' : '❌'}]`);
    console.log('---\n');
  });
}

runTests();

export { testCases };