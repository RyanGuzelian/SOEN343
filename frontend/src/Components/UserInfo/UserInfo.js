import React from "react";

function UserInfo({ userInfo, setUserInfo, handleSubmit, title }) {
    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserInfo({ [name]: value });
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
                    <label htmlFor="address">Address</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={userInfo.address}
                        onChange={handleChange}
                    />
                    <label htmlFor="postalCode">Postal code</label>
                    <input
                        type="text"
                        id="postalCode"
                        name="postalCode"
                        value={userInfo.postalCode}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit">Continue</button>
            </form>
        </div>
    );
}

export default UserInfo;