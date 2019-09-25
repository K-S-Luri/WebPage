import {Place, Match, Tournament} from "./class";

function buildTournament(): void {
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

    let playerNum = 1024;
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
