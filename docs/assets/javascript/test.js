"use strict";
function buildTournament(names, sets) {
    var base = document.getElementById("tournament");
    var tableHTML = '<table class="tour-match">';
    for (var i = 0; i < names.length; i++) {
        tableHTML += makeOneTr(names[i], sets[i]);
    }
    tableHTML += "</table>";
    if (base != null) {
        base.insertAdjacentHTML('beforeend', tableHTML);
    }
}
function makeOneTr(name, set) {
    return "<tr>\n    <td class=\"tour-name\">" + name + "</td>\n    <td class=\"tour-set\">" + set + "</td>\n    </tr>";
}
document.addEventListener("DOMContentLoaded", function () {
    buildTournament(["wktk", "ktkr", "今北sangyou", "kwsk"], [2, 1, 0, 0]);
    buildTournament(["wktk", "ktkr", "今北sangyou", "kwsk"], [2, 1, 0, 0]);
});
function hoge() {
}
