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

    let tournament = new Tournament(64);

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
    tournament.setPlayerNameToRound1(["wktk1", "ktkr2", "kwsk3", "佐々木 忠次郎4", "5", "6", "7", "8", "9", "10",
    "11", "12", "13", "14", "15", "16"]);
}

document.addEventListener("DOMContentLoaded", () => {
    buildTournament();
});
