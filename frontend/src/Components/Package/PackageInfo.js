import React, {useState} from "react";
import {TextField} from "@mui/material";
import Button from "@mui/material/Button";

function PackageInfo({packageInfo,setPackageInfo,handleSubmit,title}) {
    console.log(setPackageInfo);
    const handleChange = (event) => {
        const {name, value} = event.target;
        setPackageInfo({[name]: value});
    }


    return (
        <div className="package-info-container">
            <h2>{title}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <TextField
                        label="Weight(g)"
                        type="text"
                        id="weight"
                        name="weight"
                        value={packageInfo.weight}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                    />
                </div>
                <div>
                    <h6 className="dimensions">Dimensions</h6>
                    <TextField
                        label="Height(cm)"
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
                        label="Width(cm)"
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
                        label="Length(cm)"
                        type="text"
                        id="length"
                        name="length"
                        value={packageInfo.length}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                    />
                </div>
                <Button type="submit" variant="contained" color="primary" style={{ marginTop: 16 }}>
                    Continue
                </Button>
            </form>
        </div>
    );
}

export default PackageInfo