'use strict';

var gProjs = [
    {
        id: 'pacman',
        name: 'pacman',
        title: 'Greatest arcade game of all times',
        desc: makeLorem(33),
        url: './projects/pacman',
        published: 'Feb 01, 2022',
        labels: ["Matrixes ", "keyboard events"],
    },
    {
        id: 'book-shop',
        name: 'book-shop',
        title: 'Book inventory management system',
        desc: makeLorem(50),
        url: './projects/book-shop',
        published: 'Feb 05, 2022',
        labels: ["Responsive layout ", "Storage use"],
    },
]

function getProjsForDisplay() {
    return gProjs
}

function getProjByID(projId) {
    return gProjs.find(proj => proj.id === projId);
}
