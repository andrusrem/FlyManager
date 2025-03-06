'use client'
import axios from 'axios';
import { useEffect, useState } from 'react';

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

}

export default FlightChoose;