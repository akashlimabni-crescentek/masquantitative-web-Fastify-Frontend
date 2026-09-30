export interface MarketCross{


    matched: boolean;
    message: string;
    marketPrimary: MarketPrimary;
    counterMarket: string;
    
    
}


export interface MarketPrimary{
    cannonical_id: string;
    platform: string;
    title: string;
    yes_price: Float16Array;
}   