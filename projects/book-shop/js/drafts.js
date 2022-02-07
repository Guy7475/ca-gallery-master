'use strict';

gBooks = [
    { month: 'March', num: 3 },
    { month: 'jan', num: 1 },
    { month: 'Feb', num: 2 },
    { month: 'Dec', num: 12 },
];


console.log('before', gBooks);

gBooks.sort(function (a, b) {
    if (a.month > b.month) return 1;
    else if (a.month < b.month) return -1;
    else return 0;
});

// gBooks.sort();

console.log('after', gBooks);