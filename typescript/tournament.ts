interface TrPlaceResult {
    point: number;
    miss: number;
    rank: number
}

class TrPlace {
    name: string;
    result: TrPlaceResult | null;

    constructor (name: string) {
        this.name = name;
        this.result = null;
    }

    public setResult(point: number, miss: number, rank: number): void {
        this.result = {point: point, miss: miss, rank: rank };
    }
}

function buildTournament(): void {
    let base = document.getElementById("tournament");
    if (base != null) {
        base.style.width = "1000px";
        base.style.height = "1000px";
    }
    let matches = document.getElementsByClassName("tour-match");
    if (matches.length > 0) {
        let match = matches[0] as HTMLElement;
        let matchWidth = match.getBoundingClientRect().width;
        let matchHeight = match.getBoundingClientRect().height;
        console.log(matchWidth);
        console.log(matchHeight);
    } else {
        console.log("だめだよ")
    }
}

function makeOneMatch(places: (TrPlace | null)[]): void {
    let base = document.getElementById("tournament");
    let tableHTML = '<table class="tour-match">';
    for (let i = 0; i < places.length; i++) {
        tableHTML += makeOneTr(places[i]);
    }
    tableHTML += "</table>";
    if (base != null) {
        base.insertAdjacentHTML('beforeend', tableHTML);
    }
}

function makeOneTr(place: TrPlace |  null): string {
    let nameString = "";
    let pointString = "";
    let missString = "";
    let rankString = "";
    if (place != null) {
        nameString = place.name;
        if (place.result != null) {
            pointString = place.result.point.toString();
            missString = place.result.miss.toString();
            rankString = place.result.rank.toString();
        }
    }
    return `<tr>
    <td class="tour-name">${nameString}</td>
    <td class="tour-point">${pointString}-${missString}</td>
    <td class="tour-rank">${rankString}</td>
    </tr>`;
}

document.addEventListener("DOMContentLoaded", () => {
    const place1:TrPlace = new TrPlace("wktk");
    const place2:TrPlace = new TrPlace("ktkr");
    const place3:TrPlace = new TrPlace("佐々木 忠次郎");
    const place4 = null;
    makeOneMatch([place1, place2, place3, place4]);
    place1.setResult(7, 0, 1);
    place2.setResult(3, 2, 4);
    makeOneMatch([place1, place2, place3, place4]);
    // buildTournament([new TrPlace("wktk", 7, 0), new TrPlace("ktkr", 7, 1), new TrPlace("今北sangyou", 5, 2), new TrPlace("kwsk", 4, 3)]);
    buildTournament();
});
