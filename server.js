const { save } = require('./db/index');
const sampleProduct = require('./db/sampleProduct.json');

save(sampleProduct).then(() => console.log('saved'));
