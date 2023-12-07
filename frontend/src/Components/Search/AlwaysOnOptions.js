import searchStyles from './AlwaysOn.module.css';
import { CsvTextField } from '../Fields/Inputs.js';
import { Dropdown } from '../Fields/Dropdown.js';

let AlwaysOnOptions = (props) => {

    const distanceOptions = [
        { val: "25", title: "25 Miles" },
        { val: "50", title: "50 Miles" },
        { val: "75", title: "75 Miles", selected: true },
        { val: "100", title: "100 Miles" },
        { val: "150", title: "150 Miles" },
        { val: "200", title: "200 Miles" },
        { val: "250", title: "250 Miles" },
        { val: "300", title: "300 Miles" }
    ]
    const maxSpeedOptions = [
        { val: "2", title: "2.0 sec" },
        { val: "3", title: "3.0 sec" },
        { val: "4", title: "4.0 sec" },
        { val: "5", title: "5.0 sec" },
        { val: "6", title: "6.0 sec" },
        { val: "7", title: "7.0 sec", selected: true },
        { val: "8", title: "8.0 sec" },
        { val: "9", title: "9.0 sec" },
        { val: "10", title: "10 sec" },
        { val: "12", title: "12 sec" },
        { val: "14", title: "14 sec" }
    ]
    const maxPriceOptions = [
        { val: "3000", title: "$2,500" },
        { val: "3000", title: "$3,000" },
        { val: "3000", title: "$3,500" },
        { val: "4000", title: "$4,000" },
        { val: "5000", title: "$5,000" },
        { val: "6000", title: "$6,000" },
        { val: "7000", title: "$7,000" },
        { val: "8000", title: "$8,000" },
        { val: "9000", title: "$9,000" },
        { val: "10000", title: "$10,000" },
        { val: "12000", title: "$12,000" },
        { val: "14000", title: "$14,000" },
        { val: "16000", title: "$16,000", selected: true },
        { val: "18000", title: "$18,000" },
        { val: "20000", title: "$20,000" },
        { val: "25000", title: "$25,000" },
        { val: "30000", title: "$30,000" },
        { val: "35000", title: "$35,000" },
        { val: "40000", title: "$40,000" },
        { val: "45000", title: "$45,000" },
        { val: "50000", title: "$50,000" },
        { val: "60000", title: "$60,000" },
        { val: "70000", title: "$70,000" },
        { val: "80000", title: "$80,000" },
        { val: "100000", title: "$100,000" },
        { val: "150000", title: "$150,000" }
    ]

    return (
        <>
            <label className={searchStyles.alwaysOnLabel}>Max 0-60:</label>
            <div className={searchStyles.alwaysOnWrapper}>
                <Dropdown reference={props.maxZeroToSixtyRef} className={searchStyles.alwaysOnDropdown} name="maxSpeed" options={maxSpeedOptions} onInput={(e) => props.setMaxZeroToSixty(e.target.value)}></Dropdown>
            </div>
            <label className={searchStyles.alwaysOnLabel}>Max Price:</label>
            <div className={searchStyles.alwaysOnWrapper}>
                <Dropdown reference={props.maxPriceRef} className={searchStyles.alwaysOnDropdown} name="maxPrice" options={maxPriceOptions} onInput={(e) => props.setMaxPrice(e.target.value)}></Dropdown>
            </div>
            <label className={searchStyles.alwaysOnLabel}>Distance:</label>
            <div className={searchStyles.alwaysOnWrapper}>
                <Dropdown reference={props.distRef} className={searchStyles.alwaysOnDropdown} name="distance" options={distanceOptions} onInput={(e) => props.setDist(e.target.value)}></Dropdown>
            </div>


        </>
    )
}


export default AlwaysOnOptions

