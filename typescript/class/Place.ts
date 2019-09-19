interface PlaceResult {
    point: number;
    miss: number;
    rank: number;
}

export class Place {
    name: string;
    result: PlaceResult | null;

    constructor(name: string) {
        this.name = name;
        this.result = null;
    }

    setResult(point: number, miss: number, rank: number): void {
        this.result = {point, miss, rank};
    }
}
