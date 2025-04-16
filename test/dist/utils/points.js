"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeHistories = void 0;
const mergeHistories = (historyA, historyB) => {
    const originalHistory = JSON.parse(historyA);
    const newHistory = JSON.parse(historyB);
    const originalDates = originalHistory.map((point) => point.date);
    const mergedHistory = [
        ...originalHistory,
        ...newHistory.filter((h) => !originalDates.includes(h.date)),
    ];
    return JSON.stringify(mergedHistory);
};
exports.mergeHistories = mergeHistories;
//# sourceMappingURL=points.js.map