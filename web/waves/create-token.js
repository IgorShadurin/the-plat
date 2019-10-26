const {issue, broadcast} = require('@waves/waves-transactions');
const {address, seed, nodeUrl, chainId} = require('./config.json');

const signedTx = issue({
    name: 'ologergr888',
    description: '',
    quantity: 100*100000000,
    decimals: 8,
    reissuable: true,
    fee: 100000000,
    chainId: 'T'
}, seed);
broadcast(signedTx, nodeUrl).then(resp => console.log(resp.id));
