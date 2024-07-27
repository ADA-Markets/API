export interface ChartDataRequest {
    coinA: Asset;
    coinB: Asset;
    symbol: string
    resolution: string,
    from: number,
    to: number,
    countback: number
}

export interface ChartDataResponse {
    time: string
    open: Number,
    high: Number,
    low: Number,
    close: Number
}

export declare class Asset {
    policyId: string;
    nameHex: string;
    decimals: number;
}