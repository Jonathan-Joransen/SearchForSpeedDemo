import Header from './Header/Header.js';
import Result from './Results/Result.js';

let ResultsPage = (props) => {
    let cars = [
        {car: {
            image: "/images/cars/red-sports.png",
            link: "https://www.w3docs.com/snippets/html/how-to-create-an-html-button-that-acts-like-a-link.html",
            details: [
                {key: "Price", value: 200},
                {key: "Make", value: "Ford"},
                {key: "Model", value: "Mustang"},
                {key: "Speed", value: 4.78},
            ],
            title: "2020 Ford Mustang",
            placement: "#1"
        }},
        {car:
            {
                details: 
                [
                    {key: "Price", value: "$26,990"},
                    {key: "Make", value: "Dodge"},
                    {key: "Model", value: "Challenger"},
                    {key: "Speed", value: 3.4},
                    {key: "Year", value: 2018},
                ],
            title: "2018 Dodge Challenger",
            placement: "#2",
            link:"https://autos.lotlinx.com?ad=2C3CDZAG4JH183857&request=AdLink&pubId=12000&url=1&channelid=desktopmain",
            image:"https://img.autotempest.com/pi/?img=1cadefe471552d3319131df0dSwne0%2FK0mFxu8R4UIWW1MptlfspzmuoAQmq7uiNVbhYQ%2BAkFuR0U%2BiAvyQSUG2LH09Lw1%2BJrTDC3z4sDo3GakVQIi8Lfq%2F4gxnbztobWGHTiFEsmdTWlLZccayJPp1OI6nXCwheqEqGFWczNtI%3D"
            }}

        
    ]
    return (
        <>
            <Header {...props} />
            {cars.map(car => <Result {...car}/>)}
        </>
    )
}


export default ResultsPage
