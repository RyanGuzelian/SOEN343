import React, {useEffect, useState} from "react";
import {Card, CardContent, FormControl, InputLabel, MenuItem, Select, TextField, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import "./UserInfo.css"

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
        <div className="user-info-container">
            <Card className="user-info-form">
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        {title}
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="First Name"
                            type="text"
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
                            name="lastName"
                            value={userInfo.lastName}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                        />

                        <FormControl fullWidth margin="normal">
                            <InputLabel id="country-label">Country</InputLabel>
                            <Select
                                labelId="country-label"
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

                        <TextField
                            label="Address"
                            type="text"
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
                            name="city"
                            value={userInfo.city}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                        />

                        <FormControl fullWidth margin="normal">
                            <InputLabel id="province-label">Province</InputLabel>
                            <Select
                                labelId="province-label"
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
                            name="postalCode"
                            value={userInfo.postalCode}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Phone Number"
                            type="tel"
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
                            name="email"
                            value={userInfo.email}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                        />

                        <Button variant="contained" color="primary" type="submit" sx={{marginTop: 2}}>
                            Continue
                        </Button>
                    </form>
                </CardContent>
            </Card>
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