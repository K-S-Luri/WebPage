import {Side, Place, Match} from "../class";

export class Tournament {
    playerSize: number;
    rounds!: number;
    width!: number;
    height!: number;
    matchWidth: number = 0;
    matchHeight: number = 0;
    horiInterval: number = 50;
    vertiInterval: number = 10;
    matches!: Match[][];

    constructor(playerSize: number) {
        this.calcMatchSize();
        this.playerSize = playerSize;
        this.calcRounds();
        this.calcSize();
        this.makeMatches();
    }

    draw(): void {
        for (let i = 0; i < this.rounds; i++) {
            for (let j = 0; j < 2 ** (this.rounds - i - 1); j++) {
                this.matches[i][j].draw();
            }
        }
    }

    setName(side: Side, round: number, id: number, placeNumber: number, name: string): void {
        if (this.matches[round] === undefined || this.matches[round][id] === undefined) {
            console.log("存在しない場所に名前を入力しようとしています");
            return;
        }
        let matchName = "match-" + side + "-" + round + "-" + id;
        let matchElement = document.getElementById(matchName);
        if (matchElement !== null) {
            // matchの親はtournamentなのでparentは絶対あります
            matchElement.parentNode!.removeChild(matchElement);
        }
        let match = this.matches[round][id];
        let place = match.places[placeNumber];
        if (place === undefined) {
            console.log("1試合の人数を外れた部分に名前を入力しようとしています");
            return;
        }
        if (place === null) {
            match.places[placeNumber] = new Place(name);
        }
        match.places[placeNumber]!.name = name;
        match.draw();
    }

    private calcMatchSize(): void {
        let dummy = new Match("W", {round: 0, id: 0}, this);
        dummy.isDummy = true;
        dummy.draw();
        let matches = document.getElementsByClassName("tour-match");
        if (matches.length === 0) {
            console.log("試合がないよ");
            return;
        }
        let basematch = matches[0] as HTMLElement;
        this.matchWidth = basematch.getBoundingClientRect().width;
        this.matchHeight = basematch.getBoundingClientRect().height;
        // dummyを作っているのがtournamentなのでparentは絶対あります
        basematch.parentNode!.removeChild(basematch);
    }

    private calcRounds(): void {
        let placeNumber = 4;
        let rounds = 1;
        while (1) {
            if (placeNumber >= this.playerSize) {
                break;
            }
            placeNumber *= 2;
            rounds++;
        }
        this.rounds = rounds;
    }

    private calcSize(): void {
        this.width = this.rounds * this.matchWidth + (this.rounds - 1) * this.horiInterval;
        let round1MatchNumber = 2 ** (this.rounds - 1);
        this.height = round1MatchNumber * this.matchHeight + (round1MatchNumber - 1) * this.vertiInterval;
    }

    private makeMatches(): void {
        this.matches = [];
        for (let i = 0; i < this.rounds; i++) {
            let oneRoundMatches = [];
            for (let j = 0; j < 2 ** (this.rounds - i - 1); j++) {
                oneRoundMatches[j] = new Match("W", {round: i, id: j}, this);
            }
            this.matches[i] = oneRoundMatches;
        }
    }
}
