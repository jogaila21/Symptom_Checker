import { synonyms } from './synonyms.js';

function includesSynonym(input, keyword) {
  if (!synonyms[keyword]) {
    return input.includes(keyword);
  }
  return synonyms[keyword].some(syn => input.includes(syn));
}

export function assessSeverity(symptoms) {
  const input = symptoms.toLowerCase();

  if (
    includesSynonym(input, 'chest_pain') ||
    includesSynonym(input, 'shortness_of_breath') ||
    includesSynonym(input, 'loss_of_consciousness') ||
    input.includes('extreme pain')
  ) {
    return 'Emergency';
  }

  if (
    includesSynonym(input, 'fever') ||
    (includesSynonym(input, 'fever') && includesSynonym(input, 'fatigue')) ||
    includesSynonym(input, 'itchy_skin') ||
    includesSynonym(input, 'stomach_pain') ||
    includesSynonym(input, 'diarrhea') ||
    includesSynonym(input, 'dizziness') || 
    includesSynonym(input, 'low_heart_rate') ||
    includesSynonym(input, 'high_heart_rate') ||
    includesSynonym(input, 'heart_palpitations')
  ) {
    return 'Moderate';
  }

  if (
    includesSynonym(input, 'headache') ||
    includesSynonym(input, 'runny_nose') ||
    includesSynonym(input, 'sore_throat') ||
    includesSynonym(input, 'sneezing')
  ) {
    return 'Mild';
  }

  return 'Unknown';
}