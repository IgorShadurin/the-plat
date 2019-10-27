const {issue, broadcast} = require('@waves/waves-transactions');
const {address, seed, nodeUrl, chainId} = require('./config.json');
const argv = require('minimist')(process.argv.slice(2));

if (argv.n && argv.c) {

} else {
    console.log(argv);
    console.log('Incorrect params');
    return;
}

const signedTx = issue({
    name: argv.n,
    description: '',
    quantity: argv.c * 100000000,
    decimals: 8,
    reissuable: true,
    fee: 100000000,
    chainId: 'T'
}, seed);
broadcast(signedTx, nodeUrl)
    .then(resp => console.log(resp.id))
    .catch(e => console.log('Error: ' + e.message));
