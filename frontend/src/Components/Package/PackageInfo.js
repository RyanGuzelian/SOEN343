import React, {useState} from "react";

function PackageInfo({packageInfo,setPackageInfo,handleSubmit,title}) {
    console.log(setPackageInfo);
    const handleChange = (event) => {
        const {name, value} = event.target;
        setPackageInfo({[name]: value});
    }


    return(
        <div className="package-info">
            <h2>{title}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="weight">Weight</label>
                    <input
                        type="text"
                        id="weight"
                        name="weight"
                        value={packageInfo.weight}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <h6 className="dimensions">Dimensions</h6>
                    <label htmlFor="height">Height</label>
                    <input
                        type="text"
                        id="height"
                        name="height"
                        value={packageInfo.height}
                        onChange={handleChange}
                    />
                    <label htmlFor="width">Width</label>
                    <input
                        type="text"
                        id="width"
                        name="width"
                        value={packageInfo.width}
                        onChange={handleChange}
                    />

                    <label htmlFor="length">Length</label>
                    <input
                        type="text"
                        id="length"
                        name="length"
                        value={packageInfo.length}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Continue</button>
            </form>
        </div>
    )
}

export default PackageInfo