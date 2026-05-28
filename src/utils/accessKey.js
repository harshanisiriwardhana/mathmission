// Valid access keys - add more when you sell on Payhip
const VALID_KEYS = [
  'MM-DEMO-2024',
  'MM-TEST-0001',
  'MM-KIDS-0001',
  'MM-KIDS-0002',
  'MM-KIDS-0003',
  'MM-KIDS-0004',
  'MM-KIDS-0005',
];

export function validateAccessKey(key) {
  const cleaned = key.trim().toUpperCase();
  return VALID_KEYS.includes(cleaned);
}

export function formatKey(key) {
  return key.trim().toUpperCase();
}