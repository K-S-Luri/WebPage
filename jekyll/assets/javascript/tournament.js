function buildTournament(names, sets) {
    let base = document.getElementById("tournament");
    let tableHTML = '<table class="tour-match">';
    for (let i = 0; i < names.length; i++) {
        tableHTML += makeOneTr(names[i], sets[i]);
    }
    tableHTML += "</table>";
    base.insertAdjacentHTML('beforeend', tableHTML);
}

function makeOneTr(name, set) {
    return `<tr>
    <td class="tour-name">${name}</td>
    <td class="tour-set">${set}</td>
    </tr>`;
}

document.addEventListener("DOMContentLoaded", () => {
    buildTournament(["wktk", "ktkr", "今北sangyou", "kwsk"], [2, 1, 0, 0]);
    buildTournament(["wktk", "ktkr", "今北sangyou", "kwsk"], [2, 1, 0, 0]);
});