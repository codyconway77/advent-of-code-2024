import { readFileSync } from 'fs';
console.time('challenge 2');
const input = readFileSync('../input.txt', { encoding: 'utf8' });
const inputList = input.split('\n');

let listA = [], listBCountMap = {}, similarityScore = 0;
inputList.forEach(numPairAsString => {
    const numPair = numPairAsString.split('   ');
    const numA = parseInt(numPair[0]), numB = parseInt(numPair[1]);
    listA.push(numA);
    if (listBCountMap[numB]) {
        listBCountMap[numB]++;
    } else {
        listBCountMap[numB] = 1;
    }
});
console.log('ay', listBCountMap);
similarityScore = listA.map(numA => {
    if (!listBCountMap[numA]) return 0;
    return numA * listBCountMap[numA];
}).reduce((a, b) => a + b);

console.log(similarityScore);
