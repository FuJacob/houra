export const reloadMap = new Map([
  ["hourly", 1 * 60 * 60 * 1000], // 1 hour = 3,600,000 ms
  ["12hourly", 12 * 60 * 60 * 1000], // 12 hours = 43,200,000 ms
  ["daily", 24 * 60 * 60 * 1000], // 1 day = 86,400,000 ms
  ["weekly", 7 * 24 * 60 * 60 * 1000], // 7 days = 604,800,000 ms
  ["monthly", 30 * 24 * 60 * 60 * 1000], // ~30 days = 2,592,000,000 ms
]);
