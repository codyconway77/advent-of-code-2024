import { readFileSync } from 'fs';
console.time('challenge 2');
const input = readFileSync('../input.txt', { encoding: 'utf8' });
const reports = input.split('\n');

function isSingleBadLevel(reportReadings) {
  let isSafeWithTolerance = false;
  for (let i = 0; i < reportReadings.length; ++i) {
    let filteredReport = reportReadings.filter((_, idx) => idx !== i);
    let isReportSafe = checkReportForSafety(filteredReport);
    if (isReportSafe) {
      isSafeWithTolerance = true;
    }
  }
  return isSafeWithTolerance;
}

function checkReportForSafety(reportReadings) {
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
  return safeReport;
}

let safeReportCount = 0;

reports.forEach((report) => {
  const reportReadings = report.split(' ').map(string => parseInt(string));
  const isSafeWithTolerance = isSingleBadLevel(reportReadings);
  if (isSafeWithTolerance) safeReportCount++;
});

console.log('safe report count is ', safeReportCount);
console.timeEnd('challenge 2');
