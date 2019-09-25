import {Tournament} from "./class";

function buildTournament(): void {
    let playerNum = 64;
    let tournament = new Tournament(playerNum);

    let base = document.getElementById("tournament");
    if (base !== null) {
        let width = tournament.width;
        base.style.width = width + "px";
        let height = tournament.height;
        base.style.height = height + "px";
        let content = document.getElementById("content");
        if (content !== null) {
            content.style.maxWidth = width + "px";
            content.style.maxHeight = height + "px";
        }
    }

    tournament.draw();
    let names = ["wktk1", "ktkr2", "kwsk3", "佐々木 忠次郎4"];
    for (let i = 0; i < playerNum - 4; i++) {
        names.push((i + 5).toString());
    }
    tournament.setPlayerNameToRound1(names);
    let playerNumCopy = playerNum;
    for (let i = 0; playerNumCopy >= 4; i++) {
        for (let j = 0; j < playerNumCopy / 4; j++) {
            let match = tournament.matches[i][j];
            match.setResult([{point: 7, miss: 0, rank: 0}, {point: 7, miss: 1, rank: 1},
                {point: 4, miss: 1, rank: 2}, {point: 2, miss: 3, rank: 3}]);
        }
        playerNumCopy /= 2;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    buildTournament();
});
