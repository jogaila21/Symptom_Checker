import { synonyms } from './synonyms.js';

export const conditionLibrary = {
  "chest_pain + difficulty_breathing": ["heart attack", "pulmonary embolism"],
  "stabbing chest pain + exertion": ["heart attack", "angina"],
  "fever + rash": ["measles", "covid-19"],
  "fever + fatigue + cough": ["flu", "covid-19"],
  "high temperature + tired + coughing": ["flu", "covid-19"],
  "headache + runny nose": ["common cold"],
  "sore throat + cough": ["strep throat", "flu"],
  "dizziness + lightheadedness": ["low blood-pressure"], 
  "itchy skin + rash": ["measles"],
  "itchy skin + red spots": ["measles"],
  "heart palpitations + low heart rate": ["heart arrhythmia", "heart disease"],
  "headache + sneezing": ["common cold"],
  "vomiting + nausea": ["food poisoning","migraine", "pregnancy"],
  "joint swelling + difficulty moving joints": ["lupus","osteoarthritis","arthritis","rheumatoid arthritis","joint injury"],
  "loss of consciousness + confusion": ["stroke", "seizure", "severe head injury"],
};

// This checks whether any synonym for a keyword exists in the input
function includesSynonym(input, keyword) {
  const terms = synonyms[keyword] || [keyword];
  return terms.some(term => {
    const regex = new RegExp(`\\b${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
    return regex.test(input);
  });
}

// Match input using all required keywords and their synonyms
export function matchWithLibrary(symptoms) {
  const cleaned = symptoms.toLowerCase();

  for (const [pattern, conditions] of Object.entries(conditionLibrary)) {
    const keywords = pattern.split(' + ');
    const allMatched = keywords.every(keyword => includesSynonym(cleaned, keyword));

    if (allMatched) {
      return conditions;
    }
  }

  return [];
}