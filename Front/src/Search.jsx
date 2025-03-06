import React from 'react';
import {useNavigate} from 'react-router-dom';
import { useForm } from "react-hook-form";

const Search = ({onSubmitForm}) =>
{   
    const {handleSubmit} = useForm();
    const navigate = useNavigate();
    const convertDate = (date) => {
        const new_date = new Date(date);
        const year = new_date.getFullYear();
        let month = (new_date.getUTCMonth() + 1).toString();
        let day = (new_date.getUTCDay() + 1).toString();
        if(new_date.getMonth() < 9)
        {
            month = "0" + month;
        }
        if (new_date.getDay() < 9)
        {
            day = "0" + day;
        }
        return (year + "-" + month + "-" + day);
    }
    console.log(convertDate(Date.now()));
    const onSubmit = (data) => {
        const searchParams = {
            "origin": data.origin,
            "destination": data.destination,
            "departureDate": convertDate(data.departureDate),
            "returnDate": convertDate(data.returnDate),
            "oneWay": data.oneWay,
            "direct": data.direct
        }; 
        if(searchParams != null)
        {
            onSubmitForm(searchParams);
            navigate('/flight');
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="origin">From</label>
                <input name="origin" type="text" placeholder='Tallinn'/>
            </div>
            <div>
                <label htmlFor="destination">To</label>
                <input name="destination" type="text" placeholder='Helsinki'/>
            </div>
            <div>
                <label htmlFor="departure">Departure</label>
                <input name="departure" type="date"/>
            </div>
            <div>
                <label htmlFor="return">Return</label>
                <input name="return" type="date"/>
            </div>
            <div>
                <label htmlFor="oneWay">One way</label>
                <input name="oneWay" type="radio"/>
            </div>
            <div>
                <label htmlFor="direct">Direct fly</label>
                <input name="direct" type="radio"/>
            </div>
            <button type="submit">Search Flight</button>
        </form>
    );
}

export default Search;