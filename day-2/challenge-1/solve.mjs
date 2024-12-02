import { readFileSync } from 'fs';
console.time('challenge 1');
const input = readFileSync('../input.txt', { encoding: 'utf8' });
const reports = input.split('\n');

let safeReportCount = 0;

reports.forEach(report => {
  const reportReadings = report.split(' ').map(string => parseInt(string));
  if (reportReadings[1] === reportReadings[0]) return; // must be either incrementing or decrementing to be considered safe
  let incrementing = reportReadings[1] > reportReadings[0];
  let safeReport = false;
  for (let i = 0; i < reportReadings.length - 1; ++i) {
    let reading = reportReadings[i];
    let nextReading = reportReadings[i + 1];
    if (reading === nextReading) return;
    if (Math.abs(reading - nextReading) > 3) return;
    if (incrementing && nextReading < reading) return;
    if (!incrementing && nextReading > reading) return;
    // passed all the checks
    safeReport = true;
  }
  if (safeReport) safeReportCount++;
});

console.log('safe report count is ', safeReportCount);
console.timeEnd('challenge 1');