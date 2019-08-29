class Player {
    name: string | null;
    point: number | null;
    miss: number | null;

    constructor (name: string | null, point: number | null, miss: number | null) {
        this.name = name;
        this.point = point;
        this.miss = miss;
    }
}

function buildTournament(players: Player[]): void {
    let base = document.getElementById("tournament");
    let tableHTML = '<table class="tour-match">';
    for (let i = 0; i < players.length; i++) {
        tableHTML += makeOneTr(players[i]);
    }
    tableHTML += "</table>";
    if (base != null) {
        base.insertAdjacentHTML('beforeend', tableHTML);
    }
}

function makeOneTr(player: Player): string {
    let nameString = "";
    if (player.name != null) {
        nameString = player.name;
    }
    let pointString = "";
    if (player.point != null) {
        pointString = player.point.toString();
    }
    let missString = "";
    if (player.miss != null) {
        missString = player.miss.toString();
    }
    return `<tr>
    <td class="tour-name">${nameString}</td>
    <td class="tour-point">${pointString}</td>
    <td class="tour-miss">${missString}</td>
    </tr>`;
}

document.addEventListener("DOMContentLoaded", () => {
    buildTournament([new Player("wktk", 7, 0), new Player("ktkr", 7, 1), new Player("今北sangyou", 5, 2), new Player(null, null, null)]);
    buildTournament([new Player("wktk", 7, 0), new Player("ktkr", 7, 1), new Player("今北sangyou", 5, 2), new Player("kwsk", 4, 3)]);
});
