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
    function Match(side, pos, tournament) {
        this.places = [null, null, null, null];
        this.nextPos = [null, null, null, null];
        this.isDummy = false;
        this.side = side;
        this.pos = pos;
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
            return (this.tournament.matchHeight + this.tournament.vertiInterval) * this.pos.id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Match.prototype, "left", {
        get: function () {
            if (this.isDummy) {
                return 0;
            }
            return (this.tournament.matchWidth + this.tournament.horiInterval) * this.pos.round;
        },
        enumerable: true,
        configurable: true
    });
    Match.prototype.draw = function () {
        var base = document.getElementById("tournament");
        var idString = "match-" + this.side + "-" + this.pos.round + "-" + this.pos.id;
        var tableHTML = "<table class='tour-match' ";
        tableHTML += "id='" + idString + "' ";
        tableHTML += "style='position: absolute; ";
        tableHTML += "left:" + this.left.toString() + "px; ";
        tableHTML += "top:" + this.top + "px;";
        tableHTML += "'>";
        for (var i = 0; i < this.places.length; i++) {
            tableHTML += this.makeOneTr(this.places[i], i);
        }
        tableHTML += "</table>";
        if (base !== null) {
            base.insertAdjacentHTML("beforeend", tableHTML);
        }
    };
    Match.prototype.setResult = function (results) {
        for (var i = 0; i < results.length; i++) {
            if (this.places[i] === null) {
                continue;
            }
            // nullチェックをしたので絶対あります
            this.places[i].result = results[i];
            var placeName = "place-" + this.side + "-" + this.pos.round + "-" + this.pos.id + "-" + i;
            var placeElement = document.getElementById(placeName);
            if (placeElement === null) {
                console.log("結果を設定しようとした位置が不正です");
            }
            // nullチェックをしたので絶対あります
            placeElement.innerHTML = this.makePlaceHTML(this.places[i]);
        }
        this.tournament.bringNamesToNextMatch(this.pos);
    };
    Match.prototype.makeOneTr = function (place, placeNum) {
        return "<tr id='place-" + this.side + "-" + this.pos.round + "-" + this.pos.id + "-" + placeNum + "'>\n        " + this.makePlaceHTML(place) + "\n        </tr>";
    };
    Match.prototype.makePlaceHTML = function (place) {
        var nameString = "";
        var pointString = "";
        var missString = "";
        var rankString = "";
        if (place !== null) {
            nameString = place.name;
            if (place.result !== null) {
                pointString = place.result.point.toString();
                missString = place.result.miss.toString();
                rankString = (place.result.rank + 1).toString();
            }
        }
        return "<td class='tour-name'>" + nameString + "</td>\n        <td class='tour-point'>" + pointString + "-" + missString + "</td>\n        <td class='tour-rank'>" + rankString + "</td>";
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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var class_1 = require("../class");
var Tournament = /** @class */ (function () {
    function Tournament(playerSize) {
        this.matchWidth = 0;
        this.matchHeight = 0;
        this.horiInterval = 50;
        this.vertiInterval = 10;
        this.priorityToRound1Place = [];
        this.calcMatchSize();
        this.playerSize = playerSize;
        this.calcRounds();
        this.calcSize();
        this.makeMatches();
        this.setNextPoses(0);
        this.calcPriorityToPlace();
    }
    Tournament.prototype.draw = function () {
        for (var i = 0; i < this.rounds; i++) {
            for (var j = 0; j < Math.pow(2, (this.rounds - i - 1)); j++) {
                this.matches[i][j].draw();
            }
        }
    };
    Tournament.prototype.bringNamesToNextMatch = function (pos) {
        var match = this.matches[pos.round][pos.id];
        for (var _i = 0, _a = match.places; _i < _a.length; _i++) {
            var place = _a[_i];
            if (place === null || place.result === null) {
                continue;
            }
            var rank = place.result.rank;
            if (match.nextPos[rank] === undefined || match.nextPos[rank] === null) {
                continue;
            }
            // nullチェックをしているので絶対あります
            this.setName("W", match.nextPos[rank], place.name);
        }
    };
    Tournament.prototype.setPlayerNameToRound1 = function (names) {
        for (var i = 0; i < names.length; i++) {
            if (i >= this.priorityToRound1Place.length) {
                continue;
            }
            this.setName("W", this.priorityToRound1Place[i], names[i]);
        }
    };
    Tournament.prototype.setName = function (side, pos, name) {
        if (this.matches[pos.round] === undefined || this.matches[pos.round][pos.id] === undefined) {
            console.log("存在しない場所に名前を入力しようとしています");
            return;
        }
        var matchName = "match-" + side + "-" + pos.round + "-" + pos.id;
        var matchElement = document.getElementById(matchName);
        if (matchElement !== null) {
            // matchの親はtournamentなのでparentは絶対あります
            matchElement.parentNode.removeChild(matchElement);
        }
        var match = this.matches[pos.round][pos.id];
        var place = match.places[pos.placeNum];
        if (place === undefined) {
            console.log("1試合の人数を外れた部分に名前を入力しようとしています");
            return;
        }
        if (place === null) {
            match.places[pos.placeNum] = new class_1.Place(name);
        }
        match.places[pos.placeNum].name = name;
        match.draw();
    };
    Tournament.prototype.calcPriorityToPlace = function () {
        var gradedPoses = [[0], [0, 1]];
        var _loop_1 = function (i) {
            var basePoses = gradedPoses[gradedPoses.length - 1];
            var workingPoses = [];
            var _loop_2 = function (j) {
                workingPoses.push(basePoses.map(function (x) { return (x + basePoses.length * j); }));
            };
            for (var j = 0; j < 2; j++) {
                _loop_2(j);
            }
            var newGradePoses = [];
            for (var j = 0; j < basePoses.length / 2; j++) {
                newGradePoses.push(workingPoses[0][j * 2]);
                newGradePoses.push(workingPoses[1][j * 2 + 1]);
                newGradePoses.push(workingPoses[1][j * 2]);
                newGradePoses.push(workingPoses[0][j * 2 + 1]);
            }
            gradedPoses.push(newGradePoses);
        };
        for (var i = 0; i < this.rounds; i++) {
            _loop_1(i);
        }
        var resultPoses = gradedPoses[gradedPoses.length - 1];
        for (var i = 0; i < resultPoses.length / 4; i++) {
            var matchNums = [];
            for (var j = 0; j < 4; j++) {
                matchNums.push(resultPoses[i * 4 + j]);
            }
            matchNums = matchNums.sort(function (a, b) { return a - b; });
            for (var j = 0; j < 4; j++) {
                this.priorityToRound1Place[matchNums[j]] = { round: 0, id: i, placeNum: j };
            }
        }
    };
    Tournament.prototype.calcMatchSize = function () {
        var dummy = new class_1.Match("W", { round: 0, id: 0 }, this);
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
                oneRoundMatches[j] = new class_1.Match("W", { round: i, id: j }, this);
            }
            this.matches[i] = oneRoundMatches;
        }
    };
    // currentRankは0位から
    Tournament.prototype.setNextPos = function (currentPos, currentRank, next) {
        this.matches[currentPos.round][currentPos.id].nextPos[currentRank] = __assign({ round: currentPos.round + 1 }, next);
    };
    Tournament.prototype.setNextPoses = function (round) {
        if (this.rounds - round === 1) {
            return;
        }
        else if (this.rounds - round === 2) {
            this.setNextPos({ round: round, id: 0 }, 0, { id: 0, placeNum: 0 });
            this.setNextPos({ round: round, id: 1 }, 0, { id: 0, placeNum: 1 });
            this.setNextPos({ round: round, id: 0 }, 1, { id: 0, placeNum: 2 });
            this.setNextPos({ round: round, id: 1 }, 1, { id: 0, placeNum: 3 });
        }
        var baseMatchNum = Math.pow(2, (round - 1));
        var processingRounds = Math.floor((round + 1) / 2);
        var leapNum = 1;
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
    var playerNum = 8;
    var tournament = new class_1.Tournament(playerNum);
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
    var names = ["wktk1", "ktkr2", "kwsk3", "佐々木 忠次郎4"];
    for (var i = 0; i < playerNum - 4; i++) {
        names.push((i + 5).toString());
    }
    tournament.setPlayerNameToRound1(names);
    for (var i = 0; i < playerNum / 4; i++) {
        var match = tournament.matches[0][i];
        match.setResult([{ point: 7, miss: 0, rank: 0 }, { point: 7, miss: 1, rank: 1 },
            { point: 4, miss: 1, rank: 2 }, { point: 2, miss: 3, rank: 3 }]);
    }
}
document.addEventListener("DOMContentLoaded", function () {
    buildTournament();
});

},{"./class":1}]},{},[5]);
