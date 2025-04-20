export const mergeHistories = (historyA: string, historyB: string): string => {
  const originalHistory = JSON.parse(historyA ?? '[]');

  const newHistory = JSON.parse(historyB ?? '[]');

  const originalDates = originalHistory.map((point) => point.date);

  const mergedHistory = [
    ...originalHistory,
    ...newHistory.filter((h) => !originalDates.includes(h.date)),
  ];

  return JSON.stringify(mergedHistory);
};
