/**
 * Generate test data and store in a file.
 */
const rp = require('request-promise');
const fs = require('fs');

const count = 5000;
const out = './test-data/users.json';

rp({
  uri: `https://randomuser.me/api/?results=${count}`,
  json: true
})
.then((resp) => new Promise((resolve, reject) => {
  fs.writeFile(out, JSON.stringify(resp.results), (err) => {
    if (err) {
      reject(err);
    } else {
      console.log(`wrote ${resp.results.length} users to ${out}`);
      resolve();
    }
  });
}))
.catch(err => {
  console.log(err);
});
