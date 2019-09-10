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
function buildTournament(places) {
    var base = document.getElementById("tournament");
    var tableHTML = '<table class="tour-match">';
    for (var i = 0; i < places.length; i++) {
        tableHTML += makeOneTr(places[i]);
    }
    tableHTML += "</table>";
    if (base != null) {
        base.insertAdjacentHTML('beforeend', tableHTML);
    }
}
function makeOneTr(place) {
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
    return "<tr>\n    <td class=\"tour-name\">" + nameString + "</td>\n    <td class=\"tour-point\">" + pointString + "</td>\n    <td class=\"tour-miss\">" + missString + "</td>\n    <td class=\"tour-rank\">" + rankString + "</td>\n    </tr>";
}
document.addEventListener("DOMContentLoaded", function () {
    var place1 = new TrPlace("wktk");
    var place2 = new TrPlace("ktkr");
    var place3 = new TrPlace("あいうえおかきくけこ");
    var place4 = null;
    place1.setResult(7, 0, 1);
    place2.setResult(3, 2, 4);
    buildTournament([place1, place2, place3, place4]);
    // buildTournament([new TrPlace("wktk", 7, 0), new TrPlace("ktkr", 7, 1), new TrPlace("今北sangyou", 5, 2), new TrPlace("kwsk", 4, 3)]);
});
