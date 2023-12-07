import searchStyles from './Search.module.css';
import { CsvTextField } from '../Fields/Inputs.js';
import { Dropdown } from '../Fields/Dropdown.js'

let SearchAdvancedOptions = (props) => {
    return (
        <div className={searchStyles.searchAdvancedOptionsContainer}>
            <div className={searchStyles.searchAdvancedOptions}>
                <div className={searchStyles.searchAdvancedOptionsItem}>
                    <label>Min Year:</label>
                    <input className={searchStyles.searchTextInput} min="1900" max="2022" placeholder="1996" type="number" onInput={(e) => props.setAdvOptions({ ...props.advOptions, minYear: e.target.value })}></input>
                </div>
                <div className={searchStyles.searchAdvancedOptionsItem}>
                    <label>Max Year:</label>
                    <input className={searchStyles.searchTextInput} min="1900" max="2022" placeholder="2022" type="number" onInput={(e) => props.setAdvOptions({ ...props.advOptions, maxYear: e.target.value })}></input>
                </div>
                <div className={searchStyles.searchAdvancedOptionsItem}>
                    <label>Min Miles:</label>
                    <input className={searchStyles.searchTextInput} min="0" max="300000" placeholder="0" type="number" onInput={(e) => props.setAdvOptions({ ...props.advOptions, minMiles: e.target.value })}></input>
                </div>
                <div className={searchStyles.searchAdvancedOptionsItem}>
                    <label>Max Miles:</label>
                    <CsvTextField className={searchStyles.searchTextInput} placeholder="Any" onChange={(e) => props.setAdvOptions({ ...props.advOptions, maxMiles: e })}></CsvTextField>
                </div>
                <div className={searchStyles.searchAdvancedOptionsItem}>
                    <label>Min Price:</label>
                    <input className={searchStyles.searchTextInput} min="0" max="200000" placeholder="0" type="number" onInput={(e) => props.setAdvOptions({ ...props.advOptions, minPrice: e.target.value })}></input>
                </div>
                <div className={searchStyles.searchAdvancedOptionsItem}>
                    <label>Sale By:</label>
                    <Dropdown onInput={(e) => props.setAdvOptions({ ...props.advOptions, saleBy: e.target.value })} className={searchStyles.searchTextInput}
                        name="saleBy" id="saleBy"
                        options={[{ val: "undefined", title: "All" }, { val: "private", title: "Private" }, { val: "dealership", title: "Dealership" }]} />
                </div>
                <div className={searchStyles.searchAdvancedOptionsItem}>
                    <label>Sale Type:</label>
                    <Dropdown onInput={(e) => props.setAdvOptions({ ...props.advOptions, saleType: e.target.value })}
                        className={searchStyles.searchTextInput} name="saleType" id="saleType"
                        options={[{ val: "undefined", title: "All" }, { val: "classified", title: "Classified" }, { val: "auction", title: "Auction" }]} />
                </div>
                <div className={searchStyles.searchAdvancedOptionsItem}>
                    <label>Trans- mission:</label>
                    <Dropdown onInput={(e) => props.setAdvOptions({ ...props.advOptions, transmission: e.target.value })}
                        className={searchStyles.searchTextInput} name="transmission" id="transmission"
                        options={[{ val: "undefined", title: "All" }, { val: "auto", title: "Automatic" }, { val: "man", title: "Manual" }]} />
                </div>
                <div className={searchStyles.searchAdvancedOptionsItem}>
                    <label>Body Type:</label>
                    <Dropdown onInput={(e) => props.setAdvOptions({ ...props.advOptions, bodyType: e.target.value })}
                        className={searchStyles.searchTextInput} name="bodyType" id="bodyType"
                        options={[{ val: "undefined", title: "All" }, { val: "sedan", title: "Sedan" }, { val: "coupe", title: "Coupe" },
                        { val: "convertible", title: "Convertible" }, { val: "wagon", title: "Wagon" },
                        { val: "hatchback", title: "HatchBack" }, { val: "suv", title: "SUV" },
                        { val: "minivan", title: "MiniVan" }, { val: "truck", title: "Truck" }, { val: "van", title: "Van" }]} />
                </div>
            </div>
        </div >
    )
}


export default SearchAdvancedOptions

