interface TrPlaceResult {
    point: number;
    miss: number;
    rank: number
}

export class TrPlace {
    name: string;
    result: TrPlaceResult | null;

    constructor (name: string) {
        this.name = name;
        this.result = null;
    }

    setResult(point: number, miss: number, rank: number): void {
        this.result = {point: point, miss: miss, rank: rank };
    }
}

type TrSide = "W" | "L";

export class TrMatch {
    places: (TrPlace | null)[];
    side: TrSide;
    round: number;
    id: number;
    isDummy: boolean = false;
    static width: number;
    static height: number;
    static horiInterval: number = 50;
    static vertInterval: number = 10;

    constructor (places: (TrPlace | null)[], side: TrSide, round: number, id: number) {
        this.places = places;
        this.side = side;
        this.round = round;
        this.id = id;
    }

    static calcSize(): void {
        let dummy = new TrMatch([null, null, null, null], "W", 0, 0);
        dummy.isDummy = true;
        dummy.draw();
        let matches = document.getElementsByClassName("tour-match");
        if (matches.length == 0) {
            console.log("試合がないよ");
            return;
        }
        let basematch = matches[0] as HTMLElement;
        this.width = basematch.getBoundingClientRect().width;
        this.height = basematch.getBoundingClientRect().height;
        //dummyを作っているのがtournamentなのでparentは絶対あります
        basematch.parentNode!.removeChild(basematch);
    }

    get top(): number {
        if (this.isDummy) {
            return 0;
        }
        function calcTop(round: number): number {
            if (round == 0) {
                return 0;
            }
            return 0;
        }
        return (TrMatch.height + TrMatch.vertInterval) * this.id;
    }

    get left(): number {
        if (this.isDummy) {
            return 0;
        }
        return (TrMatch.width + TrMatch.horiInterval) * this.round;
    }

    draw() {
        let base = document.getElementById("tournament");
        let tableHTML = '<table class="tour-match" style="position: absolute;';
        tableHTML += 'left:' + this.left.toString() + 'px;';
        tableHTML += 'top:' + this.top + 'px;';
        tableHTML += '">';
        for (let i = 0; i < this.places.length; i++) {
            tableHTML += this.makeOneTr(this.places[i]);
        }
        tableHTML += "</table>";
        if (base != null) {
            base.insertAdjacentHTML('beforeend', tableHTML);
        }
    }

    private makeOneTr(place: TrPlace |  null): string {
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