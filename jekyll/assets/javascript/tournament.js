"use strict";
var Player = /** @class */ (function () {
    function Player(name, point, miss) {
        this.name = name;
        this.point = point;
        this.miss = miss;
    }
    return Player;
}());
function buildTournament(players) {
    var base = document.getElementById("tournament");
    var tableHTML = '<table class="tour-match">';
    for (var i = 0; i < players.length; i++) {
        tableHTML += makeOneTr(players[i]);
    }
    tableHTML += "</table>";
    if (base != null) {
        base.insertAdjacentHTML('beforeend', tableHTML);
    }
}
function makeOneTr(player) {
    var nameString = "";
    if (player.name != null) {
        nameString = player.name;
    }
    var pointString = "";
    if (player.point != null) {
        pointString = player.point.toString();
    }
    var missString = "";
    if (player.miss != null) {
        missString = player.miss.toString();
    }
    return "<tr>\n    <td class=\"tour-name\">" + nameString + "</td>\n    <td class=\"tour-point\">" + pointString + "</td>\n    <td class=\"tour-miss\">" + missString + "</td>\n    </tr>";
}
document.addEventListener("DOMContentLoaded", function () {
    buildTournament([new Player("wktk", 7, 0), new Player("ktkr", 7, 1), new Player("今北sangyou", 5, 2), new Player(null, null, null)]);
    buildTournament([new Player("wktk", 7, 0), new Player("ktkr", 7, 1), new Player("今北sangyou", 5, 2), new Player("kwsk", 4, 3)]);
});
