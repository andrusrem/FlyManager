import React from 'react';
import {useNavigate} from 'react-router-dom';
import { useForm } from "react-hook-form";

const Search = ({onSubmitForm}) =>
{   
    const {register, handleSubmit} = useForm();
    const navigate = useNavigate();

    const convertDate = (date) => {
        const new_date = new Date(date);
        const year = new_date.getFullYear();
        let month = (new_date.getMonth() + 1).toString();
        let day = (new_date.getDay() + 1).toString();
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

    const onSubmit = (data) => {
        const searchParams = {
            origin: data.origin,
            destination: data.destination,
            departureDate: convertDate(data.departure),
            returnDate: convertDate(data.return),
            oneWay: data.oneWay,
            direct: data.direct,
        }; 
        if(searchParams != null)
        {
            onSubmitForm(searchParams);
            navigate('/flight');
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div key="origin">
                <label htmlFor="origin">From</label>
                <input {...register("origin")} name="origin" type="text" placeholder='Tallinn'/>
            </div>
            <div key="destination">
                <label htmlFor="destination">To</label>
                <input {...register("destination")} name="destination" type="text" placeholder='Helsinki'/>
            </div>
            <div key="departure">
                <label htmlFor="departure">Departure</label>
                <input {...register("departure")} name="departure" type="date"/>
            </div>
            <div key="return">
                <label htmlFor="return">Return</label>
                <input {...register("return")} name="return" type="date"/>
            </div>
            <div key="oneWay">
                <label htmlFor="oneWay">One way</label>
                <input {...register("oneWay")} name="oneWay" type="radio"/>
            </div>
            <div key="direct">
                <label htmlFor="direct">Direct fly</label>
                <input {...register("direct")} name="direct" type="radio"/>
            </div>
            <button type="submit">Search Flight</button>
        </form>
    );
}

export default Search;