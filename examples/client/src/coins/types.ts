export interface CoinsResponse {
    title: string;
    project: string;
    img: string;
    policyId: string;
    nameHex: string;
    decimals: number;
    quantity: number;
    Category?: string;
    Website?: string;
    Twitter?: string;
    tradableCoins: CoinId[];
    verified?: boolean;
}

export interface CoinId {
    policyId: string;
    nameHex: string;
    isAssetA: boolean;
}