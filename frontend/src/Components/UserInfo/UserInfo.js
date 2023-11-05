import React, {useEffect, useState} from "react";
import data from "bootstrap/js/src/dom/data";

function UserInfo({userInfo, setUserInfo, handleSubmit, title}) {
    const [countriesAndProvinces, setCountriesAndProvinces] = useState({})
    useEffect(() => {
        getCountriesAndProvinces().then(
            data => {
                setCountriesAndProvinces(data)
            }
        )
    }, []);

    const handleChange = (event) => {
        const {name, value} = event.target;
        setUserInfo({[name]: value});

        if (name === 'country') {
            setUserInfo(prevInfo => (
                {
                    ...prevInfo,
                    [name]:value
                }
            ))
        }
        else {
            setUserInfo(prevInfo => ({
                ...prevInfo,
                [name]: value
            }))
        }
    };

    return (
        <div className="user-info-form">
            <h2>{title}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="firstName">First name</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={userInfo.firstName}
                        onChange={handleChange}
                    />
                    <label htmlFor="lastName">Last Name</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={userInfo.lastName}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="country">Country</label>
                    <select
                        id="country"
                        name="country"
                        value={setUserInfo.country}
                        onChange={handleChange}
                    >
                        <option value="">Select a country</option>
                        {Object.keys(countriesAndProvinces).map(countryCode => (
                            <option key={countryCode} value={countryCode}>
                                {countryCode}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="address">Address</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={userInfo.address}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="city">City</label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={userInfo.city}
                        onChange={handleChange}
                    />

                    <label htmlFor="province">Province</label>
                    <select
                        id="province"
                        name="province"
                        value={setUserInfo.province}
                        onChange={handleChange}
                    >
                       <option value="">Select province</option>
                        {userInfo.country && countriesAndProvinces[userInfo.country].map(
                            province => (
                                <option key={province} value={province}>
                                    {province}
                                </option>
                            )
                        )}
                    </select>

                    <label htmlFor="postalCode">Postal code</label>
                    <input
                        type="text"
                        id="postalCode"
                        name="postalCode"
                        value={userInfo.postalCode}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                        value={userInfo.phoneNumber}
                        onChange={handleChange}
                    />
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={userInfo.email}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Continue</button>
            </form>
        </div>
    );
}

const getCountriesAndProvinces = async () => {
    try {
        const response = await fetch('http://localhost:3001/countries-provinces')
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json()
        return data
    }
    catch (error) {
        console.error("Failed to fetch countries and provinces:", error);
    }
}

export default UserInfo;