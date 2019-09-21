import {Side, Place, Match} from "../class";
import { MatchPos, PlacePos } from "./Match";

export class Tournament {
    playerSize: number;
    rounds!: number;
    width!: number;
    height!: number;
    matchWidth: number = 0;
    matchHeight: number = 0;
    horiInterval: number = 50;
    vertiInterval: number = 10;
    priorityToRound1Place: PlacePos[] = [];
    matches!: Match[][];

    constructor(playerSize: number) {
        this.calcMatchSize();
        this.playerSize = playerSize;
        this.calcRounds();
        this.calcSize();
        this.makeMatches();
        this.setNextPoses(0);
        this.calcPriorityToPlace();
    }

    draw(): void {
        for (let i = 0; i < this.rounds; i++) {
            for (let j = 0; j < 2 ** (this.rounds - i - 1); j++) {
                this.matches[i][j].draw();
            }
        }
    }

    setName(side: Side, pos: PlacePos, name: string): void {
        if (this.matches[pos.round] === undefined || this.matches[pos.round][pos.id] === undefined) {
            console.log("存在しない場所に名前を入力しようとしています");
            return;
        }
        let matchName = "match-" + side + "-" + pos.round + "-" + pos.id;
        let matchElement = document.getElementById(matchName);
        if (matchElement !== null) {
            // matchの親はtournamentなのでparentは絶対あります
            matchElement.parentNode!.removeChild(matchElement);
        }
        let match = this.matches[pos.round][pos.id];
        let place = match.places[pos.placeNum];
        if (place === undefined) {
            console.log("1試合の人数を外れた部分に名前を入力しようとしています");
            return;
        }
        if (place === null) {
            match.places[pos.placeNum] = new Place(name);
        }
        match.places[pos.placeNum]!.name = name;
        match.draw();
    }

    bringNamesToNextMatch(pos: MatchPos) {
        let match = this.matches[pos.round][pos.id];
        for (let place of match.places) {
            if (place === null || place.result === null) {
                continue;
            }
            let rank = place.result.rank;
            if (match.nextPos[rank] === undefined || match.nextPos[rank] === null) {
                continue;
            }
            // nullチェックをしているので絶対あります
            this.setName("W", match.nextPos[rank]!, place.name);
        }
    }

    setPlayerNameToRound1(names: string[]) {
        for (let i = 0; i < names.length; i++) {
            if (i >= this.priorityToRound1Place.length) {
                continue;
            }
            this.setName("W", this.priorityToRound1Place[i], names[i]);
        }
    }

    private calcPriorityToPlace(): void {
        let gradedPoses: number[][] = [[0], [0, 1]];
        for (let i = 0; i < this.rounds; i++) {
            let basePoses = gradedPoses[gradedPoses.length - 1];
            let workingPoses: number[][] = [];
            for (let j = 0; j < 2 ; j++) {
                workingPoses.push(basePoses.map(
                    (x) => (x + basePoses.length * j)));
            }
            let newGradePoses: number[] = [];
            for (let j = 0; j < basePoses.length / 2; j++) {
                newGradePoses.push(workingPoses[0][j * 2]);
                newGradePoses.push(workingPoses[1][j * 2 + 1]);
                newGradePoses.push(workingPoses[1][j * 2]);
                newGradePoses.push(workingPoses[0][j * 2 + 1]);
            }
            gradedPoses.push(newGradePoses);
        }
        let resultPoses = gradedPoses[gradedPoses.length - 1];
        for (let i = 0; i < resultPoses.length / 4; i++) {
            let matchNums: number[] = [];
            for (let j = 0; j < 4; j++) {
                matchNums.push(resultPoses[i * 4 + j]);
            }
            matchNums = matchNums.sort((a, b) => a - b);
            for (let j = 0; j < 4; j++) {
                this.priorityToRound1Place[matchNums[j]] = {round: 0, id: i, placeNum: j};
            }
        }
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

    // currentRankは0位から
    private setNextPos(currentPos: MatchPos, currentRank: number, next: {id: number, placeNum: number}): void {
        this.matches[currentPos.round][currentPos.id].nextPos[currentRank] = {round: currentPos.round + 1, ...next};
    }

    private setNextPoses(round: number): void {
        if (this.rounds - round === 1) {
            return;
        } else if (this.rounds - round === 2) {
            this.setNextPos({round, id: 0}, 0, {id: 0, placeNum: 0});
            this.setNextPos({round, id: 1}, 0, {id: 0, placeNum: 1});
            this.setNextPos({round, id: 0}, 1, {id: 0, placeNum: 2});
            this.setNextPos({round, id: 1}, 1, {id: 0, placeNum: 3});
        }
        let baseMatchNum = 2 ** (round - 1);
        let processingRounds = Math.floor((round + 1) / 2);
        let leapNum = 1;
    }
}
