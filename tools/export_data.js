// Dump data.js (browser globals) to JSON on stdout for offline tooling.
global.REFS = {}; global.DOMAINS = {}; global.window = global;
require(require('path').join(__dirname, '..', 'data.js'));
process.stdout.write(JSON.stringify({ REFS, DOMAINS }));
