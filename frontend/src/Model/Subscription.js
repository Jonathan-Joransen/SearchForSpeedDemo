class Subscription {
    constructor(endDate, type) {
        this.endDate = endDate
        this.isActive = this.GetIsActive()
        this.type = type
    }
    GetIsActive = () => {
        if (Date.now() <= this.endDate){
            return true;
        }
        return false;
    }
}

export default Subscription;