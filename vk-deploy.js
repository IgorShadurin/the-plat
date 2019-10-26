const fetch = require('node-fetch');
const FormData = require('form-data');
let fs = require('fs');

if (process.argv.length !== 4) {
    console.log('Incorrect params size');
    return;
}

const appId = process.argv[2];
const accessToken = process.argv[3];
const url = `https://api.vk.com/method/apps.getBundleUploadServer?app_id=${appId}&access_token=${accessToken}&v=5.101`;
const form = new FormData();
form.append('file', fs.createReadStream('./deploy.zip'));

async function post() {
    let vkUrl = await fetch(url);
    vkUrl = await vkUrl.json();
    vkUrl = vkUrl.response.upload_url;

    let response = await fetch(vkUrl, {method: 'POST', body: form});
    response = await response.json();
    console.log(response);
}

post();
