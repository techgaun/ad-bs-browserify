var adbs = require('ad-bs-converter');

function ad2bsClick(){
    document.getElementById('bsresult').innerHTML = adbs.ad2bs(document.getElementById('ad').value);
}

function bs2adClick() {
    document.getElementById('adresult').innerHTML = adbs.bs2ad(document.getElementById('bs').value);
}

var ad2bsbtn = document.getElementById('ad2bsbtn');
ad2bsbtn.addEventListener('click', ad2bsClick);
var bs2adbtn = document.getElementById('bs2adbtn');
bs2adbtn.addEventListener('click', bs2adClick);
