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
    function Match(side, round, id, tournament) {
        this.places = [null, null, null, null];
        this.isDummy = false;
        this.side = side;
        this.round = round;
        this.id = id;
        this.tournament = tournament;
    }
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
            return (this.tournament.matchHeight + this.tournament.vertiInterval) * this.id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Match.prototype, "left", {
        get: function () {
            if (this.isDummy) {
                return 0;
            }
            return (this.tournament.matchWidth + this.tournament.horiInterval) * this.round;
        },
        enumerable: true,
        configurable: true
    });
    Match.prototype.draw = function () {
        var base = document.getElementById("tournament");
        var idString = "match-" + this.side + "-" + this.round + "-" + this.id;
        var tableHTML = "<table class='tour-match' ";
        tableHTML += "id='" + idString + "' ";
        tableHTML += "style='position: absolute; ";
        tableHTML += "left:" + this.left.toString() + "px; ";
        tableHTML += "top:" + this.top + "px;";
        tableHTML += "'>";
        for (var _i = 0, _a = this.places; _i < _a.length; _i++) {
            var place = _a[_i];
            tableHTML += this.makeOneTr(place);
        }
        tableHTML += "</table>";
        if (base !== null) {
            base.insertAdjacentHTML("beforeend", tableHTML);
        }
    };
    Match.prototype.makeOneTr = function (place) {
        var nameString = "";
        var pointString = "";
        var missString = "";
        var rankString = "";
        if (place !== null) {
            nameString = place.name;
            if (place.result !== null) {
                pointString = place.result.point.toString();
                missString = place.result.miss.toString();
                rankString = place.result.rank.toString();
            }
        }
        return "<tr>\n        <td class=\"tour-name\">" + nameString + "</td>\n        <td class=\"tour-point\">" + pointString + "-" + missString + "</td>\n        <td class=\"tour-rank\">" + rankString + "</td>\n        </tr>";
    };
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
var class_1 = require("../class");
var Tournament = /** @class */ (function () {
    function Tournament(playerSize) {
        this.matchWidth = 0;
        this.matchHeight = 0;
        this.horiInterval = 50;
        this.vertiInterval = 10;
        this.calcMatchSize();
        this.playerSize = playerSize;
        this.calcRounds();
        this.calcSize();
        this.makeMatches();
    }
    Tournament.prototype.draw = function () {
        for (var i = 0; i < this.rounds; i++) {
            for (var j = 0; j < Math.pow(2, (this.rounds - i - 1)); j++) {
                this.matches[i][j].draw();
            }
        }
    };
    Tournament.prototype.setName = function (side, round, id, placeNumber, name) {
        if (this.matches[round] === undefined || this.matches[round][id] === undefined) {
            console.log("存在しない場所に名前を入力しようとしています");
            return;
        }
        var matchName = "match-" + side + "-" + round + "-" + id;
        var matchElement = document.getElementById(matchName);
        if (matchElement !== null) {
            // matchの親はtournamentなのでparentは絶対あります
            matchElement.parentNode.removeChild(matchElement);
        }
        var match = this.matches[round][id];
        var place = match.places[placeNumber];
        if (place === undefined) {
            console.log("1試合の人数を外れた部分に名前を入力しようとしています");
            return;
        }
        if (place === null) {
            match.places[placeNumber] = new class_1.Place(name);
        }
        match.places[placeNumber].name = name;
        match.draw();
    };
    Tournament.prototype.calcMatchSize = function () {
        var dummy = new class_1.Match("W", 0, 0, this);
        dummy.isDummy = true;
        dummy.draw();
        var matches = document.getElementsByClassName("tour-match");
        if (matches.length === 0) {
            console.log("試合がないよ");
            return;
        }
        var basematch = matches[0];
        this.matchWidth = basematch.getBoundingClientRect().width;
        this.matchHeight = basematch.getBoundingClientRect().height;
        // dummyを作っているのがtournamentなのでparentは絶対あります
        basematch.parentNode.removeChild(basematch);
    };
    Tournament.prototype.calcRounds = function () {
        var placeNumber = 4;
        var rounds = 1;
        while (1) {
            if (placeNumber >= this.playerSize) {
                break;
            }
            placeNumber *= 2;
            rounds++;
        }
        this.rounds = rounds;
    };
    Tournament.prototype.calcSize = function () {
        this.width = this.rounds * this.matchWidth + (this.rounds - 1) * this.horiInterval;
        var round1MatchNumber = Math.pow(2, (this.rounds - 1));
        this.height = round1MatchNumber * this.matchHeight + (round1MatchNumber - 1) * this.vertiInterval;
    };
    Tournament.prototype.makeMatches = function () {
        this.matches = [];
        for (var i = 0; i < this.rounds; i++) {
            var oneRoundMatches = [];
            for (var j = 0; j < Math.pow(2, (this.rounds - i - 1)); j++) {
                oneRoundMatches[j] = new class_1.Match("W", i, j, this);
            }
            this.matches[i] = oneRoundMatches;
        }
    };
    return Tournament;
}());
exports.Tournament = Tournament;

},{"../class":1}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var class_1 = require("./class");
function buildTournament() {
    // const place1 = new Place("wktk");
    // const place2 = new Place("ktkr");
    // const place3 = new Place("佐々木 忠次郎");
    // const place4 = null;
    // let match1 = new Match([place1, place2, place3, place4], "W", 0, 0);
    // match1.draw();
    // place1.setResult(7, 0, 1);
    // place2.setResult(3, 2, 4);
    // let match2 = new Match([place1, place2, place3, place4], "W", 0, 1);
    // match2.draw();
    // for (let i = 0; i < 15; i++) {
    //     let match = new Match([place1, place2, place3, place4], "W", i, i + 2);
    //     match.draw();
    // }
    var tournament = new class_1.Tournament(64);
    var base = document.getElementById("tournament");
    if (base !== null) {
        var width = tournament.width;
        base.style.width = width + "px";
        var height = tournament.height;
        base.style.height = height + "px";
        var content = document.getElementById("content");
        if (content !== null) {
            content.style.maxWidth = width + "px";
            content.style.maxHeight = height + "px";
        }
    }
    tournament.draw();
    tournament.setName("W", 3, 0, 0, "wktk");
    tournament.setName("W", 0, 0, 1, "ktkr");
    tournament.setName("W", 0, 0, 2, "kwsk");
    tournament.setName("W", 0, 0, 3, "佐々木 忠次郎");
}
document.addEventListener("DOMContentLoaded", function () {
    buildTournament();
});

},{"./class":1}]},{},[5]);
