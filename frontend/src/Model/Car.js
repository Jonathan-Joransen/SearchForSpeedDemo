export default class Car {
    model;
    year;
    make;
    trim;
    price;
    retailer;
    speed;
    placement;
    title;
    image;
    link;
    constructor(model, year, make, trim, price, retailer, speed, placement, title, image, link){
        this.model = model;
        this.year = year;
        this.make = make;
        this.trim = trim;
        this.price = price;
        this.retailer = retailer;
        this.speed = speed;
        this.placement = placement;
        this.title = title;
        this.image = image;
        this.link = link;
    }
    asObj = () => {
        return {
            model: this.model,
            year: this.year,
            make: this.make,
            trim: this.trim,
            price: this.price,
            retailer: this.retailer,
            speed: this.speed,
            placement: this.placement,
            title: this.title,
            image: this.image,
            link: this.link,
        }
    }
}