import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from "react-hook-form";
import Select from 'react-select';

const Search = ({ onSubmitForm }) => {
    const { register, handleSubmit, control } = useForm();
    const [selectedOrigin, setSelectedOrigin] = useState(null);
    const [selectedDestination, setSelectedDestination] = useState(null);
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const getAITACities = async () => {
        try {
            let response = await fetch("http://localhost:8081/api/search/cities");
            if (!response.ok) {
                throw new Error('Response network ERROR');
            }
            let data = await response.json();
            return data;
        } catch (error) {
            setError(error.message);
            console.error('Fetch error: ', error);
        }
    }

    useEffect(() => {
        setLoading(true);
        const fetchCities = async () => {
            const data = await getAITACities();

            if (data) {
                data.sort((a, b) => a.name.localeCompare(b.name));
                setCities(data);
            }
            setLoading(false);
        };

        fetchCities();
    }, []);

    const cityOptions = useMemo(() => {
        return cities.map(city => ({
            label: city.name,
            value: city.code,
        }));
    }, [cities]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const convertDate = (date) => {
        const new_date = new Date(date);
        const year = new_date.getFullYear();
        let month = (new_date.getMonth() + 1).toString();
        let day = (new_date.getDay() + 2).toString();
        if (new_date.getMonth() < 9) {
            month = "0" + month;
        }
        if (new_date.getDay() < 9) {
            day = "0" + day;
        }
        return (year + "-" + month + "-" + day);
    }
    console.log(convertDate(Date.now()));
    const onSubmit = (data) => {
        let returnDate = null;
        if (data.return.toString() != "NaN-NaN-NaN") {
            returnDate = convertDate(data.return);
        }
        const searchParams = {
            origin: data.origin,
            destination: data.destination,
            departureDate: convertDate(data.departure),
            returnDate: returnDate,
            oneWay: data.oneWay,
            direct: data.direct,
        };


        onSubmitForm(searchParams);
        navigate('/flight');
    }
    // String origin,
    // String destination,
    // String departureDate,
    // String periodType,
    // String oneWay,
    // String tripClass,
    // String sorting,
    // String token

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor="origin">From</label>
                <Controller
                    name="origin"
                    control={control}
                    render={({ field }) => (
                        <Select
                            {...field}
                            options={cityOptions}
                            placeholder="Type to search..."
                            isSearchable={true}
                            isLoading={loading}
                        />
                    )}
                />
            </div>
            <div>
                <label htmlFor="destination">To</label>
                <Controller
                    name="destination"
                    control={control}
                    render={({ field }) => (
                        <Select
                            {...field}
                            options={cityOptions}
                            placeholder="Type to search..."
                            isSearchable={true}
                            isLoading={loading}
                        />
                    )}
                />
            </div>
            <div>
                <label htmlFor="departure">Departure</label>
                <input {...register("departure")} name="departure" type="date" />
            </div>
            <div>
                <label htmlFor="return">Return</label>
                <input {...register("return")} name="return" type="date" />
            </div>
            <div>
                <label htmlFor="oneWay">One way</label>
                <input {...register("oneWay")} name="oneWay" type="radio" />
            </div>
            <div key="tripClass">
                <label htmlFor="tripCLass">Ticket class</label>
                <select {...register("tripClass")} name="tripClass" id="">
                    <option value="0">Economy class</option>
                    <option value="1">Business class</option>
                    <option value="2">First class</option>
                </select>
            </div>
            <div>
                <label htmlFor="direct">Direct fly</label>
                <input {...register("direct")} name="direct" type="radio" />
            </div>
            <button type="submit">Search Flight</button>
        </form>
    );
}



export default Search;