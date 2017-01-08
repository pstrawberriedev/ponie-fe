const obj = {

  arr: ['1 personal space', '2 personal space', '3 personal space'],

  test: function() {
    console.log('testing es6 [const, for-of] using node commonJS format via webpack...');
    for (let value of this.arr) {
      console.log(value)
    }
  }

}

module.exports = obj;
