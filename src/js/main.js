// Sanity Check
const ding = require('./ding');
ding.test();

// Actual Code
const Masonry = require('masonry-layout'); //init in HTML
const grid = document.querySelector('.news-grid');
let masonry = new Masonry( grid, {
  //itemSelector: '.news-item',
  //columnWidth: 15
  columnWidth:80
  percentPosition: true
});
