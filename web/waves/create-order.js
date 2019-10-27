const {submitOrder, broadcast, signTx} = require('@waves/waves-transactions');
const {address, seed, nodeUrl, chainId} = require('./config.json');
const argv = require('minimist')(process.argv.slice(2));

/*if (argv.n && argv.c) {

} else {
    console.log(argv);
    console.log('Incorrect params');
    return;
}*/
//matcher/orderbook
const data = {
    "type": "7",
    "orderType": "sell",
    "amount": 10000000,
    "matcherFee": 300000,
    "price": 111,
    "version": 2,
    "matcherPublicKey": "8QUAqtTckM5B8gvcuP7mMswat9SjKUuafJMusEoSn1Gy",
    "assetPair": {"amountAsset": "WAVES", "priceAsset": "Ft8X1v1LTa1ABafufpaCWyVj8KkaxUWE6xBhW6sNFJck"},
};
const signedTx = signTx(data, seed);
console.log(signedTx);

// todo sign before submit
const tx = submitOrder(signedTx, {
    matcherUrl: 'https://matcher.testnet.wavesnodes.com/',
    market: false
})
    .then(resp => console.log(resp))
    .catch(e => console.log('Error: ' + e.message));


/*broadcast(tx, nodeUrl)
    .then(resp => console.log(resp.id))
    .catch(e => console.log('Error: ' + e.message));
*/
