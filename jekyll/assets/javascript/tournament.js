"use strict";
var TrPlace = /** @class */ (function () {
    function TrPlace(name) {
        this.name = name;
        this.result = null;
    }
    TrPlace.prototype.setResult = function (point, miss, rank) {
        this.result = { point: point, miss: miss, rank: rank };
    };
    return TrPlace;
}());
var TrMatch = /** @class */ (function () {
    function TrMatch(places, side, round, id) {
        this.isDummy = false;
        this.places = places;
        this.side = side;
        this.round = round;
        this.id = id;
    }
    TrMatch.calcSize = function () {
        var dummy = new TrMatch([null, null, null, null], "W", 0, 0);
        dummy.isDummy = true;
        dummy.draw();
        var matches = document.getElementsByClassName("tour-match");
        if (matches.length == 0) {
            console.log("試合がないよ");
            return;
        }
        var basematch = matches[0];
        this.width = basematch.getBoundingClientRect().width;
        this.height = basematch.getBoundingClientRect().height;
        //dummyを作っているのがtournamentなのでparentは絶対あります
        basematch.parentNode.removeChild(basematch);
    };
    Object.defineProperty(TrMatch.prototype, "top", {
        get: function () {
            if (this.isDummy) {
                return 0;
            }
            function calcTop(round) {
                if (round == 0) {
                    return 0;
                }
                return 0;
            }
            return (TrMatch.height + 10) * this.id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TrMatch.prototype, "left", {
        get: function () {
            if (this.isDummy) {
                return 0;
            }
            return (TrMatch.width + 20) * this.round;
        },
        enumerable: true,
        configurable: true
    });
    TrMatch.prototype.draw = function () {
        var base = document.getElementById("tournament");
        var tableHTML = '<table class="tour-match" style="position: absolute;';
        tableHTML += 'left:' + this.left.toString() + 'px;';
        tableHTML += 'top:' + this.top + 'px;';
        tableHTML += '">';
        for (var i = 0; i < this.places.length; i++) {
            tableHTML += this.makeOneTr(this.places[i]);
        }
        tableHTML += "</table>";
        if (base != null) {
            base.insertAdjacentHTML('beforeend', tableHTML);
        }
    };
    TrMatch.prototype.makeOneTr = function (place) {
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
    return TrMatch;
}());
function buildTournament() {
    var base = document.getElementById("tournament");
    if (base != null) {
        base.style.width = "1000px";
        base.style.height = "1000px";
    }
}
document.addEventListener("DOMContentLoaded", function () {
    TrMatch.calcSize();
    var place1 = new TrPlace("wktk");
    var place2 = new TrPlace("ktkr");
    var place3 = new TrPlace("佐々木 忠次郎");
    var place4 = null;
    var match1 = new TrMatch([place1, place2, place3, place4], "W", 0, 0);
    match1.draw();
    place1.setResult(7, 0, 1);
    place2.setResult(3, 2, 4);
    var match2 = new TrMatch([place1, place2, place3, place4], "W", 0, 1);
    match2.draw();
    for (var i = 0; i < 8; i++) {
        var match = new TrMatch([place1, place2, place3, place4], "W", i, i + 2);
        match.draw();
    }
    buildTournament();
});
