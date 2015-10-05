(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"ad-bs-converter":2}],2:[function(require,module,exports){
"use strict";

var defaults = {
            lang: 'ne',		//possible values: ne for nepali text, en for english text
            //dateFormat: 'yyyy/mm/dd',     // not implemented yet
            monthFormat: 'full',	//possible values: full for full name, short for short name
            daysFormat: 'min',		//possible values: full for full name, short for short name and min for minified name
    },
    ne = {
        monthsName: ['बैशाख', 'जेष्ठ', 'आषाढ', 'श्रावण', 'भाद्र', 'आश्विन', 'कार्तिक', 'मंसिर', 'पौष', 'माघ', 'फाल्गुन', 'चैत्र'],
        monthsShortName: ['बै', 'जे', 'आषा', 'श्रा', 'भा', 'आश', 'का', 'मं', 'पौ', 'मा', 'फा', 'चै'],
        daysName: ['आइतवार', 'सोमवार', 'मगलवार', 'बुधवार', 'बिहिवार', 'शुक्रवार', 'शनिवार'],
        daysShortName: ['आइत', 'सोम', 'मगल', 'बुध', 'बिहि', 'शुक्र', 'शनि'],
        daysMinName: ['आ', 'सो', 'म', 'बु', 'बि', 'शु', 'श']
    },
    en = {
        monthsName: ['Baisakh', 'Jestha', 'Ashadh', 'Shrawan', 'Bhadra', 'Ashwin', 'Kartik', 'Mangsir', 'Paush', 'Mangh', 'Falgun', 'Chaitra'],
        monthsShortName: ['Bai', 'Je', 'As', 'Shra', 'Bha', 'Ash', 'Kar', 'Mang', 'Pau', 'Ma', 'Fal', 'Chai'],
        daysName: ['Aaitabaar', 'Sombaar', 'Manglbaar', 'Budhabaar', 'Bihibaar', 'Shukrabaar', 'Shanibaar'],
        daysShortName: ['Aaita', 'Som', 'Mangl', 'Budha', 'Bihi', 'Shukra', 'Shani'],
        daysMinName: ['Aai', 'So', 'Man', 'Bu', 'Bi', 'Shu', 'Sha'],
    },
    engDaysName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    engDaysShortName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    engMonthsName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    engMonthsShortName = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    daysInYear = 365,
    minMonth = 1,
    minDays = 1,
    maxMonth = 12,
    maxDays = 32,
    nums = {
        0: '०',
        1: '१',
        2: '२',
        3: '३',
        4: '४',
        5: '५',
        6: '६',
        7: '७',
        8: '८',
        9: '९'
    },
    base_ad = {year: 2015, month: 7, day: 17, dayOfWeek: 5},	// dayOfWeek: 0 for sunday, 1 for monday and so on
    base_bs = {year: 2072, month: 4, day: 1, dayOfWeek: 5},
    calendar_data = {
        '1978': [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
        '1979': [ 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365 ],
        '1980': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366 ],
        '1981': [ 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30, 365 ],
        '1982': [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
        '1983': [ 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365 ],
        '1984': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366 ],
        '1985': [ 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30, 365 ],
        '1986': [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
        '1987': [ 31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365 ],
        '1988': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366 ],
        '1989': [ 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
        '1990': [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
        '1991': [ 31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365 ],
        '1992': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 366 ],
        '1993': [ 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
        '1994': [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
        '1995': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30, 365 ],
        '1996': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 366 ],
        '1997': [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
        '1998': [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
        '1999': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366 ],
        '2000': [ 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 365 ],
        '2001': [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
        '2002': [ 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365 ],
        '2003': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366 ],
        '2004': [ 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 365 ],
        '2005': [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
        '2006': [ 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365 ],
        '2007': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366 ],
        '2008': [ 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31, 365 ],
        '2009': [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
        '2010': [ 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365 ],
        '2011': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366 ],
        '2012': [ 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30, 365 ],
        '2013': [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
        '2014': [ 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365 ],
        '2015': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366 ],
        '2016': [ 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30, 365 ],
        '2017': [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
        '2018': [ 31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365 ],
        '2019': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 366 ],
        '2020': [ 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
        '2021': [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
        '2022': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30, 365 ],
        '2023': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 366 ],
        '2024': [ 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
        '2025': [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
        '2026': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366 ],
        '2027': [ 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 365 ],
        '2028': [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
        '2029': [ 31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30, 365 ],
        '2030': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366 ],
        '2031': [ 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 365 ],
        '2032': [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
        '2033': [ 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365 ],
        '2034': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366 ],
        '2035': [ 30, 32, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31, 365 ],
        '2036': [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
        '2037': [ 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365 ],
        '2038': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366 ],
        '2039': [ 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30, 365 ],
        '2040': [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
        '2041': [ 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365 ],
        '2042': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366 ],
        '2043': [ 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30, 365 ],
        '2044': [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
        '2045': [ 31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365 ],
        '2046': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366 ],
        '2047': [ 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
        '2048': [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
        '2049': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30, 365 ],
        '2050': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 366 ],
        '2051': [ 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
        '2052': [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
        '2053': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30, 365 ],
        '2054': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 366 ],
        '2055': [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
        '2056': [ 31, 31, 32, 31, 32, 30, 30, 29, 30, 29, 30, 30, 365 ],
        '2057': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366 ],
        '2058': [ 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 365 ],
        '2059': [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
        '2060': [ 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365 ],
        '2061': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366 ],
        '2062': [ 30, 32, 31, 32, 31, 31, 29, 30, 29, 30, 29, 31, 365 ],
        '2063': [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
        '2064': [ 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365 ],
        '2065': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366 ],
        '2066': [ 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 29, 31, 365 ],
        '2067': [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
        '2068': [ 31, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365 ],
        '2069': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366 ],
        '2070': [ 31, 31, 31, 32, 31, 31, 29, 30, 30, 29, 30, 30, 365 ],
        '2071': [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
        '2072': [ 31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30, 365 ],
        '2073': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 31, 366 ],
        '2074': [ 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
        '2075': [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
        '2076': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30, 365 ],
        '2077': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31, 366 ],
        '2078': [ 31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
        '2079': [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30, 365 ],
        '2080': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30, 365 ],
        '2081': [ 31, 31, 32, 32, 31, 30, 30, 30, 29, 30, 30, 30, 366 ],
        '2082': [ 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30, 365 ],
        '2083': [ 31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30, 365 ],
        '2084': [ 31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30, 365 ],
        '2085': [ 31, 32, 31, 32, 30, 31, 30, 30, 29, 30, 30, 30, 366 ],
        '2086': [ 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30, 365 ],
        '2087': [ 31, 31, 32, 31, 31, 31, 30, 30, 29, 30, 30, 30, 366 ],
        '2088': [ 30, 31, 32, 32, 30, 31, 30, 30, 29, 30, 30, 30, 365 ],
        '2089': [ 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30, 365 ],
        '2090': [ 30, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30, 365 ],
        '2091': [ 31, 31, 32, 31, 31, 31, 30, 30, 29, 30, 30, 30, 366 ],
        '2092': [ 31, 31, 32, 32, 31, 30, 30, 30, 29, 30, 30, 30, 366 ]
    }

/*
 * gathered data below; if anybody can validate below, thanks!
 * A hacky way is to iterate for the unknown dates is to use daysPerYear and loop through
 *
 '2093': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30, 366 ],
 '2094': [ 31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30, 365 ],
 '2095': [ 31, 31, 32, 31, 31, 31, 30, 29, 30, 30, 30, 30, 366 ],
 '2096': [ 30, 31, 32, 32, 31, 30, 30, 29, 30, 29, 30, 30, 364 ],
 '2097': [ 31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30, 366 ],
 '2098': [ 31, 31, 32, 31, 31, 31, 29, 30, 29, 30, 30, 31, 366 ],
 '2099': [ 31, 31, 32, 31, 31, 31, 30, 29, 29, 30, 30, 30, 365 ],
 '2100': [ 31, 32, 31, 32, 30, 31, 30, 29, 30, 29, 30, 30, 365 ]
 */

function convertNumberToNepali(num) {
    var strNe = num.toString().split('').map(function(ch) {
        return nums[Number(ch)];
    });
    return strNe.join('');
}
function countDaysInYear(year) {
    if (typeof calendar_data[year] === 'undefined') {
        return daysInYear;
    }

    return calendar_data[year][12];
}

function isLeapYear(year) {
    return (daysInYear !== countDaysInYear(year));
}

function countBSDays(date) {
    var dayCount = 0;
    var dateArr = date.split('/').map(function(str) {
        return Number(str);
    });

    var dateObj = {year: dateArr[0], month: dateArr[1], day: dateArr[2]};

    var inc = false;
    if (dateArr[0] > base_bs.year) {
        inc = true;
    }
    else if (dateArr[0] === base_bs.year && dateArr[1] > base_bs.month) {
        inc = true;
    }
    else if (dateArr[0] === base_bs.year && dateArr[1] === base_bs.month && dateArr[2] > base_bs.day) {
        inc = true;
    }

    var start = {};
    var end = {};
    var factor = 1;

    if (inc === true) {
        start = base_bs;
        end = dateObj;
    }
    else {
        start = dateObj;
        end = base_bs;
        factor = -1;
    }

    for (var i = start.year; i <= end.year; i++) {
        dayCount += calendar_data[i][12];
    }

    for (var i = 0; i < start.month - 1; i++) {
        dayCount -= calendar_data[start.year][i];
    }

    //dayCount += calendar_data[start.year][12 - 1];

    for (var i = end.month - 1; i < 12; i++) {
        dayCount -= calendar_data[end.year][i];
    }

    dayCount -= start.day;
    dayCount += end.day;
    return (dayCount * factor);
}

function countADDays(date) {
    var dayCount = 0, i = 0;
    var dateArr = date.split('/').map(function(str) {
        return Number(str);
    });

    var dateObj = {year: dateArr[0], month: dateArr[1] - 1, day: dateArr[2]};

    var date1 = new Date(base_ad.year, base_ad.month - 1, base_ad.day);
    var date2 = new Date(dateObj.year, dateObj.month, dateObj.day);
    var timeDiff = date2.getTime() - date1.getTime();
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return {diffDays: diffDays, dateInAd: date2};
}

function offsetBSDays(dayData) {
    var dayCount = dayData.diffDays,
        dateInAd = dayData.dateInAd;
    var bs_date = JSON.parse(JSON.stringify(base_bs));
    if (dayCount >= 0) {
        bs_date.day += dayCount;
        while (bs_date.day > calendar_data[bs_date.year][bs_date.month - 1]) {
            bs_date.day -= calendar_data[bs_date.year][bs_date.month - 1];
            bs_date.month++;
            if (bs_date.month > 12) {
                bs_date.year++;
                bs_date.month = 1;
            }
        }
    }
    else {
        dayCount = Math.abs(dayCount) - 1;
        //dayCount = dayCount - bs_date.day;  // reduce 1
        bs_date.month--;
        while (dayCount >= 0) {
            if (dayCount < calendar_data[bs_date.year][bs_date.month - 1]) {
                dayCount = calendar_data[bs_date.year][bs_date.month - 1] - dayCount;
                break;
            }
            dayCount -= calendar_data[bs_date.year][bs_date.month - 1];
            bs_date.month--;
            if (bs_date.month === 0) {
                bs_date.year--;
                bs_date.month = 12;
            }
        }
        bs_date.day = dayCount;
    }
    //return (bs_date.year + '/' + bs_date.month + '/' + bs_date.day);
    var month = dateInAd.getMonth(),
        dayOfWeek = dateInAd.getDay();
    var dateObj = {
        ne: {
            year: convertNumberToNepali(bs_date.year),
            month: convertNumberToNepali(bs_date.month),
            day: convertNumberToNepali(bs_date.day),
            strMonth: ne.monthsName[bs_date.month - 1],
            strShortMonth: ne.monthsShortName[bs_date.month - 1],
            dayOfWeek: convertNumberToNepali(dayOfWeek),
            strDayOfWeek: ne.daysName[dayOfWeek],
            strShortDayOfWeek: ne.daysShortName[dayOfWeek],
            strMinDayOfWeek: ne.daysMinName[dayOfWeek]
        },
        en: {
            year: bs_date.year,
            month: bs_date.month,
            day: bs_date.day,
            strMonth: en.monthsName[bs_date.month - 1],
            strShortMonth: en.monthsShortName[bs_date.month - 1],
            dayOfWeek: dayOfWeek,
            strDayOfWeek: en.daysName[dayOfWeek],
            strShortDayOfWeek: en.daysShortName[dayOfWeek],
            strMinDayOfWeek: en.daysMinName[dayOfWeek]
        }
    }
    return dateObj;
}

function offsetADDays(dayCount) {
    var date = new Date(base_ad.year, base_ad.month - 1, base_ad.day);
    date.setDate(date.getDate() + dayCount);
    var month = date.getMonth(),
        dayOfWeek = date.getDay();
    var dateObj = {
        year: date.getFullYear(),
        month: month + 1,
        strMonth: engMonthsName[month],
        strShortMonth: engMonthsShortName[month],
        day: date.getDate(),
        dayOfWeek: dayOfWeek,
        strDayOfWeek: engDaysName[dayOfWeek],
        strShortDayOfWeek: engDaysShortName[dayOfWeek]
    }
    return dateObj;
}

function bs2ad(date) {
    return offsetADDays(countBSDays(date));
}

function ad2bs(date) {
    return offsetBSDays(countADDays(date));
}

function arraySum(o) {
    for (var s = 0, i = o.length; i; s += o[--i]);
    return s;
};

exports.bs2ad = bs2ad;
exports.ad2bs = ad2bs;

},{}]},{},[1]);
