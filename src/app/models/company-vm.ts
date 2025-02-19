export class CompanyVM {
  id: number;
  name: string;
  exchange: string;
  ticker: string;
  isin: string;
  website: string;


  constructor(id: number, name: string, exchange: string, ticker: string, isin: string, website: string) {
    this.id = id;
    this.name = name;
    this.exchange = exchange;
    this.ticker = ticker;
    this.isin = isin;
    this.website = website;
  }
}
