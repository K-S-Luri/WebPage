(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./class/Place"));
__export(require("./class/Match"));
__export(require("./class/Tournament"));

},{"./class/Match":2,"./class/Place":3,"./class/Tournament":4}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Match = /** @class */ (function () {
    function Match(places, side, round, id) {
        this.isDummy = false;
        this.places = places;
        this.side = side;
        this.round = round;
        this.id = id;
    }
    Match.calcSize = function () {
        var dummy = new Match([null, null, null, null], "W", 0, 0);
        dummy.isDummy = true;
        dummy.draw();
        var matches = document.getElementsByClassName("tour-match");
        if (matches.length === 0) {
            console.log("試合がないよ");
            return;
        }
        var basematch = matches[0];
        this.width = basematch.getBoundingClientRect().width;
        this.height = basematch.getBoundingClientRect().height;
        // dummyを作っているのがtournamentなのでparentは絶対あります
        basematch.parentNode.removeChild(basematch);
    };
    Object.defineProperty(Match.prototype, "top", {
        get: function () {
            if (this.isDummy) {
                return 0;
            }
            function calcTop(round) {
                if (round === 0) {
                    return 0;
                }
                return 0;
            }
            return (Match.height + Match.vertInterval) * this.id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Match.prototype, "left", {
        get: function () {
            if (this.isDummy) {
                return 0;
            }
            return (Match.width + Match.horiInterval) * this.round;
        },
        enumerable: true,
        configurable: true
    });
    Match.prototype.draw = function () {
        var base = document.getElementById("tournament");
        var tableHTML = "<table class='tour-match' style='position: absolute;";
        tableHTML += "left:" + this.left.toString() + "px;";
        tableHTML += "top:" + this.top + "px;";
        tableHTML += "'>";
        for (var _i = 0, _a = this.places; _i < _a.length; _i++) {
            var place = _a[_i];
            tableHTML += this.makeOneTr(place);
        }
        tableHTML += "</table>";
        if (base != null) {
            base.insertAdjacentHTML("beforeend", tableHTML);
        }
    };
    Match.prototype.makeOneTr = function (place) {
        var nameString = "";
        var pointString = "";
        var missString = "";
        var rankString = "";
        if (place != null) {
            nameString = place.name;
            if (place.result != null) {
                pointString = place.result.point.toString();
                missString = place.result.miss.toString();
                rankString = place.result.rank.toString();
            }
        }
        return "<tr>\n        <td class=\"tour-name\">" + nameString + "</td>\n        <td class=\"tour-point\">" + pointString + "-" + missString + "</td>\n        <td class=\"tour-rank\">" + rankString + "</td>\n        </tr>";
    };
    Match.horiInterval = 50;
    Match.vertInterval = 10;
    return Match;
}());
exports.Match = Match;

},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Place = /** @class */ (function () {
    function Place(name) {
        this.name = name;
        this.result = null;
    }
    Place.prototype.setResult = function (point, miss, rank) {
        this.result = { point: point, miss: miss, rank: rank };
    };
    return Place;
}());
exports.Place = Place;

},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Tournament = /** @class */ (function () {
    function Tournament() {
    }
    return Tournament;
}());
exports.Tournament = Tournament;

},{}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var class_1 = require("./class");
function buildTournament() {
    var place1 = new class_1.Place("wktk");
    var place2 = new class_1.Place("ktkr");
    var place3 = new class_1.Place("佐々木 忠次郎");
    var place4 = null;
    var match1 = new class_1.Match([place1, place2, place3, place4], "W", 0, 0);
    match1.draw();
    place1.setResult(7, 0, 1);
    place2.setResult(3, 2, 4);
    var match2 = new class_1.Match([place1, place2, place3, place4], "W", 0, 1);
    match2.draw();
    for (var i = 0; i < 15; i++) {
        var match = new class_1.Match([place1, place2, place3, place4], "W", i, i + 2);
        match.draw();
    }
    var base = document.getElementById("tournament");
    if (base != null) {
        var width = 1500;
        base.style.width = width + "px";
        base.style.height = "1000px";
        var content = document.getElementById("content");
        if (content != null) {
            content.style.maxWidth = width + "px";
        }
    }
}
document.addEventListener("DOMContentLoaded", function () {
    class_1.Match.calcSize();
    buildTournament();
});

},{"./class":1}]},{},[5]);
