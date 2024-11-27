export interface AggregateRequest {
    sellCoin: Asset;
    sellAmount: number;
    buyCoin: Asset;
    slippage: number;
    walletAddress: string;
    additionalFees: AdditionalFee[];
    buildTx: boolean;
}

export type AdditionalFee = {
    title: string;
    description: string;
    walletAddress: string;
    value: bigint;
};

export interface DexInfo {
    dexName: string;
    price: number;
    minimumReceive: number;
    estimatedReceive: string;
    priceImpactPercent: number;
    swapFees: SwapFee[];
    splitPercent: number;
    sellAmount: Number;
}

export type SwapFee = {
    id: string;
    title: string;
    description: string;
    value: bigint;
    isReturned: boolean;
};

export declare class Asset {
    policyId: string;
    nameHex: string;
    decimals: number;
}

export interface AggregateResponse {
    aggregateDetails: {
        estimatedReceive: number;
        dexInfo: DexInfo[];
    };
    txCbor: string;
}

