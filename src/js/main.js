const ding = require('./ding');

console.log('imported dings into index');
ding.flap();

for (let value of ding.arr) {
  console.log(value)
}
