# The Plat

## How to install and run

1 - Server side: upload web folder to server, setup db credentials in config/db.php, run: 

`./yii migrate` 

2 - Enter your seed phrase from your Waves Testnet address in web/waves/config.json, run:

`yarn` inside web/waves

3 - Client side:

Define server URL in /src/ApiService.js, run:

`yarn` && `yarn start` 
