var adbs = require("ad-bs-converter");

function ad2bsClick(){
    var data = adbs.ad2bs(document.getElementById("ad").value);
    document.getElementById("bsresult").innerHTML = data["ne"]["year"] + "/" +
        data["ne"]["month"] + "/" + data["ne"]["day"] + " " + data["ne"]["strDayOfWeek"];
}

function bs2adClick() {
    var data = adbs.bs2ad(document.getElementById("bs").value);
    document.getElementById("adresult").innerHTML = data["year"] + "/" +
        data["month"] + "/" + data["day"] + " " + data["strDayOfWeek"];
}

var ad2bsbtn = document.getElementById("ad2bsbtn");
ad2bsbtn.addEventListener("click", ad2bsClick);
var bs2adbtn = document.getElementById("bs2adbtn");
bs2adbtn.addEventListener("click", bs2adClick);
