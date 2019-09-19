import {Place} from "./Place";

type Side = "W" | "L";

export class Match {
    static width: number;
    static height: number;
    static horiInterval: number = 50;
    static vertInterval: number = 10;
    places: Array<Place | null>;
    side: Side;
    round: number;
    id: number;
    isDummy: boolean = false;

    constructor(places: Array<Place | null>, side: Side, round: number, id: number) {
        this.places = places;
        this.side = side;
        this.round = round;
        this.id = id;
    }

    static calcSize(): void {
        let dummy = new Match([null, null, null, null], "W", 0, 0);
        dummy.isDummy = true;
        dummy.draw();
        let matches = document.getElementsByClassName("tour-match");
        if (matches.length === 0) {
            console.log("試合がないよ");
            return;
        }
        let basematch = matches[0] as HTMLElement;
        this.width = basematch.getBoundingClientRect().width;
        this.height = basematch.getBoundingClientRect().height;
        // dummyを作っているのがtournamentなのでparentは絶対あります
        basematch.parentNode!.removeChild(basematch);
    }

    get top(): number {
        if (this.isDummy) {
            return 0;
        }
        function calcTop(round: number): number {
            if (round === 0) {
                return 0;
            }
            return 0;
        }
        return (Match.height + Match.vertInterval) * this.id;
    }

    get left(): number {
        if (this.isDummy) {
            return 0;
        }
        return (Match.width + Match.horiInterval) * this.round;
    }

    draw() {
        let base = document.getElementById("tournament");
        let tableHTML = "<table class='tour-match' style='position: absolute;";
        tableHTML += "left:" + this.left.toString() + "px;";
        tableHTML += "top:" + this.top + "px;";
        tableHTML += "'>";
        for (let place of this.places) {
            tableHTML += this.makeOneTr(place);
        }
        tableHTML += "</table>";
        if (base != null) {
            base.insertAdjacentHTML("beforeend", tableHTML);
        }
    }

    private makeOneTr(place: Place |  null): string {
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
}
