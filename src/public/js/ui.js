const $ = require('wetfish-basic');
const Masonry = require('masonry-layout');

module.exports = {

  init: function() {
    // Initialize the Masonry Grid
    let gridEle = document.querySelector('.masonry-grid');
    let masonry = new Masonry( gridEle, {
      itemSelector: '.grid-item',
      percentPosition: true
    });

    // Load Anonymous Functions
    this.gloryhole();
  },

  gloryhole: function() {

    // Anon function test
    $('.grid-item').off('click').on('click', function() {
      console.log('balls');
    });

  }

}
