const base = {
  primary: '#6C5CE7',
  primaryAlt: '#A29BFE',
  bg: '#0B0B0E',
  surface: '#15151B',
  text: '#FFFFFF',
  textMuted: '#A1A1AA',
  border: '#26262F',
  success: '#22C55E',
  warning: '#F59E0B',
  danger: '#EF4444',
};

const light = {
  ...base,
  bg: '#FFFFFF',
  surface: '#F8FAFC',
  text: '#0B0B0E',
  textMuted: '#6B7280',
  border: '#E5E7EB',
};

export const colors = {
  dark: base,
  light,
};
