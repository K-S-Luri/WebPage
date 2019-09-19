import {TrPlace, TrMatch} from './trClass';

function buildTournament(): void {
    const place1:TrPlace = new TrPlace("wktk");
    const place2:TrPlace = new TrPlace("ktkr");
    const place3:TrPlace = new TrPlace("佐々木 忠次郎");
    const place4 = null;
    let match1 = new TrMatch([place1, place2, place3, place4], "W", 0, 0);
    match1.draw();
    place1.setResult(7, 0, 1);
    place2.setResult(3, 2, 4);
    let match2 = new TrMatch([place1, place2, place3, place4], "W", 0, 1);
    match2.draw();
    for (let i = 0; i < 15; i++) {
        let match = new TrMatch([place1, place2, place3, place4], "W", i, i + 2);
        match.draw();
    }

    let base = document.getElementById("tournament");
    if (base != null) {
        let width = 1500;
        base.style.width = width + "px";
        base.style.height = "1000px";
        let content = document.getElementById("content");
        if (content != null) {
            content.style.maxWidth = width + "px";
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    TrMatch.calcSize();
    buildTournament();
});
