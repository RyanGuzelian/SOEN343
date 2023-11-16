import React, {useState} from "react";
import {Card, CardContent, TextField, Typography} from "@mui/material";
import Button from "@mui/material/Button";
import "./PackageInfo.css"

function PackageInfo({packageInfo, setPackageInfo, handleSubmit, title}) {
    console.log(setPackageInfo);
    const handleChange = (event) => {
        const {name, value} = event.target;
        setPackageInfo({[name]: value});
    }


    return (
        <div className="package-info-container">
            <Card style={{backgroundColor:'#b5d9f5', border:'none', boxShadow:'none'}}>
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        {title}
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Weight (g)"
                            type="text"
                            id="weight"
                            name="weight"
                            value={packageInfo.weight}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                        />

                        <Typography variant="subtitle1" gutterBottom component="div" sx={{marginTop: 2}}>
                            Dimensions
                        </Typography>

                        <TextField
                            label="Height (cm)"
                            type="text"
                            id="height"
                            name="height"
                            value={packageInfo.height}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Width (cm)"
                            type="text"
                            id="width"
                            name="width"
                            value={packageInfo.width}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Length (cm)"
                            type="text"
                            id="length"
                            name="length"
                            value={packageInfo.length}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                            margin="normal"
                        />

                        <Button type="submit" variant="contained" color="primary" sx={{marginTop: 2}}>
                            Continue
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

export default PackageInfo