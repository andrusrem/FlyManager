'use client'
import axios from 'axios';
import { useEffect, useState } from 'react';

<<<<<<< HEAD
const getFlight = async (url, queryParams) => {
    if (!url || !queryParams) {
        console.error("Nullable body error!")
    }
    let request = await axios.get(url, queryParams);
    console.log(request.data);
    return request.data;
}

const FlightChoose = ({ searchData }) => {
    const { results, setResults } = useState({});
    var url = "http://localhost:8081/api/search";
    useEffect(() => {
        if (searchData) {
            let oneWay = false;
            let direct = false;
            if (searchData.oneWay == "on") {
                oneWay = true;
            }
            if (searchData.direct == "on") {
                direct = true;
            }
            const queryParams = {
                "origin": searchData.origin,
                "destination": searchData.destination,
                "departureDate": searchData.departureDate,
                "returnDate": searchData.returnDate,
                "token": "example",
                "oneWay": oneWay,
                "direct": direct,
                "sorting": "price",
            };
            console.log(queryParams);
            getFlight(url, queryParams).then((res) => {
                console.log(res);
            })
        }
    }, [searchData])

=======

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
            "token": "58e0ebb3bffa132f21a10205b5f029cc",
        }).then((res)=> {
            console.log(res.data);
        }
        )
    },[searchData])
    
>>>>>>> 53f11d872345dbd0dc3af97d119fcc88b052f8d3
}

export default FlightChoose;