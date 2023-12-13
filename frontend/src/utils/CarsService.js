import Car from "../Model/Car"
import Makes from "../data/makes"

export const GetCars = () => {
    return [
        new Car("Challenger", 2020, Makes.Dodge, "R/T Scat Pack", "$43,900", "HeywardAllenToyota", 4.2, 1, "", "images/cars/dodgechallenger2020.png", "https://www.heywardallentoyota.com/inventory/used-2020-dodge-challenger-rt-scat-pack-rwd-2d-coupe-2c3cdzfj6lh110593/?utm_source=lotlinx&utm_medium=cpc&utm_campaign=lotlinx&utm_term=2C3CDZFJ6LH110593_D8857765%2f7C65%2f4718%2fA582%2fAD9EA8F56E0A").asObj(),
        new Car("650", 2013, Makes.BMW, "i", "$19,995", "Cars", 4.6, 2, "", "images/cars/bmw6502013.png", "https://www.cars.com/vehicledetail/bcc652c5-cc62-4ff6-82a8-2269d40a60b6/?aff=atempest&utm_campaign=atempest&utm_source=autotempest&utm_medium=trp&utm_campaign_id=1&utm_trusted=TRUE").asObj(),
        new Car("Sky", 2008, Makes.Saturn, "Red Line",  "$6,000", "CarsAndBids", 5.1, 3, "", "images/cars/saturnsky2008.png", "https://carsandbids.com/auctions/3y4nVAJM/2008-saturn-sky-red-line?utm_source=autotempest&utm_medium=referral&utm_campaign=at_search").asObj(),
        new Car("Cooper", 2013, Makes.Mini, "Paceman Sport", "$13,000", "PrivateAuto", 7.1, 4, "", "images/cars/minicooper2013.png", "https://privateauto.com/listing/2013-mini-paceman-vwcrle7rkuc?utm_source=autotempest&utm_medium=referral&utm_campaign=autotempest_listings").asObj(),
        new Car("Accord", 2017, Makes.Honda, "Sport", "$18,400", "Cars", 7.2, 5, "", "images/cars/hondaaccord2017.png", "https://www.cars.com/vehicledetail/c92059cb-45d2-4bcf-a1c9-044754dd6d2e/?aff=atempest&utm_campaign=atempest&utm_source=autotempest&utm_medium=trp&utm_campaign_id=1&utm_trusted=TRUE").asObj(),
        new Car("Wrangler", 2018, Makes.Jeep, "JK Sahara",   "$29,900", "HeywardAllenToyota", 7.5, 6, "", "images/cars/jeepwrangler2018.png", "https://www.heywardallentoyota.com/inventory/used-2018-jeep-wrangler-jk-sahara-4wd-2d-sport-utility-1c4ajwbgxjl810895/?utm_source=lotlinx&utm_medium=cpc&utm_campaign=lotlinx&utm_term=1C4AJWBGXJL810895_3A3D965D%2f48CE%2f8EC3%2f06EC%2fF23A64DFF5A6").asObj(),
    ]
}

