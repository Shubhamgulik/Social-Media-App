const kue = require('kue');

const queue = kue.createQueue();
kue.app.listen(3000);
module.exports = queue;