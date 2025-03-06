'use client'
import axios from 'axios';
import { useEffect, useState } from 'react';


const FlightChoose = ({searchData}) => {
    const {results, setResults} = useState({});
    var url = "http://localhost:8081/api/search";
    const data = Object.entries(searchData);
    let oneWay = false;
    let direct = false;
    console.log(data);
    if( oneWay == "on")
    {
        oneWay = true;
    }
    if( direct == "on")
    {
        direct = true;
    }
    useEffect(() => {
        axios.get(url, {
            "origin": data.origin,
            "destination": data.destination,
            "departureDate": data.departureDate,
            "returnDate": data.returnDate,
            "oneWay": data.oneWay,
            "direct": data.direct,
            "token": "example",
        }).then((res)=> {
            console.log(res.data);
        }
        )
    },[searchData])
    
}

export default FlightChoose;