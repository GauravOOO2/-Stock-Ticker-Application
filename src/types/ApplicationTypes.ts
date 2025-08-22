export type SearchResult = {
  type: string;
  symbol: string;
  company: string;
};

export type CompanyDetails = {
  open: number;
  high: number;
  close: number;
  low: number;
  date: string;
  volume: number;
  value: number;
  change: number;
  percent: number;
  prev_close: number;
};

export interface StockMover {
  symbol: string;
  comp_name: string;
  close: number;
  percent: number;
}

export type tickerType = {
  name: string;
  index_name: string;
  total_count: number;
  losers_count: number;
  gainers_count: number;
  gainers: StockMover[];
  losers: StockMover[];
  volume_movers: StockMover[];
  exchange: string;
};
