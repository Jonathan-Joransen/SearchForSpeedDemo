class Search {
    constructor(zip, dist, maxPrice, maxZeroToSixty, dbSearchId = null, body = "all", trans = "all", sale = "all", auctionSale = false, minMile = 0, maxMile = 600000, minYear = 1996, maxYear = new Date().getFullYear(), minPrice = 0) {
        this.dbSearchId = dbSearchId
        this.zip = zip
        this.body = body
        this.maxZeroToSixty = maxZeroToSixty
        this.dist = dist
        this.transmission = trans
        this.sale = sale
        this.includeAuctionSale = auctionSale
        this.minMileage = minMile
        this.maxMileage = maxMile
        this.minYear = minYear
        this.maxYear = maxYear
        this.minPrice = minPrice
        this.maxPrice = maxPrice
    }

    GetSearchId = () => {
        return (
            `${this.body}${this.dist}${this.includeAuctionSale}${this.maxMileage}${this.maxPrice}${this.maxYear}${this.minMileage}${this.minPrice}${this.minYear}${this.sale}${this.transmission}`
        )
    }
}


export default Search;