import { readFileSync } from 'fs';
console.time('challenge 1');
const input = readFileSync('../input.txt', { encoding: 'utf8' });
const inputList = input.split('\n');

function sortedIndex(array, value) {
    let low = 0, high = array.length;

    while (low < high) {
        let mid = (low + high) >>> 1;
        if (array[mid] < value) low = mid + 1;
        else high = mid;
    }
    return low;
}

function insertIntoSorted(elem, arr) {
    arr.splice(sortedIndex(arr, elem), 0, elem);
    return arr;
}

let listA = [], listB = [], totalDistance = 0;
// build both lists in sorted order
inputList.forEach(numPairAsString => {
    const numPair = numPairAsString.split('   ');
    listA = insertIntoSorted(parseInt(numPair[0]), listA);
    listB = insertIntoSorted(parseInt(numPair[1]), listB);
});
// list a and b will be same length
for (let i = 0; i < listA.length; ++i) {
    totalDistance += Math.abs(listA[i] - listB[i]);
}

console.log('total distance is ', totalDistance);
console.timeEnd('challenge 1');