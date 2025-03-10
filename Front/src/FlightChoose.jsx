'use client'
import axios from 'axios';
import { useEffect, useState } from 'react';

const getFlight = async (url) => {
    if (!url) {
        console.error("Nullable body error!")
    }
    let request = await fetch(url);
    console.log(request);
    return request;
}

const checkParams = (data) => {
    let checkedParams = {};
    console.log("data: ", data);
    for (const [key, value] of Object.entries(data)) {
        if (key !== "returnDate" && Object.entries(data).oneWay !== true) {
            checkedParams[key] = value;
        }
    }
    console.log(checkedParams);
    return new URLSearchParams(checkedParams).toString();
}
// New request params
// String origin,
// String destination,
// String departureDate,
// String periodType,
// String oneWay,
// String tripClass,
// String sorting,
// String token


const FlightChoose = ({ searchData }) => {
    const [results, setResults] = useState({});
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
            let checkedParams = checkParams(queryParams);
            var url = "http://localhost:8081/api/search?" + checkedParams;
            // console.log(url);
            getFlight("http://localhost:8081/api/search?origin=TLL&destination=HEL&departureDate=2025-03-09&periodType=month&oneWay=true&tripClass=0&sorting=price&token=example")
                .then((res) => res.json())
                .then((data) => {
                    console.log("API Response:", data);
                    if (data && typeof data === "object" && data.data) {
                        setResults(data);
                    } else {
                        console.error("Invalid data received:", data);
                        setResults({});
                    }
                })
                .catch((error) => {
                    console.error("Error fetching flights:", error);
                    setResults({});
                });
        }
    }, [searchData]);


    return (
        <div>
            {results?.data?.length > 0 ? (
                results.data.map((flight, index) => (
                    <div key={index} style={{ border: "1px solid #ddd", padding: "10px", marginBottom: "10px" }}>
                        <p>🛫 <strong>Departure:</strong> {flight.depart_date}</p>
                        <p>📍 <strong>From:</strong> {flight.origin} → {flight.destination}</p>
                        <p>💺 <strong>Airline/Gate:</strong> {flight.gate}</p>
                        <p>🔁 <strong>Changes:</strong> {flight.number_of_changes}</p>
                        <p>⏳ <strong>Duration:</strong> {flight.duration} min</p>
                        <p>📏 <strong>Distance:</strong> {flight.distance} km</p>
                        <p>💰 <strong>Price:</strong> {flight.value} {results.currency}</p>
                        <p>📅 <strong>Found At:</strong> {flight.found_at}</p>
                        <hr />
                    </div>
                ))
            ) : (
                <p>Loading flights...</p>
            )}

        </div>
    )

}
// found: object with keys {depart_date, 
//     origin, destination, 
//     gate,
//      return_date, 
//      found_at, 
//      trip_class, 
//      value, 
//      number_of_changes, 
//      duration, distance,
//       show_to_affiliates,
//      actual}

export default FlightChoose;