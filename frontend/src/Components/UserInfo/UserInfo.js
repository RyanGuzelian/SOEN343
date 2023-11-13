import React, {useEffect, useState} from "react";
import {FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import Button from "@mui/material/Button";

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
                    [name]: value
                }
            ))
        } else {
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
                    <TextField
                        label="First Name"
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={userInfo.firstName}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Last Name"
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={userInfo.lastName}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                    />
                </div>
                <div>
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="country-label">Country</InputLabel>
                        <Select
                            labelId="country-label"
                            id="country"
                            name="country"
                            value={userInfo.country}
                            onChange={handleChange}
                            label="Country"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {Object.keys(countriesAndProvinces).map(countryCode => (
                                <MenuItem key={countryCode} value={countryCode}>
                                    {countryCode}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>

                <div>
                    <TextField
                        label="Address"
                        type="text"
                        id="address"
                        name="address"
                        value={userInfo.address}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="City"
                        type="text"
                        id="city"
                        name="city"
                        value={userInfo.city}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                    />
                </div>
                <div>
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="province-label">Province</InputLabel>
                        <Select
                            labelId="province-label"
                            id="province"
                            name="province"
                            value={userInfo.province}
                            onChange={handleChange}
                            label="Province"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {userInfo.country && countriesAndProvinces[userInfo.country].map(province => (
                                <MenuItem key={province} value={province}>
                                    {province}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <TextField
                        label="Postal Code"
                        type="text"
                        id="postalCode"
                        name="postalCode"
                        value={userInfo.postalCode}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                    />
                </div>
                <div>
                    <TextField
                        label="Phone Number"
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                        value={userInfo.phoneNumber}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Email"
                        type="email"
                        id="email"
                        name="email"
                        value={userInfo.email}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                    />
                </div>
                <Button variant="contained" color="primary" type="submit" style={{ marginTop: 16 }}>
                    Continue
                </Button>
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
        return await response.json()
    } catch (error) {
        console.error("Failed to fetch countries and provinces:", error);
    }
}

export default UserInfo;